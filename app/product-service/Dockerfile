# Use an official Node runtime as a base image
FROM node:18-alpine

# Set the working directory in the container 
WORKDIR /app/src

# Copy package.json and package-lock.json
COPY package*.json ./

# Install any needed packages specified in package.json
RUN npm install

# Bundle app source inside the Docker image
COPY . .

# Build the application
RUN npm run build

# Make port 4000 available to the world outside this container
EXPOSE 4001

# Run the app when the container launches
CMD ["npm", "start"]