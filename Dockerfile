FROM node:lts-alpine

WORKDIR /app

# Install dependencies as a separate cached layer
COPY package*.json ./
RUN npm ci

# Copy the full source (overridden by volume mount in dev)
COPY . .

# Astro / Vite dev server port
EXPOSE 4321

# setup.sh runs this container in detached mode and stores Linux dependencies
# in a named volume, keeping them separate from the host installation.
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
