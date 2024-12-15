# Development stage
FROM node:20-slim AS development

WORKDIR /app

# Install nodemon globally first
RUN npm install -g nodemon typescript ts-node

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy source code
COPY . .

# Expose API port
EXPOSE 4000

# Start development server
CMD ["nodemon", "--exec", "ts-node", "src/index.ts"]
