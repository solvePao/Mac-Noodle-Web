#!/usr/bin/env bash
set -euo pipefail

IMAGE="mac-noodle-web"
CONTAINER="mac-noodle-dev"
# Named volume: keeps Linux-built node_modules separate from the host macOS modules
NM_VOLUME="mac-noodle-nm"
PORT="4321"

usage() {
  echo "Usage: $0 {build|run|restart|stop|logs}"
  echo ""
  echo "  build    Build the Docker image"
  echo "  run      Run the container in detached mode with hot-reload"
  echo "  restart  Stop, rebuild, and start fresh (primary target)"
  echo "  stop     Stop and remove the running container (volume preserved)"
  echo "  logs     Tail container logs (Ctrl-C to exit)"
  exit 1
}

## Build the Docker image
cmd_build() {
  docker build -t "$IMAGE" .
}

## Run the container in detached mode with hot-reload.
## The named volume $NM_VOLUME shadows node_modules so Linux-native
## bindings (rolldown etc.) are never clobbered by the host's macOS modules.
cmd_run() {
  docker volume create "$NM_VOLUME" >/dev/null
  docker run -d \
    --name "$CONTAINER" \
    -p "${PORT}:4321" \
    -v "$(pwd):/app" \
    -v "${NM_VOLUME}:/app/node_modules" \
    "$IMAGE"

  echo ""
  echo "  ✓ Dev server → http://localhost:${PORT}"
  echo ""
}

## Stop and remove the running container (volume is preserved for fast restarts)
cmd_stop() {
  docker stop "$CONTAINER" 2>/dev/null || true
  docker rm   "$CONTAINER" 2>/dev/null || true
}

## Stop the container, rebuild the image, and start fresh  ← primary target
cmd_restart() {
  cmd_stop
  cmd_build
  cmd_run
}

## Tail container logs (Ctrl-C to exit)
cmd_logs() {
  docker logs -f "$CONTAINER"
}

case "${1:-}" in
  build)   cmd_build   ;;
  run)     cmd_run     ;;
  restart) cmd_restart ;;
  stop)    cmd_stop    ;;
  logs)    cmd_logs    ;;
  *)       usage       ;;
esac
