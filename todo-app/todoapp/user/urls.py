from django.urls import path
from todoapp.user import views

urlpatterns = [
    path('user/register/', views.UserCreate.as_view(), name='user-create'),
    path('user/login/', views.LoginView.as_view(), name='user-login'),
    path('user/logout/', views.LogoutView.as_view(), name='user-logout')
]
