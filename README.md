# Mahadev Krupa Tours & Travels 🚗✨

A modern, high-performance luxury travel agency web application built for **Mahadev Krupa Tours & Travels** (Surat, Gujarat). The platform features an interactive fleet showcase, curated tour destination guides, quick booking & inquiry handling, smooth animations, and full SEO optimization.

---

## 🚀 Quick Start Guide

### Prerequisites
- **[Node.js](https://nodejs.org)**: Version `18.x` or `20.x` (recommended)
- **Package Manager**: `npm` (comes with Node.js)

### Installation

1. **Clone or extract the repository:**
   ```bash
   git clone <repository-url>
   cd Mahadev-Krupa
   ```

2. **Install all project dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Create a `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://your-supabase-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
   ```

4. **Start the local development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **UI Library**: [React 19](https://react.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Database / Backend**: [Supabase](https://supabase.com/) (`@supabase/supabase-js`)

---

## 📜 Available Scripts

In the project directory, you can run:

| Command | Description |
| :--- | :--- |
| `npm run dev` | Starts the development server at `http://localhost:3000` |
| `npm run build` | Compiles and builds the production bundle |
| `npm run start` | Launches the production server after building |
| `npm run lint` | Runs Next.js ESLint checks |

---

## 📁 Project Structure

```text
Mahadev-Krupa/
├── app/                        # Next.js App Router pages & layouts
│   ├── fleet/[id]/             # Dynamic car detail pages
│   ├── destinations/[id]/      # Dynamic destination detail pages
│   ├── terms-of-service/       # Terms of service page
│   ├── sitemap.ts              # Dynamic XML sitemap generator
│   ├── layout.tsx              # Root layout & SEO structured data (JSON-LD)
│   └── page.tsx                # Main Landing Page
├── app/components/             # UI Components & Sections
│   ├── data/
│   │   ├── siteData.ts         # Central content repository (Fleet, Destinations, Services, Testimonials)
│   │   └── bookingStore.ts     # Global state store for booking modals
│   ├── sections/               # Home page section components (Hero, Fleet, Destinations, etc.)
│   ├── ui/                     # Reusable UI wrappers & motion components
│   └── QuickBookingPanel.tsx   # Booking modal & inquiry drawer
├── docs/                       # Guides (SEO submission guide, etc.)
├── public/                     # Static assets, brand images, icons
├── .env.local                  # Environment configuration
├── next.config.ts              # Next.js configuration
├── package.json                # Dependencies & scripts
└── README.md                   # Project documentation
```

---

## 📝 How to Update & Manage Site Content

All major site content (cars, destinations, services, testimonials) is centrally managed in **[`app/components/data/siteData.ts`](file:///Users/sanket/Desktop/Mahadev-Krupa/app/components/data/siteData.ts)**.

### 🚘 1. How to Add a New Car to the Fleet

Open `app/components/data/siteData.ts` and add a new car object into the `fleet` array:

```typescript
{
    id: 'car-unique-slug',                // Unique ID used in URL (/fleet/car-unique-slug)
    name: 'Toyota Fortuner',             // Vehicle name displayed on cards
    category: 'Luxury SUV',              // Category badge
    seats: '6 + 1 Driver',               // Seating capacity label
    coverImage: 'https://image-link.com/cover.webp', // Main card image
    images: [                            // Gallery images for detail page
        'https://image-link.com/image1.webp',
        'https://image-link.com/image2.webp',
    ],
    description: 'Detailed description of vehicle comfort and features...',
    specs: [                             // Specifications table on detail page
        { label: 'Seating Capacity', value: '7 Passengers' },
        { label: 'Air Conditioning', value: 'Dual Zone AC' },
        { label: 'Audio System', value: 'JBL Premium Surround' },
    ],
    highlights: ['7 Seats', 'Dual AC', 'JBL Audio', 'Leather Seats'], // Tags on vehicle card
},
```

---

### 📍 2. How to Add a New Destination

Open `app/components/data/siteData.ts` and add a new destination to the `destinations` array:

```typescript
{
    id: 'destination-slug',               // Unique ID used in URL (/destinations/destination-slug)
    name: 'Manali',                       // Destination title
    tagline: 'Valley of the Gods',        // Tagline subtitle
    coverImage: 'https://image-link.com/cover.webp',
    images: [
        'https://image-link.com/photo1.webp',
    ],
    about: 'Description of the destination...',
    highlights: ['Solang Valley', 'Rohtang Pass', 'Hadimba Temple'],
    bestTime: 'Oct – Jun',
    distance: '~1,200 km',
},
```

---

### ⭐ 3. How to Add or Edit Testimonials

Open `app/components/data/siteData.ts` and update the `testimonials` array:

```typescript
{
    name: 'Customer Name',
    role: 'Business Traveler / Tourist',
    text: 'Great experience with Mahadev Krupa Tours & Travels...',
    rating: 5,
},
```

---

## 🚢 Deployment

This project is optimized for deployment on **[Vercel](https://vercel.com/)**:

1. Connect your repository (GitHub / GitLab / Bitbucket) to Vercel.
2. Set the build framework preset to **Next.js**.
3. Add your Environment Variables (`NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`) in the Vercel dashboard.
4. Click **Deploy**.

---

## 📞 Support & Contact

- **Agency**: Mahadev Krupa Tours & Travels
- **Location**: Surat, Gujarat, India
- **Phone**: +91 97145 55226
- **Email**: mahadevkrupatourstravels@gmail.com
