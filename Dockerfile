# Use official Node.js image
FROM node:18

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the app
COPY . .

# Expose the port (adjust if your app uses a different port)
EXPOSE 5000

# Command to run the app
CMD ["npm", "start"]
