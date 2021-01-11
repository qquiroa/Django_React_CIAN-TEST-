import json
from .models import *
from .serializers import *
from django.db.models import Q
from rest_framework.response import Response
from knox.models import AuthToken
from django.core.files.base import ContentFile
from rest_framework.parsers import MultiPartParser
from rest_framework.decorators import parser_classes
from django.core.files.storage import default_storage
from rest_framework import viewsets, permissions, generics

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

class ProductViewSet(viewsets.ModelViewSet):
    serializer_class = ProductSerializer
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
        payload.pop("id_category")
        payload.pop("image")
        payload = json.loads(json.dumps(payload))
        product = Product(**payload, user=user, category=category)
        product.save()
        image_path = os.path.dirname(os.path.abspath(__file__)) + '/images/' + str(product.user.id) + '/' + str(product.id) + '/image.png'
        image_path = image_path.replace("\\", "/")
        product = Product.objects.get(id=product.id)
        product.image_path = image_path
        default_storage.save(image_path, ContentFile(file.read()))
        product.save()
        return Response({
            "message": "done"
        })
    
    def list(self, request):
        user = self.request.user
        product = Product.objects.filter(~Q(user=user))
        return Response({
            "products": ProductSerializer(product, many=True).data
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

class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    permission_classes = [
        permissions.IsAuthenticated
    ]
    serializer_class = CategorySerializer