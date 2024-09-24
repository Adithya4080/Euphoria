from web.models import CartItem, Product, Order, OrderItem
from rest_framework.serializers import ModelSerializer
from rest_framework import serializers


class ProductSerializer(ModelSerializer):
    category = serializers.SerializerMethodField()
    size = serializers.SerializerMethodField()
    gallery = serializers.SerializerMethodField()

    class Meta:
        fields = ("id", "name", "featured_image", "description","brand", "price", "size","ratings", "category", "gallery", "quantity")
        model = Product

class CartItemSerializer(ModelSerializer):
    product = ProductSerializer()
    product_id = serializers.IntegerField(source='product.id', read_only=True)

    class Meta:
        model = CartItem
        fields = ['product', 'quantity', 'id']


