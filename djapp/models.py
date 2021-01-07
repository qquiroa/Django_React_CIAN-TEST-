from django.conf import settings
from django.db import models

class Category(models.Model):
    category = models.CharField(max_length=80)

class Product(models.Model):
    name = models.CharField(max_length=150)
    description = models.TextField()
    price = models.DecimalField(max_digits=6, decimal_places=2)
    stock = models.IntegerField()
    image_path = models.TextField()
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)

class ReceiptHeader(models.Model):
    full_name = models.TextField()
    nit = models.CharField(max_length=10)
    address = models.TextField()
    total = models.DecimalField(max_digits=6, decimal_places=2)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, null=True)

class ReceiptDetail(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.IntegerField()
    unitary_price = models.DecimalField(max_digits=6, decimal_places=2)
    receipt_header = models.ForeignKey(ReceiptHeader, on_delete=models.CASCADE)