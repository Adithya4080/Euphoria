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
                    'id': item.id,
                    'product': item.product.name,
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


@api_view(['POST'])
@permission_classes([IsAuthenticated])
@transaction.atomic  # Ensures atomicity
def checkout(request):
    items = request.data.get('items', [])

    # If no items are provided in the request
    if not items:
        return Response({'error': 'No items in the cart.'}, status=status.HTTP_400_BAD_REQUEST)

    total_price = 0

    # Create the Order instance
    order = Order(user=request.user)
    order.save()  # Save the order first to associate OrderItems with it

    for item in items:
        product_id = item.get('productId')
        quantity = item.get('quantity')

        # Validate if product_id and quantity are provided
        if not product_id or not quantity:
            return Response({'error': 'Invalid product data.'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            product = Product.objects.get(id=product_id)

            # Check if the product stock is sufficient
            if quantity > product.quantity:
                return Response({
                    'error': f'Insufficient stock for product ID {product_id}. Requested: {quantity}, Available: {product.quantity}'
                }, status=status.HTTP_400_BAD_REQUEST)

            # Create OrderItem and associate it with the Order
            order_item = OrderItem.objects.create(
                order=order,
                product=product,
                quantity=quantity
            )
            total_price += product.price * quantity

            # Reduce the product stock
            product.quantity -= quantity
            product.save()

        except Product.DoesNotExist:
            return Response({'error': f'Product with ID {product_id} does not exist.'}, status=status.HTTP_400_BAD_REQUEST)

    # After processing all items, update the total price and save the order
    order.total_price = total_price
    order.save()

    return Response({'message': 'Order placed successfully', 'order_id': order.id}, status=status.HTTP_201_CREATED)




@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def remove_from_cart(request, product_id):
    try:
        cart = Cart.objects.get(user=request.user)
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