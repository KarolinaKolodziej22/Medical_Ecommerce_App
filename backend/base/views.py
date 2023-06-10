from django.shortcuts import render
from django.http import JsonResponse
from .products import products
from rest_framework.decorators import api_view, permission_classes

from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAdminUser

from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password
from .models import Product
from .products import products
from .serializers import ProductSerializer, UserSerializer

from rest_framework import status
# Create your views here.
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
     def validate(self, attrs):
        data=super().validate(attrs)
        """data['username'] = self.user.username
        data['email']= self.user.email """
        seralizer = UserSerializer(self.user).data 
        for k,v in seralizer.items():
            data[k]=v
        return data


        """@classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['username'] = user.username
        # ...
        return token """
       

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class=MyTokenObtainPairSerializer

@api_view(['POST'])
def registerUser(request):
    data=request.data

    try:
        user=User.objects.create(
            first_name = data['name'],
            username = data['email'],
            email = data['email'],
            password = make_password(data['password'])
    )
        serializer = UserSerializer(user, many=False)
        return Response(serializer.data)
    except:
        message = {'detail':'Uzytkownik o podanym adresie email juz istnieje.'}
        return Response(message,status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getUserProfile(request):
    user=request.user

    serializer=UserSerializer(user, many=False)
    return Response(serializer.data)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateUserProfile(request):
    user = request.user
    serializer=UserSerializer(user, many=False)
    data=request.data
    user.first_name = data['name']
    user.username = data['email']
    user.email = data['email']

    if data['password'] != '':
        user.password=make_password(data['password'])
    user.save()
    return Response(serializer.data)

@api_view(['GET'])
# @permission_classes([IsAdminUser])
def getUsers(request):
    users = User.objects.all()
    serializer=UserSerializer(users, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def getProducts(request):
    products = Product.objects.all()
    serializer=ProductSerializer(products, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def getProduct(request, pk):
    product=Product.objects.get(_id=pk)
    serializer=ProductSerializer(product, many=False)
    return Response(serializer.data)