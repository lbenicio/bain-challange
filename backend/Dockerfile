# Base
FROM node:latest AS base

USER root

RUN apt update -y && apt upgrade -y

# Builder
FROM base AS builder

WORKDIR /app

# Set node env to production
ENV NODE_ENV=development

RUN npm install -g @nestjs/cli
RUN npm i -g @swc/cli @swc/core


# Copy prisma files
COPY prisma ./prisma/

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

# Install app dependencies using the `npm ci` command instead of `npm install`
RUN npm ci

# Bundle app source
COPY . .

RUN npm run db:generate

# Creates a "dist" folder with the production build
RUN npm run build:prod

# Production
FROM base AS prod

# Set node env to production
ENV NODE_ENV=production

WORKDIR /app

# Copy files from previous step to prod
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/prisma ./prisma

RUN chown -R 1001:0 /app

# Expose por 3001 to TCP connections
EXPOSE 3000

# Use the default user from the image (instead of the root user)
USER 1001

# Download the cert files and start the service
CMD ["sh", "-c", "npm run start:prod"]
