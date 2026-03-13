# ArdhiSoko Admin — Next.js Dashboard

A full-stack Next.js 14 admin dashboard for managing the ArdhiSoko real estate website.

## Tech Stack

- **Next.js 14** — App Router, Server Components
- **NextAuth.js** — Credentials-based authentication (JWT sessions)
- **Zustand** — Persistent client-side state (localStorage)
- **Tailwind CSS** — Utility-first styling
- **TypeScript** — Full type safety
- **react-hot-toast** — Toast notifications
- **bcryptjs** — Password hashing

---

## Quick Start

### 1. Install dependencies

```bash
npm install
```

### 2. Set up environment variables

```bash
cp .env.example .env.local
```

Edit `.env.local`:

```env
NEXTAUTH_SECRET=your-strong-random-secret
NEXTAUTH_URL=http://localhost:3000
ADMIN_USERNAME=admin
ADMIN_PASSWORD_HASH=$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi
NEXT_PUBLIC_IMGBB_API_KEY=your-imgbb-key
```

> **Default login:** `admin` / `ardhisoko2025`

### 3. Run the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — you'll be redirected to the login page.

---

## Features

| Section | Description |
|---|---|
| **Dashboard** | Overview stats — projects, prices, quick links |
| **Projects** | Edit Malindi, Konza, Kamakis — card info, gallery (5 photos), page details, payment plans |
| **Why Banners** | Edit 4 confidence banner cards |
| **Testimonials** | Edit 3 customer review cards |
| **Blog Posts** | Edit 6 property insight articles |
| **Contact** | Phone, email, WhatsApp, social links |
| **Logo & Branding** | Brand name, tagline, hero image |
| **Deploy** | Push all 4 HTML pages to GitHub or download locally |
| **Change Password** | Update admin password |

---

## Changing the Admin Password

1. Go to **Change Password** in the sidebar
2. Enter current + new password
3. The API returns a new bcrypt hash
4. Copy the hash and update `ADMIN_PASSWORD_HASH` in your `.env.local`
5. Restart the server

To generate a hash manually:
```bash
node -e "const b=require('bcryptjs'); b.hash('yourpassword',10).then(console.log)"
```

---

## Image Uploads

Images can be uploaded two ways:
1. **ImgBB API** (recommended) — set `NEXT_PUBLIC_IMGBB_API_KEY` in `.env.local`. Get a free key at [api.imgbb.com](https://api.imgbb.com/)
2. **Paste URL** — paste any direct image URL in the text field below the upload area
3. **Without API key** — files are loaded as base64 data URLs (works but not suitable for production)

---

## Data Persistence

All site data is saved in **localStorage** via Zustand's `persist` middleware. Changes survive page refreshes. The "Save Changes" button in the topbar marks changes as saved (clears the orange dot indicator).

For production, replace the Zustand store with API calls to a database (e.g. Supabase, PlanetScale, MongoDB Atlas).

---

## Deployment

### Deploy to Vercel

```bash
npm install -g vercel
vercel
```

Set the environment variables in the Vercel dashboard.

### Deploy to any Node.js host

```bash
npm run build
npm start
```

---

## Project Structure

```
ardhisoko-admin/
├── app/
│   ├── login/                    # Login page
│   ├── dashboard/
│   │   ├── layout.tsx            # Auth guard + sidebar/topbar layout
│   │   ├── page.tsx              # Overview dashboard
│   │   ├── projects/[id]/        # Project editor (4 tabs)
│   │   ├── settings/
│   │   │   ├── contact/          # Contact details
│   │   │   ├── logo/             # Logo & branding
│   │   │   ├── banners/          # Why banners (4 cards)
│   │   │   ├── testimonials/     # Testimonials (3)
│   │   │   ├── blog/             # Blog posts (6)
│   │   │   └── password/         # Change password
│   │   └── deploy/               # GitHub push + export
│   └── api/
│       └── auth/
│           ├── [...nextauth]/    # NextAuth handler
│           └── change-password/  # Password change API
├── components/
│   ├── layout/
│   │   ├── Sidebar.tsx
│   │   └── Topbar.tsx
│   ├── project/
│   │   ├── ProjectCardPreview.tsx
│   │   ├── GalleryManager.tsx
│   │   ├── SpecsEditor.tsx
│   │   └── PaymentPlansEditor.tsx
│   └── ui/
│       ├── Card.tsx
│       ├── FormField.tsx
│       ├── ImageUpload.tsx
│       └── FeatureList.tsx
├── lib/
│   ├── auth.ts                   # NextAuth config
│   ├── store.ts                  # Zustand store
│   ├── defaultData.ts            # Default site content
│   └── htmlExporter.ts           # Generates static HTML pages
└── types/
    └── index.ts                  # TypeScript types
```
