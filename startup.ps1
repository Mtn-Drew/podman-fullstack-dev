# Enhanced startup script for Podman fullstack environment
# startup.ps1

function Test-Endpoint {
    param (
        [string]$Url,
        [string]$Name
    )
    try {
        $response = Invoke-WebRequest -Uri $Url -Method Get -TimeoutSec 30
        if ($response.StatusCode -eq 200) {
            Write-Host "$Name is running and responding"
            return $true
        }
    }
    catch {
        Write-Host "$Name is not responding"
        return $false
    }
}

Write-Host "Starting Podman fullstack environment..."

# Run cleanup first
Write-Host "Cleaning up previous environment..."
.\cleanup.ps1

# Start services
Write-Host "Starting services..."
podman-compose up -d

# Wait for initial startup
Write-Host "Waiting for services to initialize..."
Start-Sleep -Seconds 10

# Check container status
Write-Host "Checking container status..."
podman ps

# Verify each service
Write-Host "Verifying services..."

$frontendOk = Test-Endpoint -Url "http://localhost:3000" -Name "Frontend"
$backendOk = Test-Endpoint -Url "http://localhost:4000" -Name "Backend"
$healthOk = Test-Endpoint -Url "http://localhost:4000/health" -Name "Database connection"

# Summary
Write-Host "Environment Status:"
Write-Host "Frontend URL: http://localhost:3000"
Write-Host "Backend URL:  http://localhost:4000"
Write-Host "Database:     localhost:5432"

Write-Host "Useful Commands:"
Write-Host "- View frontend logs:  podman logs -f podman-fullstack_frontend_1"
Write-Host "- View backend logs:   podman logs -f podman-fullstack_backend_1"
Write-Host "- View database logs:  podman logs -f podman-fullstack_db_1"
Write-Host "- Stop all services:   podman-compose down"
Write-Host "- Restart services:    .\startup.ps1"

Write-Host "Development Notes:"
Write-Host "- Frontend changes will hot-reload automatically"
Write-Host "- Backend changes will hot-reload but require a hard refresh (Ctrl+F5) in browser"
Write-Host "- Database data persists between restarts"

if (-not ($frontendOk -and $backendOk -and $healthOk)) {
    Write-Host "Warning: Some services are not responding properly. Check the logs for details."
    exit 1
}

Write-Host "Environment is ready!"