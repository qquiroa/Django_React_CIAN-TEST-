from .api import *
from django.urls import path, include
from knox import views as knox_views
from rest_framework import routers


router = routers.DefaultRouter()
router.register('api/categories', CategoryViewSet, 'categories')

urlpatterns = router.urls + [
    path('api/auth', include('knox.urls')),
    path('api/auth/register', RegisterAPI.as_view())
]