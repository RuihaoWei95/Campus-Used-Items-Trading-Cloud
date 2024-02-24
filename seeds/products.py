import boto3
from datetime import datetime

# Initialize a Boto3 DynamoDB resource
dynamodb = boto3.resource('dynamodb')

# Reference to your DynamoDB table
table = dynamodb.Table('ShoppingCart')

# Initialize table
# Scan the table (Note: Use with caution for large tables)
response = table.scan(
    ProjectionExpression='UserID, ItemID'
)

items = response['Items']

# Delete each item
for item in items:
    table.delete_item(
        Key={
            'UserID': item['UserID'],
            'ItemID': item['ItemID']
        }
    )

# Data for the new item
user_id = 'user_id_value'  # Replace with actual user ID
item_id = 'item_id_value'  # Replace with actual item ID
quantity = 1  # Quantity of the item
product_name = 'Example Product Name'
price = "19.99"  # Price of the item
added_on = datetime.utcnow().isoformat()  # Timestamp when the item is added

# Add the item to the ShoppingCart table
response = table.put_item(
   Item={
       'UserID': user_id,
       'ItemID': item_id,
       'Quantity': quantity,
       'ProductName': product_name,
       'Price': price,
       'AddedOn': added_on
   }
)

print("Item added to ShoppingCart:", response)