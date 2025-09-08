# 🚨 "Failed to Fetch" Error - Troubleshooting Guide

## Quick Fix Checklist

### 1. **Verify Environment Variables in Deployment Platform**

**For Vercel:**
1. Go to your Vercel project dashboard
2. Settings → Environment Variables
3. Ensure these are set:
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://pgjobxocgnbseaphcsyp.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBnam9ieG9jZ25ic2VhcGhjc3lwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM3ODc1MTQsImV4cCI6MjA2OTM2MzUxNH0.p12RKXGqBMdNDL94QyRMmSetGACkzEISTPYWKkH9NIU
   NEXT_PUBLIC_APP_SCHEME=suitable
   ```
4. **Redeploy** your application after adding variables

**For Netlify:**
1. Site settings → Environment variables
2. Add the same variables as above
3. Redeploy

### 2. **Configure Supabase for Deployed Domain**

1. Go to [Supabase Dashboard](https://app.supabase.com)
2. Select your project
3. Settings → API
4. **Site URL**: Add your deployed URL (e.g., `https://your-app.vercel.app`)
5. **Redirect URLs**: Add:
   - `https://your-app.vercel.app/auth/callback`
   - `https://your-app.vercel.app/**`

### 3. **Test Configuration**

1. Deploy your app with the diagnostic improvements
2. Open browser developer tools (F12)
3. Go to sign-in page
4. Check console for environment configuration logs
5. Look for the 🌐 Environment check log

## Common Causes & Solutions

### ❌ **"Failed to fetch" Error**

**Cause**: Missing or incorrect environment variables in deployment

**Solution**: 
- Set environment variables in your deployment platform
- Ensure the Supabase URL starts with `https://`
- Verify the API key is the full anon key (starts with `eyJ`)

### ❌ **"Connection failed" Error**

**Cause**: Supabase project not configured for your domain

**Solution**:
- Add your deployed domain to Supabase Site URL
- Configure redirect URLs in Supabase

### ❌ **Environment Variables Not Loading**

**Cause**: Variables not prefixed with `NEXT_PUBLIC_`

**Solution**:
- All client-side environment variables must start with `NEXT_PUBLIC_`
- Redeploy after adding variables

## Debugging Steps

### 1. **Check Browser Console**
```javascript
// Look for these logs in console:
🔐 Attempting sign in for: user@email.com
🌐 Environment check: { hasUrl: true, hasKey: true, ... }
```

### 2. **Network Tab**
- Check if requests are being made to the correct Supabase URL
- Look for 404 or CORS errors

### 3. **Environment Verification**
```javascript
// In browser console, run:
console.log({
  url: process.env.NEXT_PUBLIC_SUPABASE_URL,
  hasKey: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
});
```

## Platform-Specific Instructions

### **Vercel Deployment**
```bash
# 1. Set environment variables in Vercel dashboard
# 2. Redeploy
vercel --prod

# Or trigger redeploy from dashboard
```

### **Netlify Deployment**
```bash
# 1. Set environment variables in Netlify dashboard
# 2. Trigger redeploy
netlify deploy --prod
```

### **Other Platforms**
- Ensure environment variables are set in your platform's configuration
- Variables must be available at build time and runtime
- Redeploy after setting variables

## Verification Checklist

- [ ] Environment variables set in deployment platform
- [ ] Variables start with `NEXT_PUBLIC_`
- [ ] Supabase URL is correct and accessible
- [ ] API key is the full anon key
- [ ] Deployed domain added to Supabase Site URL
- [ ] Redirect URLs configured in Supabase
- [ ] Application redeployed after changes
- [ ] Browser console shows correct environment values
- [ ] Network requests going to correct Supabase URL

## Still Having Issues?

1. **Check Supabase Status**: [status.supabase.com](https://status.supabase.com)
2. **Verify API Key**: Ensure it's the anon key, not service role key
3. **Test Locally**: Confirm it works in development
4. **Clear Browser Cache**: Hard refresh (Ctrl+Shift+R)
5. **Check Deployment Logs**: Look for build-time errors

## Contact Support

If the issue persists:
1. Include browser console logs
2. Include network tab screenshots
3. Confirm environment variables are set
4. Test with the diagnostic component

