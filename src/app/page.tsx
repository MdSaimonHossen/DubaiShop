import { Metadata } from 'next';
import {
  getSettings,
  getServices,
  getBatteryBrands,
  getBatteryProducts,
  getVehicleBrands,
  getServiceLocations,
  getTestimonials,
  getFAQs,
  getAllSections
} from '@/lib/db';
import { generateLocalBusinessSchema, generateFaqSchema } from '@/lib/seo/meta';
import { HomepageClient } from '@/components/sections/HomepageClient';

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSettings();
  return {
    title: `${settings.companyName} | Mobile Car Battery Replacement & Diagnostics Dubai`,
    description: settings.metaDescription,
    openGraph: {
      title: `${settings.companyName} | Mobile Car Battery Replacement Dubai`,
      description: settings.metaDescription,
      locale: 'en_AE',
      type: 'website'
    },
    alternates: {
      canonical: '/'
    }
  };
}

export default async function HomePage() {
  const [
    settings,
    services,
    batteryBrands,
    batteryProducts,
    vehicles,
    locations,
    testimonials,
    faqs,
    sections
  ] = await Promise.all([
    getSettings(),
    getServices(),
    getBatteryBrands(),
    getBatteryProducts(),
    getVehicleBrands(),
    getServiceLocations(),
    getTestimonials(),
    getFAQs(),
    getAllSections()
  ]);

  const localBusinessSchema = generateLocalBusinessSchema(settings);
  const faqSchema = generateFaqSchema(faqs);

  return (
    <HomepageClient
      settings={settings}
      services={services}
      batteryBrands={batteryBrands}
      batteryProducts={batteryProducts}
      vehicles={vehicles}
      locations={locations}
      testimonials={testimonials}
      faqs={faqs}
      sections={sections}
      localBusinessSchema={localBusinessSchema}
      faqSchema={faqSchema}
    />
  );
}
