# Build the application
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies (including dev dependencies needed for build)
RUN npm ci && npm cache clean --force

# Install serve globally for serving static files
RUN npm install -g serve

# Copy all source files
COPY . .

# Build arguments for API key and backend URL (can be overridden at build time)
ARG VITE_MISTRAL_API_KEY
ARG VITE_API_URL=http://backend:5000
ENV VITE_MISTRAL_API_KEY=$VITE_MISTRAL_API_KEY
ENV VITE_API_URL=$VITE_API_URL

# Build the application
RUN npm run build

# Expose port 80
EXPOSE 80

# Add healthcheck
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://localhost/ || exit 1

# Serve the built application
CMD ["serve", "-s", "dist", "-l", "80"]

