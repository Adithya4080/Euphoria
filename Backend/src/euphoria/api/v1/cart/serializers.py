from web.models import CartItem, Product, Order
from rest_framework import serializers


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ['id', 'name', 'price', 'featured_image'] 


class CartItemSerializer(serializers.ModelSerializer):
    product = ProductSerializer()

    class Meta:
        model = CartItem
        fields = ['product', 'quantity']


class OrderSerializer(serializers.ModelSerializer):
    cart_items = CartItemSerializer(source='cart.cartitem_set', many=True)  # Serialize all cart items in the order

    class Meta:
        model = Order
        fields = ['user', 'cart', 'cart_items']  # Include cart_items for a detailed view of the order
