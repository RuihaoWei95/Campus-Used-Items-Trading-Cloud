# Use an official Node runtime as a parent image
FROM node:20

# Set the working directory in the container
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY . ./

# Install any needed packages specified in package.json
RUN npm install

# Make port 80 available to the world outside this container
EXPOSE 80

# Build the app
RUN npm run build

# Install `serve` to serve your app
RUN npm install -g serve

# Run serve when the container launches
CMD ["npm", "start"]
