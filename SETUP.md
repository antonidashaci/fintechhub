# Fintech Hub Türkiye - Development Setup Guide

## Quick Start

### 1. Prerequisites

- Node.js 18+ and npm
- PostgreSQL 14+
- Git

### 2. Clone and Install

```bash
git clone https://github.com/yourusername/fintechhub.git
cd fintechhub
npm install
```

### 3. Database Setup

```bash
# Create database
createdb fintechhub

# Run schema
psql -d fintechhub -f server/db/schema.sql

# Seed data
node server/db/seed.js
```

### 4. Environment Configuration

```bash
cp .env.example .env
# Edit .env with your settings
```

### 5. Start Development

```bash
# Terminal 1: Start backend API
npm run dev

# Terminal 2: Serve frontend
npm run serve
```

Visit: `http://localhost:8080`

---

## Development Workflow

### Running the Backend

```bash
npm run dev          # Start with nodemon (auto-reload)
npm start            # Start production mode
```

### Serving Frontend

```bash
npm run serve        # http-server on port 8080
```

### Database Management

```bash
npm run db:setup     # Run schema
npm run db:seed      # Seed data
npm run db:reset     # Reset and reseed
```

### Update Market Data

```bash
npm run update:market    # Fetch latest TCMB rates
```

---

## Testing

```bash
npm test            # Run tests (when implemented)
npm run lint        # Run ESLint
```

---

## Demo Credentials

### User Account
- **Email**: demo@fintechhubturkiye.com
- **Password**: Fintech!2025

### API Testing

```bash
# Get token
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"demo@fintechhubturkiye.com","password":"Fintech!2025"}'

# Use token
curl -X GET http://localhost:3000/api/users/favorites \
  -H "Authorization: Bearer YOUR_TOKEN"
```

---

## Project Structure

```
fintechhub/
├── server/              # Backend API
│   ├── index.js        # Main server file
│   ├── db/             # Database layer
│   ├── routes/         # API routes
│   └── middleware/     # Auth & other middleware
├── data/               # Static data files
├── scripts/            # Utility scripts
├── dashboard/          # User dashboard
├── bankalar/           # Banks page
├── hakkimizda/         # About page
├── iletisim/           # Contact page
├── gizlilik-politikasi/ # Privacy policy
├── kullanim-sartlari/  # Terms of service
├── cerez-politikasi/   # Cookie policy
├── app.js              # Frontend logic
├── style.css           # Styles
├── index.html          # Main page
└── package.json        # Dependencies
```

---

## Common Tasks

### Add New Provider

1. Edit `data/providers.json`
2. Run `node server/db/seed.js` to update database

### Update Styles

1. Edit `style.css`
2. Refresh browser (no build step needed)

### Add New Route

1. Create route file in `server/routes/`
2. Import and use in `server/index.js`

---

## Troubleshooting

### Port Already in Use

```bash
# Find process
lsof -i :3000
# Kill process
kill -9 PID
```

### Database Connection Error

```bash
# Check PostgreSQL is running
pg_isready

# Restart PostgreSQL
sudo systemctl restart postgresql
```

### Frontend Not Loading

```bash
# Clear browser cache
# Check console for errors
# Verify http-server is running on correct port
```

---

## Next Steps

1. **Configure EVDS API** - Get key from TCMB for live rate updates
2. **Setup Analytics** - Add your Google Analytics tracking ID
3. **Customize Content** - Update provider data and news
4. **Add Tests** - Implement unit and integration tests
5. **Deploy** - Follow `DEPLOYMENT.md` for production setup

---

## Resources

- **API Docs**: http://localhost:3000/api/health
- **Database Schema**: `server/db/schema.sql`
- **Provider Data**: `data/providers.json`

---

## Getting Help

- **Issues**: https://github.com/yourusername/fintechhub/issues
- **Email**: dev@fintechhubturkiye.com

---

Happy coding! 🚀

