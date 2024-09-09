from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny


from api.v1.euphoria.serializers import CategorySerializer, ProductSerializer
from web.models import Category, Product


@api_view(["GET"])
@permission_classes([AllowAny])
def category(request):
    instances = Category.objects.filter(is_deleted=False)

    context = {
        "request":request
    }

    serializer = CategorySerializer(instances, many=True, context=context)
    response_data = {
        "status_code" : 6000,
        "data" : serializer.data
    }

    return Response(response_data)


@api_view(["GET"])
@permission_classes([AllowAny])
def product(request, pk):
    if Product.objects.filter(pk=pk).exists():
        instance = Product.objects.get(pk=pk)

        context = {
            "request":request
        }

        serializer = ProductSerializer(instance, context=context)
        response_data = {
            "status_code" : 6000,
            "data" : serializer.data
        }

        return Response(response_data)
    
    else:
        response_data = {
            "status_code" : 6001,
            "message": "Does Not Exist"
        }

        return Response(response_data)
    

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def protected(request, pk):
    if Product.objects.filter(pk=pk).exists():
        instance = Product.objects.get(pk=pk)

        context = {
            "request":request
        }

        serializer = ProductSerializer(instance, context=context)
        response_data = {
            "status_code" : 6000,
            "data" : serializer.data
        }

        return Response(response_data)
    
    else:
        response_data = {
            "status_code" : 6001,
            "message": "Does Not Exist"
        }

        return Response(response_data)
    

@api_view(["GET"])
@permission_classes([AllowAny])
def categories_by_gender(request, gender_id):
    categories = Category.objects.filter(gender_id=gender_id, is_deleted=False)
    context = {
        "request": request
    }
    serializer = CategorySerializer(categories, context=context, many=True)
    response_data = {
        "status_code": 6000,
        "data": serializer.data
    }
    return Response(response_data)


@api_view(["GET"])
@permission_classes([AllowAny])
def products_by_category(request, category_id):
    try:
        category = Category.objects.get(id=category_id)
    except Category.DoesNotExist:
        return Response({
            "status_code": 6001,
            "message": "Category not found"
        })

    products = Product.objects.filter(category=category, is_deleted=False)
    context = {
        "request": request
    }
    
    serializer = ProductSerializer(products, context=context, many=True)

    response_data = {
        "status_code": 6000,
        "category_name": category.name,  
        "data": serializer.data
    }

    return Response(response_data)


@api_view(["GET"])
@permission_classes([AllowAny])
def similar_products_by_category(request, category_id, exclude_product_id):
    try:
        # Fetch products with the same category, excluding the current one
        products = Product.objects.filter(category_id=category_id, is_deleted=False).exclude(id=exclude_product_id)

        # Check if products exist
        if not products.exists():
            return Response({
                "status_code": 6001,
                "message": "No similar products found"
            }, status=status.HTTP_404_NOT_FOUND)

        # Serialize products
        serializer = ProductSerializer(products, many=True, context={"request": request})

        return Response({
            "status_code": 6000,
            "products": serializer.data
        }, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({
            "status_code": 6001,
            "error": str(e)
        }, status=status.HTTP_400_BAD_REQUEST)


@api_view(["GET"])
@permission_classes([IsAuthenticated])  # Ensure only logged-in users can access
def protected_category_products(request, category_id):
    try:
        category = Category.objects.get(id=category_id)
    except Category.DoesNotExist:
        return Response({
            "status_code": 6001,
            "message": "Category not found"
        })

    products = Product.objects.filter(category=category, is_deleted=False)
    context = {
        "request": request
    }

    serializer = ProductSerializer(products, context=context, many=True)

    response_data = {
        "status_code": 6000,
        "category_name": category.name,
        "data": serializer.data
    }

    return Response(response_data)