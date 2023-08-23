from django.shortcuts import render
from .serializers import UserCreationSerializer, UserLoginSerializer,UserProfileSerializer, ChangePasswordSerializer, SendPasswordResetEmail, PasswordResetConfirmSerializer
from .models import User
from rest_framework.decorators import APIView
from rest_framework.mixins import CreateModelMixin
from rest_framework.generics import GenericAPIView
from django.contrib.auth import authenticate
from rest_framework.response import Response
from rest_framework import status
from .tokens import get_tokens_for_user
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
# Create your views here.


class UserCreationView(APIView):
    def post(self, request, *args, **kwargs):
        serializerData = UserCreationSerializer(data=request.data)
        if serializerData.is_valid():
            serializerData.save()
            return Response({'created': serializerData.data}, status=status.HTTP_201_CREATED)
        else:
            return Response({'error': serializerData.errors}, status=status.HTTP_400_BAD_REQUEST)


class UserLoginView(APIView):
    def post(self, request, *args, **kwargs):
        serializerData = UserLoginSerializer(data=request.data)
        if serializerData.is_valid():
            print(serializerData.data)
            email = serializerData.data['email']
            password = serializerData.data['password']
            user = authenticate(email=email, password=password)
            if user != None:
                # print(user)
                token = get_tokens_for_user(user)
                return Response({'token':token }, status=status.HTTP_200_OK)
            else:
                return Response({'msg': 'data not found'}, status=status.HTTP_404_NOT_FOUND)
        return Response(serializerData.errors, status=status.HTTP_400_BAD_REQUEST)

class UserProfileView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    def get(self, request, *args, **kwargs):
        serializerData = UserProfileSerializer(request.user)
        return Response({'data':serializerData.data}, status=status.HTTP_200_OK)
    
class ChangePasswordView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def put(self, request, *args, **kwargs):
        serializerData = ChangePasswordSerializer(instance=request.user, data=request.data)
        if serializerData.is_valid():
            serializerData.save()
            return Response({'success':'your password has been changed'}, status=status.HTTP_201_CREATED)
        return Response({'error':serializerData.errors}, status=status.HTTP_400_BAD_REQUEST)


class SendPasswordResetEmailView(APIView):
    def post(self, request, *args, **kwargs):
        serializerData = SendPasswordResetEmail(data=request.data)
        if serializerData.is_valid():
            return Response({'email_send':'Password reset link has send to your email'}, status=status.HTTP_200_OK) 
        return Response({'error':serializerData.errors}, status=status.HTTP_400_BAD_REQUEST)

class PasswordResetConfirmView(APIView):
    def post(self, request, uid, token, *args, **kwargs):
        serializerData = PasswordResetConfirmSerializer(data=request.data, context={'uid':uid, 'token':token})
        if serializerData.is_valid():
            return Response({'password_updated':'Your reset password has been updated'}, status=status.HTTP_201_CREATED)
        return Response({'error':serializerData.errors}, status=status.HTTP_400_BAD_REQUEST)