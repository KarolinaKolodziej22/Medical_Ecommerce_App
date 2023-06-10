from django.urls import path, include
from . import views
""" from rest_framework_simplejwt.views import (
    TokenObtainPairView,
) """


urlpatterns = [
    path('users/login/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('users/profile/', views.getUserProfile, name="users-profile"),
    path('users/profile/update/', views.updateUserProfile, name="users-profile-update"),

    path('users/', views.getUsers, name="users"),
    path('users/register/', views.registerUser, name="register"),
    path('products/', views.getProducts, name="products"),
    path('products/<str:pk>/', views.getProduct, name="product"),
]