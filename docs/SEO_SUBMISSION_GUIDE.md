# Google Search Console & Local SEO Submission Guide

This guide provides step-by-step instructions for **Mahadev Krupa Tours & Travels** (`mahadevkrupa.vercel.app`) to maximize search engine indexing, local map rankings, and rich snippet visibility on Google Search and Bing.

---

## 1. Submit Sitemap to Google Search Console (GSC)

1. Go to [Google Search Console](https://search.google.com/search-console).
2. Add property `https://mahadevkrupa.vercel.app` (using URL prefix or domain verification).
3. In the left sidebar, click **Sitemaps**.
4. Enter the sitemap URL: `https://mahadevkrupa.vercel.app/sitemap.xml` and click **Submit**.
5. Verify that GSC successfully discovers all 24+ static URLs (including homepage, privacy policy, terms of service, `/fleet/*` pages, and `/destinations/*` pages).

---

## 2. Request Priority Indexing for Top Landing Pages

Use the **URL Inspection Tool** in Google Search Console to request immediate indexing for high-volume keywords:

### High-Priority Vehicle Pages:
- `https://mahadevkrupa.vercel.app/fleet/kia-carens` (Target: *Kia Carens rental in Surat*)
- `https://mahadevkrupa.vercel.app/fleet/urbania-12` (Target: *Force Urbania hire Surat*)
- `https://mahadevkrupa.vercel.app/fleet/tempo-traveller-17` (Target: *17 seater Tempo Traveller Surat*)
- `https://mahadevkrupa.vercel.app/fleet/tata-winger` (Target: *Tata Winger bus rental Surat*)

### High-Priority Route Pages:
- `https://mahadevkrupa.vercel.app/destinations/statue-of-unity` (Target: *Surat to Statue of Unity cab*)
- `https://mahadevkrupa.vercel.app/destinations/dwarka-somnath` (Target: *Surat to Dwarka Somnath tour*)
- `https://mahadevkrupa.vercel.app/destinations/goa` (Target: *Surat to Goa cab package*)
- `https://mahadevkrupa.vercel.app/destinations/udaipur` (Target: *Surat to Rajasthan tour*)

---

## 3. Google Business Profile (GBP) Local SEO Checklist

Your website includes structured `LocalBusiness` and `AggregateRating` schema matching your physical office in Surat:

- **Business Name**: `Mahadev Krupa Tours & Travels`
- **Phone Number**: `+91 97145 55226`
- **Address**: `Mahadev Car World, B/H Punjan Plaza, BRTS Rd, opp. Vanmali Junction, Surat, Gujarat 395006`
- **Google Maps Link**: `https://maps.app.goo.gl/H3hwoW7uTNTBC4TJA`

### Recommended Weekly GBP Actions:
1. **Collect Customer Reviews**: Ask satisfied travelers to leave 5-star Google reviews. Reply to every review mentioning the specific car (e.g., *"Thank you for renting our Innova Crysta!"*).
2. **Post Fleet Photos**: Upload high-resolution photos of your fleet (Kia Carens, Urbania, Tempo Travellers) directly to your Google Business Profile photo gallery.
3. **Weekly Posts**: Create short posts on Google Maps highlighting weekend travel packages (e.g., *"Book weekend trip to Statue of Unity from Surat"*).

---

## 4. Submit to Bing Webmaster Tools

1. Go to [Bing Webmaster Tools](https://www.bing.com/webmasters).
2. Sign in and import your site settings directly from Google Search Console.
3. Submit `https://mahadevkrupa.vercel.app/sitemap.xml`.

---

## 5. Summary of Built-in Technical & Schema SEO Features

- ✅ **24+ Indexable Pages**: Pure static pre-rendering (SSG) for maximum page speed.
- ✅ **Google Star Ratings**: `AggregateRating` JSON-LD schema (4.9/5 ★★★★★).
- ✅ **FAQ Accordion Rich Snippets**: `FAQPage` JSON-LD schema for Google SERP dropdowns.
- ✅ **Breadcrumb Trails**: `BreadcrumbList` JSON-LD schema on all subpages.
- ✅ **Brand Icons & Favicons**: Dynamic `/icon` and `/apple-icon` routes.
- ✅ **PWA & Web Manifest**: Dynamic `/manifest.webmanifest`.
- ✅ **Robots & Sitemap**: Automated `/robots.txt` and `/sitemap.xml`.
