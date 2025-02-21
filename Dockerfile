# =============================
# 1️⃣ Build Stage
# =============================
FROM node:20-alpine AS builder

# Set working directory
WORKDIR /app

# Install CA Certificates (Required for MongoDB Atlas TLS)
RUN apk add --no-cache ca-certificates && update-ca-certificates

# Install dependencies separately (better caching)
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# Copy only necessary files to prevent cache invalidation
COPY . .

# Build the Next.js app
RUN yarn build

# =============================
# 2️⃣ Production Stage
# =============================
FROM node:20-alpine AS runner

WORKDIR /app

# Set production environment
ENV NODE_ENV=production

# Install CA Certificates (Required for MongoDB Atlas TLS)
RUN apk add --no-cache ca-certificates && update-ca-certificates

# Install only production dependencies (much faster than full install)
COPY --from=builder /app/package.json /app/yarn.lock ./
RUN yarn install --frozen-lockfile --production

# Copy the built Next.js app from the builder stage
COPY --from=builder /app/.next .next
COPY --from=builder /app/public public

# Expose port 3000 for Next.js
EXPOSE 3000

# Run the app in production mode
CMD ["yarn", "start"]
