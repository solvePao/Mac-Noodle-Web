FROM node:lts-alpine

WORKDIR /app

# Install dependencies as a separate cached layer
COPY package*.json ./
RUN npm install

# Copy the full source (overridden by volume mount in dev)
COPY . .

# Astro / Vite dev server port
EXPOSE 4321

# Re-install inside the container at startup so platform-native bindings
# (e.g. rolldown) are correct for Linux even when the host volume is mounted.
# node_modules is shadowed by a named Docker volume in `make run`, so the
# Linux-built node_modules are never overwritten by the host's mac binaries.
CMD ["sh", "-c", "npm install && npm run dev -- --host 0.0.0.0"]
