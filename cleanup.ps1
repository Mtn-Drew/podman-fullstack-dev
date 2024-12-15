# Stop and remove compose environment
Write-Host "Stopping compose environment..."
podman-compose down

# Stop and remove all containers
Write-Host "Removing all containers..."
$containers = $(podman ps -aq)
if ($containers) {
    podman stop $containers
    podman rm $containers
}

# Remove all pods
Write-Host "Removing all pods..."
$pods = $(podman pod ls -q)
if ($pods) {
    podman pod rm $pods
}

# Remove all images
Write-Host "Removing all images..."
$images = $(podman images -q)
if ($images) {
    podman rmi $images -f
}

# Remove volumes
Write-Host "Removing volumes..."
$volumes = $(podman volume ls -q)
if ($volumes) {
    podman volume rm $volumes
}

# Remove custom networks
Write-Host "Removing custom networks..."
$networks = podman network ls --format "{{.Name}}" | Where-Object { $_ -ne "podman" }
foreach ($network in $networks) {
    podman network rm $network
}

# Final cleanup
Write-Host "Final system prune..."
podman system prune -f

# Show current state
Write-Host "`nCurrent State:"
Write-Host "`nContainers:"
podman ps -a
Write-Host "`nImages:"
podman images
Write-Host "`nVolumes:"
podman volume ls
Write-Host "`nNetworks:"
podman network ls
Write-Host "`nPods:"
podman pod ls