# Podman Full-Stack Development Environment

A professional-grade containerized development environment featuring Next.js frontend, Express backend, and PostgreSQL database, orchestrated with Podman.

## Features

### Frontend (Next.js 14+)
- ✅ TypeScript support
- ✅ Tailwind CSS with dark mode
- ✅ Hot module replacement
- ✅ Environment-aware API client
- ✅ Type-safe API communication

### Backend (Express)
- ✅ Node.js 20 with TypeScript
- ✅ JWT authentication system
- ✅ PostgreSQL integration
- ✅ Environment configuration
- ✅ Health check endpoints

### Development Environment
- ✅ Podman containerization
- ✅ Hot reloading for both frontend and backend
- ✅ Volume mounting for local development
- ✅ Single command startup
- ✅ PostgreSQL 16 with persistent storage

## Prerequisites

- Windows 11
- Podman installed and configured
- podman-compose installed
- PowerShell
- Node.js 20+ (recommended for local tooling)
- Cursor IDE (recommended)

## Quick Start

1. Clone this repository
2. Open PowerShell in the project directory
3. Copy environment files:
   ```powershell
   Copy-Item frontend/.env.example frontend/.env
   Copy-Item backend/.env.example backend/.env
   ```
4. Run the startup script:
   ```powershell
   .\startup.ps1
   ```

The script will:
- Clean up any existing containers
- Build and start all services
- Verify service health
- Display service URLs and useful commands

## Architecture

```mermaid
graph TB
    Client[Client Browser] --> Frontend[Frontend Container<br/>Next.js :3000]
    Frontend --> Backend[Backend Container<br/>Express :4000]
    Backend --> Database[(Database Container<br/>PostgreSQL :5432)]
```

## Service URLs

- Frontend: http://localhost:3000
- Backend API: http://localhost:4000
- Database: localhost:5432

## Project Structure

```
podman-fullstack/
├── frontend/                # Next.js frontend
│   ├── Dockerfile          # Frontend container configuration
│   ├── src/                # Frontend source code
│   ├── .env.example        # Example environment variables
│   └── ...
├── backend/                # Express backend
│   ├── Dockerfile          # Backend container configuration
│   ├── src/                # Backend source code
│   ├── .env.example        # Example environment variables
│   └── ...
├── docker-compose.yml      # Service orchestration config
├── cleanup.ps1             # Environment cleanup script
└── startup.ps1             # Environment startup script
```

## Development Workflow

### Local Development
- Use Cursor IDE for best TypeScript integration
- Frontend changes are automatically reflected in the browser
- Backend changes trigger automatic restart
- Database data persists between environment restarts

### API Development
- Backend API documentation available at http://localhost:4000/api-docs
- All API endpoints are prefixed with `/api/v1`
- Authentication endpoints:
  - POST `/api/v1/auth/register`
  - POST `/api/v1/auth/login`

### Database Access
- Default credentials in development:
  - User: postgres
  - Password: postgres
  - Database: postgres
- Connection string: `postgresql://postgres:postgres@localhost:5432/postgres`

### Useful Commands

View logs:
```powershell
# Frontend logs
podman logs -f podman-fullstack_frontend_1
# Backend logs
podman logs -f podman-fullstack_backend_1
# Database logs
podman logs -f podman-fullstack_db_1
```

Environment management:
```powershell
# Stop all services
podman-compose down
# Restart environment
.\startup.ps1
# Rebuild specific service
podman-compose build frontend
# View service status
podman-compose ps
```

## Configuration

### Environment Variables

Frontend environment variables (`frontend/.env`):
```env
NEXT_PUBLIC_API_URL=http://backend:4000
```

Backend environment variables (`backend/.env`):
```env
NODE_ENV=development
DATABASE_URL=postgresql://postgres:postgres@db:5432/postgres
PORT=4000
JWT_SECRET=your_development_secret
```

### Override Configurations
- Create `docker-compose.override.yml` for local-specific settings
- Use `.env.local` for local-only environment variables
- Modify `next.config.js` or `tsconfig.json` as needed

## Troubleshooting

1. **Services not starting**
   - Run `.\cleanup.ps1` manually
   - Check logs for specific service issues
   - Ensure ports 3000, 4000, and 5432 are available

2. **Hot reload issues**
   - Frontend: Check browser console for errors
   - Backend: Use Ctrl+F5 to hard refresh after changes
   - Verify file changes are in the correct directories

3. **Database connection issues**
   - Check database logs
   - Verify connection string in backend environment variables
   - Ensure database container is healthy

## Performance Tips

1. Mount volumes efficiently (avoid large node_modules directories)
2. Use .dockerignore files appropriately
3. Consider using docker-compose.override.yml for local-specific configurations
4. Keep development dependencies in devDependencies

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit changes
4. Push to the branch
5. Create a Pull Request

## Future Enhancements

- [ ] Redis cache integration
- [ ] Enhanced error handling
- [ ] Cross-platform testing
- [ ] CI/CD integration
- [ ] Development debugging tools
- [ ] Performance monitoring

## License

MIT License - feel free to use this for your own projects.