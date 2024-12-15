#!/bin/bash

echo "🧹 Starting thorough Podman cleanup..."

# First stop any running compose environment
echo "Stopping any running compose environment..."
podman-compose down 2>/dev/null || echo "No compose environment running"

# Stop all running containers
echo "Stopping all running containers..."
podman stop $(podman ps -aq) 2>/dev/null || echo "No running containers to stop"

# Remove all containers
echo "Removing all containers..."
podman rm $(podman ps -aq) 2>/dev/null || echo "No containers to remove"

# Remove all pods
echo "Removing all pods..."
podman pod rm $(podman pod ls -q) 2>/dev/null || echo "No pods to remove"

# Remove all images (including those in use)
echo "Removing all images..."
podman rmi -f $(podman images -aq) 2>/dev/null || echo "No images to remove"

# Remove unused volumes (including named volumes)
echo "Removing unused volumes..."
podman volume rm $(podman volume ls -q) 2>/dev/null || echo "No volumes to remove"

# Remove custom networks (preserve default podman network)
echo "Removing custom networks..."
for network in $(podman network ls --format "{{.Name}}" | grep -v "podman"); do
    podman network rm "$network" 2>/dev/null || echo "Could not remove network $network"
done

# Final system prune to catch anything left
echo "Performing final system prune..."
podman system prune -f

echo "✨ Cleanup complete!"

# Show current state
echo -e "\n📊 Current System State:"
echo -e "\n=== Containers ==="
podman ps -a
echo -e "\n=== Images ==="
podman images
echo -e "\n=== Volumes ==="
podman volume ls
echo -e "\n=== Networks ==="
podman network ls
echo -e "\n=== Pods ==="
podman pod ls