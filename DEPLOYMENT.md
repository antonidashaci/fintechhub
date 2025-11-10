# Fintech Hub Türkiye - Production Deployment Guide

## Prerequisites

- **Node.js**: v18.0.0 or higher
- **PostgreSQL**: v14 or higher
- **Domain**: Registered domain with DNS access
- **SSL Certificate**: Let's Encrypt or commercial SSL
- **Server**: VPS or cloud hosting (DigitalOcean, AWS, Azure, etc.)

---

## 1. Server Setup

### 1.1 Initial Server Configuration

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Install PostgreSQL
sudo apt install -y postgresql postgresql-contrib

# Install Nginx (for reverse proxy)
sudo apt install -y nginx

# Install Certbot (for SSL)
sudo apt install -y certbot python3-certbot-nginx

# Install PM2 (process manager)
sudo npm install -g pm2
```

### 1.2 Create Application User

```bash
sudo adduser --system --group fintechhub
sudo mkdir -p /var/www/fintechhub
sudo chown -R fintechhub:fintechhub /var/www/fintechhub
```

---

## 2. Database Setup

### 2.1 Create Database and User

```bash
sudo -u postgres psql

# In PostgreSQL prompt:
CREATE DATABASE fintechhub;
CREATE USER fintechhub_user WITH ENCRYPTED PASSWORD 'your-secure-password';
GRANT ALL PRIVILEGES ON DATABASE fintechhub TO fintechhub_user;
\q
```

### 2.2 Run Schema Migrations

```bash
# Clone your repository
cd /var/www/fintechhub
git clone https://github.com/yourusername/fintechhub.git .

# Install dependencies
npm install

# Run database schema
sudo -u postgres psql -d fintechhub -f server/db/schema.sql

# Seed initial data
node server/db/seed.js
```

---

## 3. Environment Configuration

### 3.1 Create Production Environment File

```bash
cp .env.example .env
nano .env
```

### 3.2 Configure Environment Variables

```bash
# Production Configuration
NODE_ENV=production
PORT=3000

# Database
DB_HOST=localhost
DB_PORT=5432
DB_NAME=fintechhub
DB_USER=fintechhub_user
DB_PASSWORD=your-secure-password

# JWT Secret (generate a strong random string)
JWT_SECRET=generate-a-secure-random-string-min-32-chars-use-openssl-rand-base64-32

# Frontend URL
FRONTEND_URL=https://fintechhubturkiye.com

# TCMB EVDS API
EVDS_API_KEY=your-evds-api-key

# Email Configuration (optional)
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_USER=apikey
SMTP_PASS=your-sendgrid-api-key

# Analytics
GA_TRACKING_ID=G-YOUR-TRACKING-ID

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

---

## 4. Nginx Configuration

### 4.1 Create Nginx Site Configuration

```bash
sudo nano /etc/nginx/sites-available/fintechhub
```

### 4.2 Nginx Configuration Content

```nginx
# HTTP - Redirect to HTTPS
server {
    listen 80;
    listen [::]:80;
    server_name fintechhubturkiye.com www.fintechhubturkiye.com;
    
    return 301 https://$server_name$request_uri;
}

# HTTPS - Main Application
server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name fintechhubturkiye.com www.fintechhubturkiye.com;

    # SSL Configuration
    ssl_certificate /etc/letsencrypt/live/fintechhubturkiye.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/fintechhubturkiye.com/privkey.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers on;

    # Security Headers
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;

    # Root directory
    root /var/www/fintechhub;
    index index.html;

    # Gzip compression
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;

    # Static files
    location / {
        try_files $uri $uri/ /index.html;
    }

    # API proxy
    location /api/ {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    # Cache static assets
    location ~* \.(jpg|jpeg|png|gif|ico|css|js|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

### 4.3 Enable Site and Restart Nginx

```bash
sudo ln -s /etc/nginx/sites-available/fintechhub /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

---

## 5. SSL Certificate

### 5.1 Obtain Let's Encrypt Certificate

```bash
sudo certbot --nginx -d fintechhubturkiye.com -d www.fintechhubturkiye.com
```

### 5.2 Auto-Renewal Setup

```bash
# Test renewal
sudo certbot renew --dry-run

# Renewal is automatic via systemd timer
sudo systemctl status certbot.timer
```

---

## 6. Application Deployment

### 6.1 PM2 Configuration

Create `ecosystem.config.js`:

```javascript
module.exports = {
  apps: [{
    name: 'fintechhub-api',
    script: 'server/index.js',
    instances: 'max',
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'production'
    },
    error_file: '/var/log/fintechhub/error.log',
    out_file: '/var/log/fintechhub/out.log',
    log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
    merge_logs: true,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G'
  }]
};
```

### 6.2 Start Application

```bash
# Create log directory
sudo mkdir -p /var/log/fintechhub
sudo chown -R fintechhub:fintechhub /var/log/fintechhub

# Start with PM2
pm2 start ecosystem.config.js

# Save PM2 configuration
pm2 save

# Setup PM2 to start on boot
pm2 startup systemd -u fintechhub --hp /home/fintechhub
```

---

## 7. Monitoring and Maintenance

### 7.1 PM2 Monitoring

```bash
# View logs
pm2 logs fintechhub-api

# Monitor processes
pm2 monit

# View status
pm2 status
```

### 7.2 Database Backup

Create backup script at `/var/www/fintechhub/scripts/backup-db.sh`:

```bash
#!/bin/bash
BACKUP_DIR="/var/backups/fintechhub"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
mkdir -p $BACKUP_DIR

pg_dump -U fintechhub_user fintechhub | gzip > $BACKUP_DIR/fintechhub_$TIMESTAMP.sql.gz

# Keep only last 7 days of backups
find $BACKUP_DIR -name "fintechhub_*.sql.gz" -mtime +7 -delete
```

### 7.3 Cron Jobs

```bash
sudo crontab -e

# Add these lines:
# Database backup daily at 2 AM
0 2 * * * /var/www/fintechhub/scripts/backup-db.sh

# Update market rates every hour
0 * * * * cd /var/www/fintechhub && node scripts/fetch_tcmb_rates.js

# PM2 log rotation daily
0 0 * * * pm2 flush
```

---

## 8. Security Checklist

- [ ] Strong database passwords
- [ ] JWT secret is random and secure
- [ ] SSL certificate installed and auto-renewal configured
- [ ] Firewall configured (UFW or iptables)
- [ ] Fail2ban installed for brute-force protection
- [ ] Regular security updates scheduled
- [ ] Database backups automated
- [ ] Application logs monitored
- [ ] Rate limiting configured
- [ ] CORS properly configured

---

## 9. Deployment Commands

### 9.1 Update Application

```bash
cd /var/www/fintechhub
git pull origin main
npm install
pm2 reload ecosystem.config.js
```

### 9.2 Rollback

```bash
cd /var/www/fintechhub
git reset --hard HEAD~1
npm install
pm2 reload ecosystem.config.js
```

---

## 10. Performance Optimization

### 10.1 PostgreSQL Tuning

Edit `/etc/postgresql/14/main/postgresql.conf`:

```
shared_buffers = 256MB
effective_cache_size = 1GB
maintenance_work_mem = 64MB
checkpoint_completion_target = 0.9
wal_buffers = 16MB
default_statistics_target = 100
random_page_cost = 1.1
effective_io_concurrency = 200
work_mem = 4MB
min_wal_size = 1GB
max_wal_size = 4GB
```

### 10.2 Node.js Optimization

- Use clustering (PM2 cluster mode)
- Enable gzip compression
- Implement caching for static assets
- Use CDN for large assets

---

## 11. Troubleshooting

### Check Application Logs
```bash
pm2 logs fintechhub-api --lines 100
```

### Check Nginx Logs
```bash
sudo tail -f /var/log/nginx/error.log
sudo tail -f /var/log/nginx/access.log
```

### Check Database Connections
```bash
sudo -u postgres psql -d fintechhub -c "SELECT * FROM pg_stat_activity;"
```

### Restart Services
```bash
pm2 restart fintechhub-api
sudo systemctl restart nginx
sudo systemctl restart postgresql
```

---

## 12. Contact and Support

For deployment issues or questions:
- Email: devops@fintechhubturkiye.com
- Documentation: https://docs.fintechhubturkiye.com

---

**Last Updated**: January 10, 2025
**Version**: 2.0.0

