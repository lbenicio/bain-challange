FROM node:21-alpine AS base

RUN apk add --no-cache g++ make py3-pip libc6-compat

WORKDIR /app

COPY package*.json ./

EXPOSE 3000

FROM base AS builder

WORKDIR /app

COPY . .

RUN npm run build:prod

FROM base AS production

WORKDIR /app

ENV NODE_ENV=production

RUN npm ci

RUN addgroup -g 1001 -S nodejs

USER 1001

COPY --from=builder --chown=1001:nodejs /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/public ./public

CMD ["sh", "-c", "npm run start:prod"]