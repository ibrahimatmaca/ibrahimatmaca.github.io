# Deployment Notes

## Favicon Files
All required favicon files have been created:
- `favicon.svg` - Modern SVG favicon for modern browsers
- `favicon.ico` - Fallback ICO file
- `favicon-16x16.png` - 16x16 PNG
- `favicon-32x32.png` - 32x32 PNG
- `apple-touch-icon.png` - 180x180 for iOS
- `android-chrome-192x192.png` - 192x192 for Android
- `android-chrome-512x512.png` - 512x512 for Android

## Troubleshooting

### index.tsx Module Error
If you see an error like:
```
Failed to load module script: Expected a JavaScript-or-Wasm module script but the server responded with a MIME type of "application/octet-stream"
```

This is typically caused by:
1. **Browser Cache**: Clear your browser cache and hard refresh (Ctrl+Shift+R or Cmd+Shift+R)
2. **Service Worker**: Unregister any service workers for this domain
3. **Browser Extensions**: Disable browser extensions that might be interfering

**Solution**: 
- Hard refresh the page (Ctrl+Shift+R / Cmd+Shift+R)
- Clear browser cache
- Check browser console for any cached service workers and unregister them

### MIME Type Configuration
The `.htaccess` file has been created with proper MIME type configurations. However, note that:
- **GitHub Pages** does not support `.htaccess` files
- For GitHub Pages, MIME types are handled automatically
- If deploying to Apache server, the `.htaccess` file will work

### Missing Screenshot Files
The `site.webmanifest` references screenshot files that are optional:
- `/img/screenshot-desktop.png` (optional)
- `/img/screenshot-mobile.png` (optional)

These can be added later if needed for PWA features.

## GitHub Pages Deployment
1. Push all files to the repository
2. GitHub Pages will automatically serve the site
3. Favicon files should be accessible at the root level
4. MIME types are handled automatically by GitHub Pages

## Apache Server Deployment
If deploying to Apache:
1. Ensure `.htaccess` file is uploaded
2. Ensure `mod_mime`, `mod_expires`, `mod_deflate`, and `mod_headers` are enabled
3. Test MIME types are being served correctly

