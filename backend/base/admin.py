from django.contrib import admin
from .models import Product,User,Order, Order_list, Review

# Register your models here.
admin.site.register(Product)
admin.site.register(User)
admin.site.register(Order)
admin.site.register(Order_list)
admin.site.register(Review)
