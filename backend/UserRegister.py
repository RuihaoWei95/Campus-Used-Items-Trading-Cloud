import boto3
from botocore.exceptions import ClientError

user_pool_id = 'us-west-1_INXyMjjFA'
client_id = '6orffc6fd8ci1osuf5k5flbgut'
dynamodb_table_name = 'Users'

# 初始化Cognito身份提供者客户端
def lambda_handler(event, context):
    # 从 event 对象中获取用户名、密码和电子邮件
    username = event['username']
    password = event['password']
    email = event['email']

    # 初始化Cognito身份提供者客户端
    client = boto3.client('cognito-idp')

    try:
        # 调用 sign_up 方法注册用户，并包括邮箱属性
        response = client.sign_up(
            ClientId=client_id,
            Username=username,
            Password=password,
            UserAttributes=[
                {
                    'Name': 'email',
                    'Value': email
                }
            ]
        )

        # 用户注册成功后，将注册信息写入DynamoDB
        dynamodb_client = boto3.client('dynamodb')

        dynamodb_client.put_item(
            TableName=dynamodb_table_name,
            Item={
                'UserID': {'S': username},  # 使用Cognito返回的用户名作为用户ID
                'Email': {'S': email},
                'Name': {'S': username}
            }
        )

        return {
            'statusCode': 200,
            'body': response
        }
    except ClientError as e:
        print(e.response['Error']['Message'])
        return {
            'statusCode': 400,
            'body': e.response['Error']['Message']
        }
