# Ivoke Fashion Website

A beautiful single-page landing website with admin panel for Ivoke, a women's couture fashion brand blending traditional elegance with contemporary minimalism.

## Features

### Frontend (Landing Page)
- ✅ Responsive header with logo switching based on background
- ✅ Hero section with retro typography and CTA
- ✅ Interactive gallery grid with hover effects
- ✅ Testimonials section with vintage styling
- ✅ "Coming Soon" modals for incomplete pages
- ✅ Mobile-responsive design

### Admin Panel
- ✅ Secure admin login at `/admin/login`
- ✅ Content management for hero, gallery, and testimonials
- ✅ Dashboard with analytics and quick actions
- ✅ Responsive admin interface

## Technology Stack

- **Frontend**: React.js + TypeScript + Tailwind CSS
- **Backend**: Supabase (PostgreSQL + Authentication + Storage)
- **Routing**: React Router DOM
- **Authentication**: Supabase Auth with Row Level Security
- **Deployment**: Ready for Netlify/Vercel

## Design Aesthetic

- Clean, minimal layouts with traditional textures
- White & black alternating sections with pink (#E91E63) accents
- Vintage-inspired typography (Almendra Display, Mukta, Bitcount Grid Double)
- Airy, modern grid layouts with heritage patterns
- Subtle animations and micro-interactions

## Admin Credentials

- **Email**: Rishabhjain@270804
- **Password**: Rexjain@27

## Setup Instructions

1. **Clone and install dependencies**
   ```bash
   npm install
   ```

2. **Set up Supabase**
   - Create a new Supabase project
   - Copy your project URL and anon key
   - Run the migration script in your Supabase SQL editor

3. **Configure environment variables**
   ```bash
   cp .env.example .env
   # Fill in your Supabase credentials
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Access the application**
   - Frontend: `http://localhost:5173`
   - Admin: `http://localhost:5173/admin/login`

## Project Structure

```
src/
├── components/
│   ├── Layout/
│   │   ├── Header.tsx
│   │   └── Footer.tsx
│   ├── Sections/
│   │   ├── Hero.tsx
│   │   ├── Gallery.tsx
│   │   └── Testimonials.tsx
│   └── Admin/
│       ├── AdminLogin.tsx
│       ├── AdminDashboard.tsx
│       └── ProtectedRoute.tsx
├── hooks/
│   └── useAuth.ts
├── lib/
│   └── supabase.ts
├── pages/
│   └── HomePage.tsx
└── App.tsx
```

## Database Schema

- `admin_users` - Admin authentication
- `hero_content` - Hero section content
- `gallery_images` - Gallery image management
- `testimonials` - Customer testimonials
- `contact_messages` - Contact form submissions

## Deployment

The application is ready for deployment on:
- Netlify
- Vercel
- Any static hosting service

Build command: `npm run build`
Publish directory: `dist`

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

Private project for Ivoke Fashion Brand.