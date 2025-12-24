# Nginx Configuration Files

This directory contains Nginx configuration files for the NotebookLLM application.

## Files

### nginx.conf
Basic Nginx configuration for development and simple deployments.

**Features:**
- HTTP only (port 80)
- Gzip compression
- Security headers
- Static asset caching
- SPA routing support
- Health check endpoint

**Usage:**
```bash
# Used automatically by docker-compose.yml
docker-compose up -d
```

### nginx.prod.conf
Production-ready Nginx configuration with SSL/HTTPS support.

**Features:**
- SSL/TLS (HTTPS) on port 443
- HTTP to HTTPS redirect
- Let's Encrypt support
- Enhanced security headers
- HSTS enabled
- OCSP stapling
- CSP headers
- Optimized caching

**Usage:**
```bash
# Used by docker-compose.prod.yml
docker-compose -f docker-compose.prod.yml up -d
```

## Configuration Details

### Port Configuration
- **HTTP**: Port 80
- **HTTPS**: Port 443 (production only)

### Security Headers
Both configurations include:
- `X-Frame-Options`: Prevents clickjacking
- `X-Content-Type-Options`: Prevents MIME sniffing
- `X-XSS-Protection`: XSS protection
- `Referrer-Policy`: Controls referrer information

Production adds:
- `Strict-Transport-Security`: Forces HTTPS
- `Content-Security-Policy`: Restricts resource loading

### Caching Strategy
- **Static assets** (JS, CSS, images): 1 year cache
- **HTML files**: No cache (production)
- **API responses**: Not cached

### Gzip Compression
Enabled for:
- Text files (HTML, CSS, JS, XML)
- JSON responses
- SVG images

Compression level: 6 (production)

## Customization

### Change Domain Name
Edit `nginx.prod.conf`:
```nginx
server_name your-domain.com www.your-domain.com;
```

Replace `your-domain.com` with your actual domain.

### Adjust Cache Times
Edit the `expires` directive:
```nginx
location ~* \.(js|css|png)$ {
    expires 30d;  # Change from 1y to 30 days
    # ...
}
```

### Add Custom Headers
Add to any `location` block:
```nginx
location / {
    add_header Custom-Header "value" always;
    # ...
}
```

### Enable Access Logs
Change `access_log off;` to:
```nginx
access_log /var/log/nginx/static-access.log;
```

## Testing Configuration

### Test Syntax
```bash
# Test local file
nginx -t -c nginx/nginx.conf

# Test in Docker container
docker exec notebookllm-app nginx -t
```

### Reload Configuration
```bash
# In Docker container
docker exec notebookllm-app nginx -s reload
```

## Troubleshooting

### 502 Bad Gateway
- Check if the application is running
- Verify port configuration
- Check Docker network connectivity

### SSL Certificate Errors
- Verify domain DNS points to server
- Check certificate paths in nginx.prod.conf
- Ensure certbot has created certificates

### Static Files Not Loading
- Verify build output in `/usr/share/nginx/html`
- Check file permissions
- Review cache headers

### Health Check Failing
```bash
# Test health endpoint
curl http://localhost/health

# Should return: healthy
```

## Performance Tips

1. **Enable HTTP/2**: Already enabled in production config
2. **Optimize Gzip**: Adjust `gzip_comp_level` (1-9)
3. **Increase Worker Processes**: Edit main nginx.conf (outside container)
4. **Enable Connection Reuse**: Keep-alive settings
5. **Use CDN**: For static assets in production

## Security Best Practices

✅ Implemented:
- Security headers enabled
- SSL/TLS configuration
- Hidden file protection
- HSTS enabled (production)
- CSP headers (production)

🔄 Consider:
- Rate limiting for API endpoints
- IP whitelisting for admin areas
- ModSecurity WAF
- Fail2ban integration

## References

- [Nginx Documentation](https://nginx.org/en/docs/)
- [Mozilla SSL Configuration](https://ssl-config.mozilla.org/)
- [Security Headers](https://securityheaders.com/)

---

**Note**: After modifying these files, restart the Docker containers:
```bash
docker-compose restart
```

