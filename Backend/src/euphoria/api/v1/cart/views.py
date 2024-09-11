from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework import status


from django.shortcuts import get_object_or_404
from web.models import Product, Cart, CartItem, Order


@api_view(['POST'])
@permission_classes([AllowAny])
def add_to_cart(request, product_id):
    product = get_object_or_404(Product, pk=product_id)
    cart, created = Cart.objects.get_or_create(user=request.user)
    
    # Check if the product is already in the cart
    cart_item, created = CartItem.objects.get_or_create(cart=cart, product=product)
    
    if not created:
        cart_item.quantity += 1  # Increment the quantity if the item already exists
    cart_item.save()
    
    return Response({"status_code": 6000, "message": "Product added to cart"})


@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def remove_from_cart(request, product_id):
    cart = get_object_or_404(Cart, user=request.user)
    cart_item = get_object_or_404(CartItem, cart=cart, product_id=product_id)
    
    cart_item.delete()
    
    return Response({"status_code": 6000, "message": "Product removed from cart"})


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def view_cart(request):
    cart = get_object_or_404(Cart, user=request.user)
    cart_items = cart.items.all()

    cart_data = {
        "user": request.user.username,
        "items": [
            {
                "product": item.product.name,
                "quantity": item.quantity,
                "price": item.product.price,
                "total_price": item.total_price(),
            }
            for item in cart_items
        ],
        "total_price": sum(item.total_price() for item in cart_items),
    }
    
    return Response({"status_code": 6000, "cart": cart_data})

import logging

logger = logging.getLogger(__name__)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_order(request):
    user = request.user
    product_id = request.data.get('product_id')
    quantity = request.data.get('quantity')
    size = request.data.get('size')
    
    logger.info(f"Received order request: {request.data}")

    if not product_id or not quantity or not size:
        return Response({'status_code': 6001, 'message': 'Invalid data provided'}, status=status.HTTP_400_BAD_REQUEST)
    
    try:
        product = Product.objects.get(id=product_id)
        order = Order.objects.create(user=user, product=product, quantity=quantity, size=size)
        logger.info(f"Order created successfully: {order.id}")
        return Response({'status_code': 6000, 'message': 'Order created successfully', 'order_id': order.id}, status=status.HTTP_201_CREATED)
    except Product.DoesNotExist:
        logger.error("Product not found: %s", product_id)
        return Response({'status_code': 6002, 'message': 'Product not found'}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        logger.error("Error creating order: %s", str(e))
        return Response({'status_code': 6003, 'message': 'Internal server error'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)