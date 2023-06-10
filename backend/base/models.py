from django.db import models
from django.contrib.auth.models import User
# Create your models here.

class Product(models.Model):
    _id= models.AutoField(primary_key=True, editable=False)
    name=models.CharField(max_length=200, null=True, blank=True)
    description = models.TextField(null=True, blank=True)
    image=models.ImageField(null=True, blank=True)
    reviews_num = models.IntegerField(null=True, blank=True, default=0)
    rating = models.DecimalField(max_digits=7, decimal_places=2)
    price =models.DecimalField(max_digits=7, decimal_places=2)
    stock = models.IntegerField(null=True, blank=True, default=0)
    addedTime= models.DateTimeField(auto_now_add=True, null=True, blank=True)

def __str__(self):
    return self.name

class Order(models.Model):
    order_id= models.AutoField(primary_key=True, editable=False)
    user_id=models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    payment = models.CharField(max_length=200,null=True, blank=True)
    sum = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True)
    status =models.BooleanField(default=False, null=True, blank=True) 
    addedTime= models.DateTimeField(auto_now_add=True, null=True, blank=True)

def __str__(self):
    return self.addedTime

class Order_list(models.Model):
    orderlist_id= models.AutoField(primary_key=True, editable=False)
    product_id= models.ForeignKey(Product, on_delete=models.SET_NULL, null=True)
    order_id = models.ForeignKey(Order, on_delete=models.SET_NULL, null=True)
    count = models.IntegerField(null=True, blank=True, default=0)
def __str__(self):
    return self.orderlist_id


class Review(models.Model):
    review_id= models.AutoField(primary_key=True, editable=False)
    user_id=models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    product_id = models.ForeignKey(Product,related_name='reviews', on_delete=models.SET_NULL, null=True)
    name = models.CharField(max_length=200, null=True, blank=True)
    rating =models.DecimalField(max_digits=7, decimal_places=2)
    comment=models.TextField(max_length=1000)

def __str__(self):
    return f"{self.user_id}: {self.comment}"

class User(models.Model):
    user_id= models.AutoField(primary_key=True, editable=False)
    email=models.CharField(max_length=200, null=True, blank=True)
    password = models.CharField(max_length=200, null=True, blank=True)
    username = models.CharField(max_length=200, null=True, blank=True)
    name = models.CharField(max_length=200, null=True, blank=True)
    is_staff = models.BooleanField(default=False, null=True, blank=True)

def __str__(self):
    return self.username