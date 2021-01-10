from .api import *
from django.urls import path, include
from knox import views as knox_views
from rest_framework import routers


router = routers.DefaultRouter()
router.register('api/categories', CategoryViewSet, 'categories')

urlpatterns = router.urls + [
    path('api/auth', include('knox.urls')),
    path('api/auth/register', RegisterAPI.as_view()),
    path('api/auth/login', LoginAPI.as_view()),
    path('api/auth/user', UserAPI.as_view()),
    path('api/auth/logout', knox_views.LogoutView.as_view(), name='knox_logout')
]