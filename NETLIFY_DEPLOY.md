# Netlify Deployment Fix

## Deploy Settings in Netlify Dashboard:

1. **Build command:** `npm run build`
2. **Publish directory:** `build/client`
3. **Functions directory:** `netlify/functions`

## After Pushing to GitHub:

1. Go to Netlify Dashboard
2. Site Settings → Build & Deploy → Build Settings
3. Set the above values
4. Deploy Settings → Deploy Contexts
5. Clear cache and redeploy

## If Still 404:

Check Netlify Functions logs:
- Go to Functions tab
- Check if `server` function is deployed
- View function logs for errors

The site uses React Router 7 SSR which requires Netlify Functions.
