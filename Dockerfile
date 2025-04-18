# Use Node.js LTS Version
FROM node:18

# Install pnpm
RUN npm install -g pnpm

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY pnpm-lock.yaml ./
COPY package.json ./
RUN npm install

# Copy the rest of the project
COPY . ./

# Expose the port the app runs on
EXPOSE 3000

# START the app
CMD ["npm", "start"]
