Step 1: Build docker image base upon Dockerfile on local machines. Notice: it is strongly recommended to explictly designate the platform where this image is intended to run. As in our case, we used to build our image on Macbook without specifying platform. Therefore by default, it will be built for ARM64 architecture. However, AWS EC2 Linux machines are AMD64. As a result, our original image failed to run there. 

Command: 
docker build --platform linux/amd64 -t <image_name>:<tag> .

Step 2: Push our local docker image to AWS ECR. We first create a new AWS ECR repository for our project. Then we go through required AWS CLI authentication process with our AWS IAM credential. Finally, we are able to push!(before pushing, don't forget to change the name and tag of the local image in accordance with AWS ECR standards)

Command: 
aws ecr create-repository --repository-name <repository_name>
aws ecr get-login-password --region <aws_region> | docker login --username AWS --password-stdin <aws_account_id>.dkr.ecr.<aws_region>.amazonaws.com
docker tag <image_name>:<tag> <aws_account_id>.dkr.ecr.<aws_region>.amazonaws.com/<repository_name>:<tag>
docker push <aws_account_id>.dkr.ecr.<aws_region>.amazonaws.com/<repository_name>:<tag>


Step 3: Start a new EC2 instance and configure its AWS VPC. We create and connect an EC2 instance, specifying its network ACL and security groups so that our virtual machine port 8080 is able to receive out-coming HTTP/HTTPS requests.

Step 4: Connect to our EC2 instance and install Docker. Generally, it is recommended to connect to EC2 through AWS CLI. Alternatively, we choose to connect to our instances through AWS web console for simplicity. After entering our Linux virtual machine, we do some update and install docker.

Step 5: Pull and run docker images.
As denoted in subtitle: simply docker pull and docker run. Don't forget port forwarding!

Command:
docker pull <aws_account_id>.dkr.ecr.<aws_region>.amazonaws.com/<repository_name>:<tag>
docker run -p 8080:8080 <aws_account_id>.dkr.ecr.<aws_region>.amazonaws.com/<repository_name>:<tag>
