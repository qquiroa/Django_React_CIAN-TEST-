from .models import *
from rest_framework import serializers
from .models import *
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
import os

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email')

class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password')
        extra_kwargs = {'password': {'write_only': True}}
    
    def create(self, validated_data):
        user = User.objects.create_user(
            validated_data['username'],
            validated_data['email'],
            validated_data['password'])
        
        return user

class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()
    
    def validate(self, data):
        user = authenticate(**data)
        if user and user.is_active:
            return user
        raise serializers.ValidationError("Incorrect Credentials")

class OwnProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'
    
    def create(self, validated_data):
        product = Product(**validated_data)
        return product

class BuySerializer(serializers.ModelSerializer):
    class Meta:
        model = ReceiptDetail
        fields = '__all__'

class DashboardSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    Total = serializers.IntegerField()
    name = serializers.CharField(allow_blank=True, required=False)

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'