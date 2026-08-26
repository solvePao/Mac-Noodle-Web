IMAGE     := mac-noodle-web
CONTAINER := mac-noodle-dev
# Named volume: keeps Linux-built node_modules separate from the host macOS modules
NM_VOLUME := mac-noodle-nm
PORT      := 4321

.PHONY: build run restart stop logs

## Build the Docker image
build:
	docker build -t $(IMAGE) .

## Run the container in detached mode with hot-reload.
## The named volume $(NM_VOLUME) shadows node_modules so Linux-native
## bindings (rolldown etc.) are never clobbered by the host's macOS modules.
run:
	docker volume create $(NM_VOLUME) >/dev/null
	docker run -d \
	  --name $(CONTAINER) \
	  -p $(PORT):4321 \
	  -v "$(PWD):/app" \
	  -v "$(NM_VOLUME):/app/node_modules" \
	  $(IMAGE)
	@echo ""
	@echo "  ✓ Dev server → http://localhost:$(PORT)"
	@echo ""

## Stop the container, rebuild the image, and start fresh  ← primary target
restart: stop build run

## Stop and remove the running container (volume is preserved for fast restarts)
stop:
	-docker stop $(CONTAINER) 2>/dev/null || true
	-docker rm   $(CONTAINER) 2>/dev/null || true

## Tail container logs (Ctrl-C to exit)
logs:
	docker logs -f $(CONTAINER)
