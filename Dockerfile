# =============================
# 1️⃣ Build Stage
# =============================
FROM node:20-alpine AS builder

# Set working directory
WORKDIR /app

# Install dependencies
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# Copy project files
COPY . .

# Build the Next.js app
RUN yarn build

# =============================
# 2️⃣ Production Stage
# =============================
FROM node:20-alpine AS runner

WORKDIR /app

# Install production dependencies only
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# Copy the built Next.js app from the builder stage
COPY --from=builder /app/.next .next
COPY --from=builder /app/public public
COPY --from=builder /app/node_modules node_modules
COPY --from=builder /app/package.json .

# Expose port 3000 for Next.js
EXPOSE 3000

# Run the app in production mode
CMD ["yarn", "start"]
