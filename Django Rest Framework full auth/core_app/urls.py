from django.urls import path
from . import views

urlpatterns = [
    path('usercreationapi/', views.UserCreationView.as_view(), name='userCreationApi'),
    path('userloginapi/', views.UserLoginView.as_view(), name='userLoginView'),
    path('userprofileapi/', views.UserProfileView.as_view(), name='userProfileApi'),
    path('changepasswordapi/', views.ChangePasswordView.as_view(), name='changePasswordApi'),
    path('send/password/reset/email/', views.SendPasswordResetEmailView.as_view(), name='sendPasswordResetEmail'),
    path('reset/password/confirm/<uid>/<token>/', views.PasswordResetConfirmView.as_view(), name='resetPasswordConfirm')
]
