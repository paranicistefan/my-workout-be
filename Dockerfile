# Stage 1: Build the application

# Use the LTS version of Node.js as the parent image
FROM node:lts as builder

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json, yarn.lock, and other necessary files
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install

# Copy the rest of your app's source code from your host to your image filesystem.
COPY . .

# Build the application
RUN yarn build


# Stage 2: Run the application

# Use a smaller LTS node image to reduce the final image size
FROM node:lts-alpine

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json, yarn.lock, and other necessary files
COPY package.json yarn.lock ./

# Install only production dependencies
RUN yarn install --production

# Copy built assets from the builder stage
COPY --from=builder /usr/src/app/dist ./dist

# Your app binds to port 3000 by default, so use the EXPOSE instruction to have it mapped by the docker daemon
EXPOSE 3000

# Define the command to run your app using CMD which defines your runtime
CMD ["node", "dist/main"]
