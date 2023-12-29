from django.shortcuts import render, redirect
from django.views.generic import TemplateView
from django.views import View
from django.contrib.auth.mixins import LoginRequiredMixin
from django.contrib.auth.models import User
from django.contrib import messages
from django.contrib.auth import authenticate, login
# Create your views here.

class IndexView(LoginRequiredMixin, TemplateView):
    template_name = 'index.html'

class LoginView(View):
    def get(self, request):
        return render(request, 'app/login.html', {})
    
    def post(self, request):
        user = authenticate(
            username=request.POST.get('username'),
            password=request.POST.get('password'))
        if user is not None:
            login(request, user)
            return redirect('index')
        messages.error(request, 'Login failed kindly check your credentail')
        return redirect('login')

class Register(View):
    def get(self, request):
        return render(request, 'app/register.html', {})
    
    def post(self, request):
        username = request.POST.get('username', None)
        user, status = User.objects.get_or_create(username=username)
        if status:
            user.first_name = request.POST.get('first_name')
            user.last_name = request.POST.get('last_name')
            user.email = request.POST.get('email')
            user.set_password(request.POST.get('password'))
            user.save()
            messages.success(request, 'Profile created !')
            return redirect('login')
        else:
            messages.error(request, 'Username already exists')
            return redirect('register')

from rest_framework.viewsets import ModelViewSet
from rest_framework.authentication import BasicAuthentication, SessionAuthentication
from rest_framework.permissions import IsAuthenticated
from app.models import Post, PostSer

class PostAPI(ModelViewSet):
    serializer_class = PostSer
    authentication_classes = [BasicAuthentication, SessionAuthentication, ]
    permission_classes = [IsAuthenticated,]

    def get_queryset(self):
        return Post.objects.filter(user=self.request.user)
    
    def perform_create(self, serializer):
        return serializer.save(user = self.request.user)