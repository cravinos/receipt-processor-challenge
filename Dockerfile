# Dockerfile
FROM node:18-alpine as builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Build TypeScript code
RUN npm run build

# Production stage
FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install only production dependencies
RUN npm install --only=production

# Copy built code from builder stage
COPY --from=builder /app/dist ./dist

# Expose port
EXPOSE 8000

# Start the application
CMD ["node", "dist/app.js"]