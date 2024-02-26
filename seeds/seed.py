import boto3

# 创建 DynamoDB 客户端
dynamodb = boto3.resource('dynamodb')

# 填充用户表
def seed_users_table():
    table = dynamodb.Table('Users')
    users = [
        {'UserID': 'user1', 'Name': 'John Doe', 'Email': 'john.doe@example.com'},
        {'UserID': 'user2', 'Name': 'Jane Doe', 'Email': 'jane.doe@example.com'},
        # 可以在这里添加更多用户
    ]
    for user in users:
        table.put_item(Item=user)
    print('Users table seeded.')

# 填充产品表
def seed_products_table():
    table = dynamodb.Table('Products')
    products = [
        {'ProductID': 'prod1', 'Name': 'Laptop', 'Description': 'A high performance laptop', 'Price': 1200},
        {'ProductID': 'prod2', 'Name': 'Smartphone', 'Description': 'An innovative smartphone', 'Price': 800},
        {'ProductID': 'prod3', 'Name': 'Headphones', 'Description': 'Noise cancelling headphones', 'Price': 200},
        {'ProductID': 'prod4', 'Name': 'Coffee Maker', 'Description': 'A high quality coffee maker', 'Price': 100},
        {'ProductID': 'prod5', 'Name': 'Electric Toothbrush', 'Description': 'Rechargeable electric toothbrush', 'Price': 50},
        {'ProductID': 'prod6', 'Name': 'Gaming Console', 'Description': 'Latest model gaming console', 'Price': 500},
        {'ProductID': 'prod7', 'Name': '4K Television', 'Description': 'High definition 4K television', 'Price': 1500},
        {'ProductID': 'prod8', 'Name': 'Smart Watch', 'Description': 'Water resistant smart watch', 'Price': 250},
        # 可以在这里继续添加更多产品
    ]
    for product in products:
        table.put_item(Item=product)
    print('Products table seeded.')

# 填充购物车表
def seed_carts_table():
    table = dynamodb.Table('Carts')
    cart_items = [
        {'CartID': 'cart1', 'UserID': 'user1', 'ProductID': 'prod1', 'Quantity': 1},
        {'CartID': 'cart1', 'UserID': 'user1', 'ProductID': 'prod2', 'Quantity': 2},
        {'CartID': 'cart2', 'UserID': 'user2', 'ProductID': 'prod2', 'Quantity': 1},
        {'CartID': 'cart3', 'UserID': 'user1', 'ProductID': 'prod3', 'Quantity': 2},
        {'CartID': 'cart4', 'UserID': 'user2', 'ProductID': 'prod4', 'Quantity': 1},
        {'CartID': 'cart5', 'UserID': 'user1', 'ProductID': 'prod5', 'Quantity': 3},
        {'CartID': 'cart6', 'UserID': 'user2', 'ProductID': 'prod6', 'Quantity': 1},
        {'CartID': 'cart7', 'UserID': 'user1', 'ProductID': 'prod7', 'Quantity': 1},
        {'CartID': 'cart8', 'UserID': 'user2', 'ProductID': 'prod8', 'Quantity': 2},
        # 可以在这里添加更多购物车项，模拟不同的购物情况
    ]
    for item in cart_items:
        table.put_item(Item=item)
    print('Carts table seeded.')

def main():
    seed_users_table()
    seed_products_table()
    seed_carts_table()

if __name__ == '__main__':
    main()
