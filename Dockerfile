# Base image
FROM node:latest as builder

# Working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy app files
COPY . .

# Build the app
RUN npm run build

# Production image
FROM nginx:latest

# Copy build files to nginx directory
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy nginx configuration file
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start nginx server
CMD ["nginx", "-g", "daemon off;"]
