from django.urls import path, include, re_path
from .views import IndexView, LoginView, Register, PostAPI
from rest_framework.routers import DefaultRouter
route = DefaultRouter()
route.register(r'PostAPI',PostAPI, basename='PostAPI')

urlpatterns = [
    
    path('',LoginView.as_view(), name='login'),
    path('register/', Register.as_view(), name='register'),
    path('rest/',include(route.urls)),
    re_path(r'^app/', IndexView.as_view(), name='index'),
]