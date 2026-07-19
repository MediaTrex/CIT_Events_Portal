FROM node:20-alpine

# Create app directory
WORKDIR /app

# Install app dependencies (only production)
COPY package*.json ./
RUN npm ci --only=production

# Copy source code
COPY . .

# Expose port (default production port)
EXPOSE 8080

ENV NODE_ENV=production

CMD ["npm", "run", "start:prod"]
