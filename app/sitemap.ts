import type { MetadataRoute } from 'next';
import { fleet, destinations } from './components/data/siteData';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://mahadevkrupa.com';

    const mainPages: MetadataRoute.Sitemap = [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 1,
        },
        {
            url: `${baseUrl}/privacy-policy`,
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 0.3,
        },
        {
            url: `${baseUrl}/terms-of-service`,
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 0.3,
        },
    ];

    const fleetPages: MetadataRoute.Sitemap = fleet
        .filter((car) => !car.isInquiry)
        .map((car) => ({
            url: `${baseUrl}/fleet/${car.id}`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.8,
        }));

    const destinationPages: MetadataRoute.Sitemap = destinations.map((dest) => ({
        url: `${baseUrl}/destinations/${dest.id}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.8,
    }));

    return [...mainPages, ...fleetPages, ...destinationPages];
}

