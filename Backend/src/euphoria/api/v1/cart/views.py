from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from web.models import Cart, CartItem, Order, Product, OrderItem

from rest_framework import status
from django.db import transaction

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_to_cart(request):
    try:
        user = request.user        
        product_id = request.data.get('product_id')
        quantity = int(request.data.get('quantity', 1))

        if quantity < 1:
            return Response({'error': 'Quantity must be at least 1'}, status=status.HTTP_400_BAD_REQUEST)

        product = Product.objects.get(id=product_id)
        cart, created = Cart.objects.get_or_create(user=user)

        cart_item, created = CartItem.objects.get_or_create(cart=cart, product=product)
        cart_item.quantity += quantity
        cart_item.save()

        return Response({'message': 'Item added to cart'}, status=status.HTTP_200_OK)
    
    except Product.DoesNotExist:
        return Response({'error': 'Product not found'}, status=status.HTTP_404_NOT_FOUND)


# View Cart
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def view_cart(request):
    user = request.user
    try:
        cart = Cart.objects.get(user=user)
        items = CartItem.objects.filter(cart=cart).select_related('product')

        cart_data = {
            'cart_items': [
                {
                    'id': item.product.id,
                    'product': item.product.name,
                    'stock': item.product.quantity,
                    'quantity': item.quantity,
                    'price': item.product.price,
                    'image': item.product.featured_image.url if item.product.featured_image else None
                }
                for item in items
            ],
            'total_items': sum(item.quantity for item in items),
            'total_price': sum(item.product.price * item.quantity for item in items),
        }

        return Response(cart_data, status=status.HTTP_200_OK)
    except Cart.DoesNotExist:
        return Response({'message': 'Cart is empty'}, status=status.HTTP_404_NOT_FOUND)


@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def remove_from_cart(request, product_id):
    try:
        cart = Cart.objects.get(user=request.user)
        print("Product ID to remove:", product_id)
        print("Cart items:", cart.cart_items.all()) 
        item = cart.cart_items.get(product__id=product_id)
        item.delete()
        return Response({'message': 'Item removed from cart'}, status=status.HTTP_204_NO_CONTENT)
    except Cart.DoesNotExist:
        return Response({'error': 'Cart not found'}, status=status.HTTP_404_NOT_FOUND)
    except CartItem.DoesNotExist:
        return Response({'error': 'Item not found in cart'}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def clear_cart(request):
    user = request.user
    try:
        cart = Cart.objects.get(user=user)
        cart.cart_items.all().delete()
        cart.delete()
        return Response({'message': 'Cart cleared successfully'}, status=status.HTTP_204_NO_CONTENT)
    except Cart.DoesNotExist:
        return Response({'error': 'Cart does not exist'}, status=status.HTTP_404_NOT_FOUND)
    

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def buy_now(request):
    user = request.user
    try:
        cart = Cart.objects.get(user=user)
        items = CartItem.objects.filter(cart=cart)
        
        if not items.exists():
            return Response({'error': 'Cart is empty'}, status=status.HTTP_400_BAD_REQUEST)

        total_price = sum(item.product.price * item.quantity for item in items)

        # Create Order
        order = Order.objects.create(user=user, total_price=total_price, status='Pending')

        # Create Order Items
        for item in items:
            OrderItem.objects.create(order=order, product=item.product, quantity=item.quantity, price=item.product.price)

        # Clear the cart
        items.delete()
        return Response({'message': 'Order placed successfully', 'order_id': order.id}, status=status.HTTP_201_CREATED)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
