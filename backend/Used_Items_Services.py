import json
import boto3
from boto3.dynamodb.conditions import Key
from decimal import Decimal
import uuid

# 初始化DynamoDB客户端
dynamodb = boto3.resource('dynamodb')
product_table = dynamodb.Table('Products')
cart_table = dynamodb.Table('Carts')


def lambda_handler(event, context):
    # 解析操作类型
    operation = event.get('operation')

    if operation == 'create':
        return create_product(event.get('product'))
    elif operation == 'purchase':
        return purchase_product(event.get('productId'), event.get('userId'), event.get('quantity'))
    elif operation == 'unlist':
        return unlist_product(event.get('productId'), event.get('requesterId'))
    elif operation == 'query':
        return query_products()
    elif operation == 'checkout':
        return checkout_cart(event.get('userId'),)
    elif operation == 'show_cart':
        return show_user_cart(event.get('userId'))
    elif operation == 'list_user_products':
        return list_user_products(event.get('userId'))
    elif operation == 'find_product_by_seller':
        return find_product_by_seller(event.get('sellerId'))
    else:
        return {
            'statusCode': 400,
            'body': json.dumps('Unsupported operation')
        }


def create_product(product):
    # 添加新商品
    if 'ProductID' not in product or 'Description' not in product or 'Name' not in product or 'Price' not in product or 'SellerID' not in product:
        return {'statusCode': 400, 'body': json.dumps('Missing required product information')}

    # 将价格从浮点数转换为 Decimal 类型
    product['Price'] = Decimal(str(product['Price']))

    response = product_table.put_item(Item=product)
    return {
        'statusCode': 200,
        'body': json.dumps('Product added successfully')
    }


def purchase_product(productId, userId, quantity):
    # 检查产品是否存在
    product_response = product_table.get_item(Key={'ProductID': productId})
    if 'Item' not in product_response:
        return {'statusCode': 404, 'body': json.dumps('Product not found')}

    product_item = product_response['Item']
    product_price = Decimal(str(product_item.get('Price', 0)))  # 获取产品价格
    product_quantity = int(product_item.get('Quantity', 0))

    # 检查库存是否足够
    if product_quantity < quantity:
        return {'statusCode': 400, 'body': json.dumps('Insufficient quantity in stock')}

    # 更新产品表中的库存数量
    updated_quantity = max(0, product_quantity - quantity)
    product_table.update_item(
        Key={'ProductID': productId},
        UpdateExpression='SET Quantity = :quantity',
        ExpressionAttributeValues={':quantity': updated_quantity}
    )

    # 计算购买商品的总价并累加到购物车的总价
    total_price = Decimal(0)
    if 'TotalPrice' in product_item:
        total_price = Decimal(str(product_item['TotalPrice']))
    total_price += product_price * Decimal(quantity)

    # 添加商品到购物车，并包含总价信息
    cart_item = {
        'CartID': str(uuid.uuid4()),  # 生成唯一的 CartID
        'UserID': userId,
        'ProductID': productId,
        'Quantity': quantity,
        'TotalPrice': total_price,  # 添加总价信息
        'ProductName': product_item.get('Name')  # 添加商品名字
    }
    cart_table.put_item(Item=cart_item)

    return {
        'statusCode': 200,
        'body': json.dumps('Product purchased successfully and added to cart')
    }


def unlist_product(productId, requesterId):
    # 查询产品信息
    product_response = product_table.get_item(Key={'ProductID': productId})
    if 'Item' not in product_response:
        return {'statusCode': 404, 'body': json.dumps('Product not found')}

    product_item = product_response['Item']
    seller_id = product_item.get('SellerID')

    # 检查操作用户是否为原上架用户
    if requesterId != seller_id:
        return {'statusCode': 403, 'body': json.dumps('Operation not allowed')}

    # 将商品数量直接设置为0，而不是标记为下架
    response = product_table.update_item(
        Key={'ProductID': productId},
        UpdateExpression='SET Quantity = :quantity',
        ExpressionAttributeValues={':quantity': 0}
    )
    return {
        'statusCode': 200,
        'body': json.dumps('Product quantity set to 0 successfully')
    }


def checkout_cart(userId):
    # 查询购物车中指定用户的所有商品
    response = cart_table.query(
        KeyConditionExpression=Key('UserID').eq(userId)
    )
    items = response['Items']

    # 循环删除购物车中同一用户购买的所有商品
    for item in items:
        cart_table.delete_item(
            Key={
                'UserID': userId,
                'ProductID': item['ProductID']
            }
        )

    return {
        'statusCode': 200,
        'body': json.dumps('Checkout successful and cart cleared')
    }



def show_user_cart(userId):
    response = cart_table.query(
        KeyConditionExpression=Key('UserID').eq(userId)
    )
    items = response['Items']

    return {
        'statusCode': 200,
        'body': json.dumps(items, default=decimal_to_str)
    }


def list_user_products(userId):
    response = product_table.scan(
        FilterExpression=Key('SellerID').eq(userId)
    )
    items = response['Items']

    return {
        'statusCode': 200,
        'body': json.dumps(items, default=decimal_to_str)
    }


def find_product_by_seller(seller_id):
    response = product_table.scan(
        FilterExpression=Key('SellerID').eq(seller_id)
    )
    items = response['Items']
    return {
        'statusCode': 200,
        'body': json.dumps(items, default=decimal_to_str)
    }


def decimal_to_str(o):
    if isinstance(o, Decimal):
        return str(o)
    raise TypeError("Object of type %s is not JSON serializable" % type(o).__name__)


def query_products():
    # 查询所有商品
    response = product_table.scan()
    items = response['Items']

    return {
        'statusCode': 200,
        'body': json.dumps(items, default=decimal_to_str)
    }
