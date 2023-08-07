# Install dependencies only when needed
FROM node:16-alpine AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json ./
RUN yarn install

# Rebuild the source code only when needed
FROM node:16-alpine AS builder

WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules

ENV BLOG_POSTS_SERVER_URL http://server:8080
ENV NEXT_PUBLIC_BLOG_POSTS_SERVER_URL http://localhost:8080
ENV NEXT_PUBLIC_S3_SECRET_ACCESS_KEY "miniosecret"
ENV NEXT_PUBLIC_S3_ACCESS_KEY_ID "miniokey"
ENV NEXT_PUBLIC_S3_ENDPOINT "http://localhost:9000"
ENV NEXT_PUBLIC_S3_BUCKET_NAME "blog-posts"
ENV NEXT_PUBLIC_S3_REGION "us-east-1"

COPY . .
RUN yarn build && yarn install --production --ignore-scripts --prefer-offline

# Production image, copy all the files and run next
FROM node:16-alpine AS runner
WORKDIR /app
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001
COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

USER nextjs

EXPOSE 3000

# Next.js collects completely anonymous telemetry data about general usage.
CMD ["yarn", "start"]
