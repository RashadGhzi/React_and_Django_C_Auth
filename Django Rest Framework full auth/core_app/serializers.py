from rest_framework import serializers
from .models import User
from django.utils.http import urlsafe_base64_decode, urlsafe_base64_encode
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.utils.encoding import force_bytes, smart_str
from django.core.mail import send_mail
from full_auth_api.settings import *

class UserCreationSerializer(serializers.ModelSerializer):
    password2 = serializers.CharField(
        style={'input_type': 'password'}, write_only=True)
    password = serializers.CharField(
        style={'input_type': 'password'}, write_only=True)

    class Meta:
        model = User
        fields = ['email', 'name', 'password', 'password2']

    def validate(self, attrs):
        if (attrs['password'] != attrs['password2']):
            raise serializers.ValidationError(
                "password and confirm password doesn't match")
        return super().validate(attrs)

    def create(self, validated_data):
        return User.objects.create_user(**validated_data)


class UserLoginSerializer(serializers.ModelSerializer):
    email = serializers.CharField(max_length=100)

    class Meta:
        model = User
        fields = ['email', 'password']


class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'email', 'name']


class ChangePasswordSerializer(serializers.ModelSerializer):
    password = serializers.CharField(
        max_length=20, style={'input_type': 'password'}, write_only=True)
    password2 = serializers.CharField(
        max_length=20, style={'input_type': 'password'}, write_only=True)

    class Meta:
        model = User
        fields = ['password', 'password2']

    def update(self, instance, validated_data):
        password = validated_data.get('password')
        password2 = validated_data.get('password2')
        print(password)
        print(password2)
        if password != password2:
            raise serializers.ValidationError("your password is incorrect")
        else:
            instance.set_password(password)
            instance.save() # save
            return instance

    


class SendPasswordResetEmail(serializers.Serializer):
    email = serializers.EmailField()

    def validate(self, attrs):
        email = attrs['email']
        if User.objects.filter(email=email).exists():
            user = User.objects.get(email=email)
            user_id = user.id
            enc_id = urlsafe_base64_encode(force_bytes(user_id))
            user_token = PasswordResetTokenGenerator().make_token(user)
            link = f"http://localhost:3000/reset/password/confirm/{enc_id}/{user_token}/"
            # print(link)
            subject = "Email verification for password reset"
            message = f"Please don't share this link with anyone: {link}. Click this link to reset your password."
            send_mail(
                subject,
                message,
                EMAIL_HOST_USER,  # Make sure to set EMAIL_HOST_USER in your settings.py
                [email],
            )
        else:
            raise serializers.ValidationError("Your email doesn't exist")

        return super().validate(attrs)
    
class PasswordResetConfirmSerializer(serializers.Serializer):
    password = serializers.CharField(max_length=30, style={'input_style':'password'}, write_only=True)
    password2 = serializers.CharField(max_length=30, style={'input_style':'password'}, write_only=True)
    
    def validate(self, attrs):
        uid = self.context['uid']
        user_id = smart_str(urlsafe_base64_decode(uid))
        print('id : ', user_id)
        user = User.objects.get(id=user_id)
        token = self.context['token']
        print('token : ', token)
        if not PasswordResetTokenGenerator().check_token(user, token):
            raise serializers.ValidationError('Token is not valid or expired')

        password = attrs['password']
        password2 = attrs['password2']
        if password != password2:
            raise serializers.ValidationError("Password and Password2 doen't match")
        
        user.set_password(password)
        user.save()
        return attrs
