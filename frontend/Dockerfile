# Development stage
FROM node:20-slim AS development

WORKDIR /app

# Install Next.js globally first
RUN npm install -g next

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application
COPY . .

# Expose port 3000
EXPOSE 3000

# Start Next.js using npx
CMD ["npx", "next", "dev"]