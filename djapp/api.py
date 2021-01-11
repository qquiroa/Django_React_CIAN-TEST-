import json
from .models import *
from .serializers import *
from django.db.models import Q, F
from rest_framework.response import Response
from knox.models import AuthToken
from django.core.files.base import ContentFile
from rest_framework.parsers import MultiPartParser
from rest_framework.decorators import parser_classes
from django.core.files.storage import default_storage
from rest_framework import viewsets, permissions, generics
from django.db import transaction

class RegisterAPI(generics.GenericAPIView):
    serializer_class = RegisterSerializer
    
    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response({
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
            "token": AuthToken.objects.create(user)[1]
        })

class LoginAPI(generics.GenericAPIView):
    serializer_class = LoginSerializer
    
    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data
        return Response({
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
            "token": AuthToken.objects.create(user)[1]
        })

class UserAPI(generics.RetrieveAPIView):
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    serializer_class = UserSerializer

    def get_object(self):
        return self.request.user

class OwnProductViewSet(viewsets.ModelViewSet):
    serializer_class = OwnProductSerializer
    queryset = Product.objects.all()
    permission_classes = [
        permissions.IsAuthenticated
    ]
    
    @parser_classes([MultiPartParser])
    def create(self, request):
        payload = request.data
        file = payload['image']
        user = self.request.user
        category = Category.objects.get(id=payload["id_category"])
        payload.pop("image")
        payload = json.loads(json.dumps(payload))
        payload.pop("id_category")
        product = Product(**payload, user=user, category=category)
        product.save()
        image_path = '/static/frontend/img/' + str(product.user.id) + '/' + str(product.id) + '/image.png'
        product = Product.objects.get(id=product.id)
        product.image_path = '.' + image_path
        image_path = os.path.abspath(os.getcwd()) + '/frontend' + image_path
        default_storage.save(image_path, ContentFile(file.read()))
        product.save()
        return Response({
            "message": "done"
        })
    
    def list(self, request):
        user = self.request.user
        product = Product.objects.filter(Q(user=user))
        return Response({
            "products": OwnProductSerializer(product, many=True).data
        })
    
    def update(self, request, pk=None):
        user = self.request.user
        try:
            product = Product.objects.filter(id=pk)
            if user.id == product[0].user.id:
                payload = request.data
                category = Category.objects.get(id=payload["id_category"])
                payload.pop('id_category')
                payload["category"] = category
                product.update(**payload)
                return Response({'status': 'Updated.'})
            else:
                return Response({'status': 'Unauthorized.'}, 401)
        except Exception as e:
            print(e)
            return Response({'status': 'Not found.'}, 404)
    
    def destroy(self, request, pk=None):
        user = self.request.user
        try:
            product = Product.objects.get(id=pk)
            if user.id == product.user.id:
                product.delete()
                return Response({'status': 'Deleted.'})
            else:
                return Response({'status': 'Unauthorized.'}, 401)
        except:
            return Response({'status': 'Not found.'}, 404)

class ProductsViewSet(viewsets.ModelViewSet):
    serializer_class = OwnProductSerializer
    queryset = Product.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    
    def list(self, request):
        user = self.request.user
        if user.username:
            product = Product.objects.filter(~Q(user=user))
            return Response({
                "products": OwnProductSerializer(product, many=True).data
            })
        else:
            product = Product.objects.all()
            return Response({
                "products": OwnProductSerializer(product, many=True).data
            })

class BuyViewSet(viewsets.ModelViewSet):
    serializer_class = BuySerializer
    permission_classes = [
        permissions.AllowAny
    ]
    
    @transaction.atomic
    def create(self, request):
        user = self.request.user
        payload = request.data
        full_name = payload["full_name"]
        nit = payload["nit"]
        address = payload["address"]
        total = payload["total"]
        if not user.username:
            user = None
        receipt_header = ReceiptHeader(
                            full_name=full_name,
                            nit=nit,
                            address=address,
                            total=total,
                            user=user
                        )
        receipt_header.save()
        product = Product.objects.get(id=payload["id_product"])
        quantity = payload["quantity"]
        unitary_price = payload["unitary_price"]
        receipt_detail = ReceiptDetail(
                            product=product,
                            quantity=quantity,
                            unitary_price=unitary_price,
                            receipt_header=receipt_header
                        )
        receipt_detail.save()
        product.stock = F('stock') - quantity
        product.save()
        
        return Response({'status': 'Completed.'})

class DashboardViewSet(viewsets.ModelViewSet):
    permission_classes = [
        permissions.IsAuthenticated
    ]
    
    def list(self, request):
        user = self.request.user
        perProduct = ReceiptDetail.objects.raw("""
                                                SELECT a.id, sum(a.unitary_price*a.quantity) AS Total, b.name 
                                                FROM djapp_receiptdetail a 
                                                INNER JOIN djapp_product b ON a.product_id=b.id 
                                                WHERE b.user_id={}
                                                GROUP BY b.name
                                            """.format(user.id))
        serializer = DashboardSerializer(perProduct, many=True)
        perProduct = serializer.data
        globalProduct = ReceiptDetail.objects.raw("""
                                                SELECT a.id, sum(a.unitary_price*a.quantity) AS Total
                                                FROM djapp_receiptdetail a 
                                                INNER JOIN djapp_product b ON a.product_id=b.id 
                                                WHERE b.user_id={}
                                            """.format(user.id))
        serializer = DashboardSerializer(globalProduct, many=True)
        globalProduct = serializer.data
        if len(globalProduct) > 0:
            globalProduct = globalProduct[0]
        
        avgPrice = ReceiptDetail.objects.raw("""
                                                SELECT id, AVG(price) as Total 
                                                FROM djapp_product 
                                                WHERE user_id={}
                                            """.format(user.id))
        serializer = DashboardSerializer(avgPrice, many=True)
        avgPrice = serializer.data
        
        if len(avgPrice) > 0:
            avgPrice = avgPrice[0]
        
        return Response({'perProduct': perProduct, 'globalProduct': globalProduct, 'avgPrice': avgPrice})

class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    permission_classes = [
        permissions.IsAuthenticated
    ]
    serializer_class = CategorySerializer