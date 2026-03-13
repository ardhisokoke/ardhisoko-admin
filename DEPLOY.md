# 🚀 ArdhiSoko — Deployment Guide
## GitHub Pages → Vercel (Full Next.js)

---

## Overview

Your site is now a **single Next.js project** with two parts:

| URL | What it is |
|---|---|
| `ardhisoko.co.ke` | Public website (homepage + project pages) |
| `ardhisoko.co.ke/admin` | Admin dashboard (login required) |
| `ardhisoko.co.ke/dashboard` | Admin dashboard content |

---

## Step 1 — Push the code to GitHub

You already have a GitHub account and repo. Do one of these:

### Option A — GitHub Desktop (easiest)
1. Open GitHub Desktop → **Add Existing Repository** → point to the `ardhisoko-admin` folder
2. Click **Publish Repository**
3. Name it `ardhisoko` (or whatever you prefer)

### Option B — Terminal
```bash
cd ardhisoko-admin
git init
git add .
git commit -m "Initial commit — full Next.js site"
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

---

## Step 2 — Deploy to Vercel

1. Go to **[vercel.com](https://vercel.com)** → sign in with GitHub
2. Click **"Add New Project"**
3. Click **"Import"** next to your `ardhisoko` repo
4. Vercel auto-detects Next.js — leave all settings as default
5. **Before clicking Deploy**, add Environment Variables (see Step 3)

---

## Step 3 — Set Environment Variables in Vercel

In the Vercel project settings under **Environment Variables**, add:

| Key | Value |
|---|---|
| `NEXTAUTH_SECRET` | Any long random string — use [generate-secret.vercel.app](https://generate-secret.vercel.app/32) |
| `NEXTAUTH_URL` | `https://ardhisoko.co.ke` (your final domain) |
| `ADMIN_USERNAME` | `admin` |
| `ADMIN_PASSWORD_HASH` | `$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi` |
| `NEXT_PUBLIC_IMGBB_API_KEY` | Get free key at [api.imgbb.com](https://api.imgbb.com) |

> Default login: `admin` / `ardhisoko2025`
> Change this password after first login.

6. Click **Deploy** — Vercel builds and gives you a URL like `ardhisoko.vercel.app`

---

## Step 4 — Connect your domain (ardhisoko.co.ke)

### In Vercel:
1. Go to your project → **Settings → Domains**
2. Type `ardhisoko.co.ke` → click **Add**
3. Also add `www.ardhisoko.co.ke`
4. Vercel shows you DNS records to add

### In your domain registrar (wherever you bought ardhisoko.co.ke):
Add these DNS records:

```
Type    Name    Value
A       @       76.76.21.21
CNAME   www     cname.vercel-dns.com
```

> DNS changes take 10–60 minutes to propagate globally.

---

## Step 5 — Disable GitHub Pages (old static site)

Since you're moving to Vercel:
1. Go to your old GitHub repo → **Settings → Pages**
2. Under "Source" → select **None** → Save

This prevents the old HTML files from conflicting.

---

## Step 6 — Test everything

Once your domain resolves to Vercel:

- ✅ `https://ardhisoko.co.ke` — Public homepage loads
- ✅ `https://ardhisoko.co.ke/projects/ma` — Malindi project page
- ✅ `https://ardhisoko.co.ke/projects/ko` — Konza project page
- ✅ `https://ardhisoko.co.ke/projects/ka` — Kamakis project page
- ✅ `https://ardhisoko.co.ke/admin` — Redirects to login
- ✅ `https://ardhisoko.co.ke/login` — Login page works
- ✅ Login with `admin` / `ardhisoko2025` → Dashboard opens

---

## Your Daily Workflow (After Go-Live)

```
1. Open ardhisoko.co.ke/admin
2. Log in
3. Edit any project, banner, testimonial, blog post, etc.
4. Click "Save Changes" (top right)
   → Changes are stored in the browser
   
⚠️ NOTE: The admin currently uses localStorage for data persistence.
For production, you'll want to add a database so changes persist
across devices and browsers. See "Upgrading to a Database" below.
```

---

## Upgrading to a Database (Optional — Recommended for Production)

The current setup saves data in the **browser's localStorage**. This means:
- Changes on one device won't show on another
- Clearing browser data loses your edits

### Recommended: Add Supabase (free tier)

1. Create a free project at [supabase.com](https://supabase.com)
2. Create a `site_data` table with a single JSON column
3. Replace the Zustand localStorage calls with Supabase API calls
4. Add `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` to Vercel env vars

Let me know if you'd like me to build this database integration for you.

---

## Image Uploads

Set `NEXT_PUBLIC_IMGBB_API_KEY` in Vercel to enable real image uploads:
1. Go to [api.imgbb.com](https://api.imgbb.com) → sign up free
2. Get your API key
3. Add it to Vercel environment variables
4. Redeploy

Without the key, you can still paste image URLs directly.

---

## Changing the Admin Password

1. Log into `/admin` → Change Password
2. Enter current password (`ardhisoko2025`) + new password
3. The API returns a new bcrypt hash
4. Go to **Vercel → Settings → Environment Variables**
5. Update `ADMIN_PASSWORD_HASH` with the new hash
6. Redeploy (Vercel auto-redeploys when env vars change)

---

## Need Help?

Common issues:

**"Application error" on Vercel** → Check the Function Logs in Vercel dashboard for the error message

**Domain not resolving** → Wait 60 minutes, then check DNS with [dnschecker.org](https://dnschecker.org)

**Login not working** → Double-check `NEXTAUTH_URL` matches your exact domain (with https://)

**Images not loading** → Make sure image domains are listed in `next.config.mjs` under `remotePatterns`
