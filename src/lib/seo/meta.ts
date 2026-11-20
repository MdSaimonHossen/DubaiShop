import { SiteSettings, ServiceItem, FAQItem } from '@/types';

export function generateLocalBusinessSchema(settings: SiteSettings) {
  return {
    '@context': 'https://schema.org',
    '@type': 'AutoRepair',
    name: settings.companyName,
    description: settings.metaDescription,
    telephone: settings.phoneEmergency,
    email: settings.emailPrimary,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Dubai',
      addressRegion: 'Dubai',
      addressCountry: 'AE',
      streetAddress: settings.addressText
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 25.2048,
      longitude: 55.2708
    },
    areaServed: [
      { '@type': 'City', name: 'Dubai' },
      { '@type': 'Place', name: 'Dubai Marina' },
      { '@type': 'Place', name: 'Downtown Dubai' },
      { '@type': 'Place', name: 'Business Bay' },
      { '@type': 'Place', name: 'Al Barsha' },
      { '@type': 'Place', name: 'Palm Jumeirah' },
      { '@type': 'Place', name: 'JLT' },
      { '@type': 'Place', name: 'Dubai Hills' }
    ],
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
          'Sunday'
        ],
        opens: '07:00',
        closes: '23:30'
      }
    ],
    priceRange: 'AED 350 - AED 950',
    currenciesAccepted: 'AED',
    paymentAccepted: 'Cash, Credit Card, Apple Pay'
  };
}

export function generateServiceSchema(service: ServiceItem, settings: SiteSettings) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.name,
    serviceType: 'Automotive Emergency & Maintenance Service',
    description: service.shortDescription,
    provider: {
      '@type': 'AutoRepair',
      name: settings.companyName,
      telephone: settings.phoneEmergency
    },
    areaServed: {
      '@type': 'City',
      name: 'Dubai'
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Mobile Automotive Services',
      itemListElement: service.features.map((feature, idx) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: feature
        },
        position: idx + 1
      }))
    }
  };
}

export function generateFaqSchema(faqs: FAQItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  };
}

export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url
    }))
  };
}
