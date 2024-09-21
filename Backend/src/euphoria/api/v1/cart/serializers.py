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

    class Meta:
        model = OrderItem
        fields = ['product', 'quantity']

class OrderSerializer(serializers.ModelSerializer):
    order_items = OrderItemSerializer(many=True)

    class Meta:
        model = Order
        fields = ['id', 'user', 'cart', 'total_price', 'status', 'created_at', 'order_items']

    def create(self, validated_data):
        order_items_data = validated_data.pop('order_items')
        order = Order.objects.create(**validated_data)
        for item_data in order_items_data:
            # Assuming `item_data['id']` corresponds to the cart item ID
            product = Product.objects.get(id=item_data['id'])  # Fetch product using item ID
            OrderItem.objects.create(order=order, product=product, quantity=item_data['quantity'])
        return order
