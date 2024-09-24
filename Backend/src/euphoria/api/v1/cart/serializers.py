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


class OrderItemSerializer(ModelSerializer):
    product = ProductSerializer()
    user = serializers.StringRelatedField()

    class Meta:
        model = OrderItem
        fields = ['product', 'quantity', 'price']

class OrderSerializer(ModelSerializer):
    order_items = OrderItemSerializer(many=True, read_only=True) 
    user = serializers.StringRelatedField()

    class Meta:
        model = Order
        fields = ['id', 'user', 'total_price', 'status', 'created_at', 'order_items']

    def get_order_items(self, obj):
        order_items = obj.order_items.all()
        return OrderItemSerializer(order_items, many=True).data