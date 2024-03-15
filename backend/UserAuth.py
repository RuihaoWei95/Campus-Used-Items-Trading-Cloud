import json
import boto3
from botocore.exceptions import ClientError

# 初始化Cognito身份提供商客户端
cognito_client = boto3.client('cognito-idp', region_name='us-west-1')

# 配置您的Cognito用户池和客户端信息
USER_POOL_ID = 'us-west-1_INXyMjjFA'  # 替换为您的用户池ID
CLIENT_ID = '6orffc6fd8ci1osuf5k5flbgut'


def authenticate_user(username, password):
    try:
        response = cognito_client.admin_initiate_auth(
            UserPoolId=USER_POOL_ID,
            ClientId=CLIENT_ID,
            AuthFlow='ADMIN_NO_SRP_AUTH',
            AuthParameters={
                'USERNAME': username,
                'PASSWORD': password
            }
        )
        return response
    except ClientError as e:
        print(e)
        return None


def lambda_handler(event, content):
    # 从事件中提取用户名和密码
    username = event.get('username')
    password = event.get('password')

    if not username or not password:
        return {
            'statusCode': 400,
            'body': json.dumps('Username and password are required')
        }

    # 调用函数进行身份验证
    auth_response = authenticate_user(username, password)
    print(auth_response)
    if auth_response:
        return {
            'statusCode': 200,
            'body': ''
        }
    else:
        return {
            'statusCode': 401,
            'body': ''
        }

# 如果您想直接测试这个Lambda函数，可以取消注释下面的代码：
# 测试的event数据结