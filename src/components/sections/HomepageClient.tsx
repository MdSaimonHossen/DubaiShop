'use client';

import React, { useState } from 'react';
import {
  SiteSettings,
  ServiceItem,
  BatteryBrand,
  BatteryProduct,
  VehicleBrand,
  ServiceLocation,
  Testimonial,
  FAQItem,
  PageSectionConfig
} from '@/types';
import { Navbar } from '@/components/layout/Navbar';
import { StickyMobileBar } from '@/components/layout/StickyMobileBar';
import { Footer } from '@/components/layout/Footer';
import { EmergencyRequestModal } from '@/components/forms/EmergencyRequestModal';

import { EmergencyHero } from '@/components/sections/EmergencyHero';
import { TrustStrip } from '@/components/sections/TrustStrip';
import { PrimaryBatteryService } from '@/components/sections/PrimaryBatteryService';
import { HowItWorksSimple } from '@/components/sections/HowItWorksSimple';
import { BatteryComparison } from '@/components/sections/BatteryComparison';
import { SecondaryServices } from '@/components/sections/SecondaryServices';
import { DubaiCoverage } from '@/components/sections/DubaiCoverage';
import { EditorialTestimonials } from '@/components/sections/EditorialTestimonials';
import { MinimalFAQ } from '@/components/sections/MinimalFAQ';
import { MinimalFinalCTA } from '@/components/sections/MinimalFinalCTA';

interface HomepageClientProps {
  settings: SiteSettings;
  services: ServiceItem[];
  batteryBrands: BatteryBrand[];
  batteryProducts: BatteryProduct[];
  vehicles: VehicleBrand[];
  locations: ServiceLocation[];
  testimonials: Testimonial[];
  faqs: FAQItem[];
  sections?: PageSectionConfig[];
  localBusinessSchema: Record<string, any>;
  faqSchema: Record<string, any>;
}

export function HomepageClient({
  settings,
  services,
  batteryBrands,
  batteryProducts,
  vehicles,
  locations,
  testimonials,
  faqs,
  sections,
  localBusinessSchema,
  faqSchema
}: HomepageClientProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState('Car Battery Replacement');

  const testimonialsSectionConfig = sections?.find((s) => s.sectionKey === 'testimonials');
  const faqsSectionConfig = sections?.find((s) => s.sectionKey === 'faqs');

  const isTestimonialsVisible = testimonialsSectionConfig ? testimonialsSectionConfig.isActive : true;
  const isFaqsVisible = faqsSectionConfig ? faqsSectionConfig.isActive : true;

  const handleOpenModal = (serviceName = 'Car Battery Replacement') => {
    setSelectedService(serviceName);
    setModalOpen(true);
  };

  return (
    <>
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <Navbar settings={settings} onRequestModalOpen={() => handleOpenModal()} />

      <main className="flex-1">
        {/* 01. Emergency Priority Hero */}
        <EmergencyHero
          settings={settings}
          onRequestModalOpen={() => handleOpenModal()}
        />

        {/* 02. Trust & Proof Points */}
        <TrustStrip />

        {/* 03. Flagship Battery Service (Diagnostic-First) */}
        <PrimaryBatteryService
          onRequestModalOpen={() => handleOpenModal('Car Battery Replacement')}
        />

        {/* 04. 3-Step Simple Process */}
        <HowItWorksSimple />

        {/* 05. Battery Types & Genuine Brands */}
        <BatteryComparison />

        {/* 06. Secondary Roadside & Automotive Services */}
        <SecondaryServices services={services} />

        {/* 07. Strategic Dubai Coverage Corridors */}
        <DubaiCoverage locations={locations} />

        {/* 08. Verified Experiences & Client Feedback */}
        {isTestimonialsVisible && (
          <EditorialTestimonials
            testimonials={testimonials}
            title={testimonialsSectionConfig?.title}
            subtitle={testimonialsSectionConfig?.subtitle}
          />
        )}

        {/* 09. Frequently Asked Questions */}
        {isFaqsVisible && (
          <MinimalFAQ
            faqs={faqs}
            settings={settings}
            title={faqsSectionConfig?.title}
            subtitle={faqsSectionConfig?.subtitle}
          />
        )}

        {/* 10. Minimal Final Conversion Point */}
        <MinimalFinalCTA
          settings={settings}
          onRequestModalOpen={() => handleOpenModal()}
        />
      </main>

      <Footer settings={settings} />

      <StickyMobileBar
        settings={settings}
        onRequestModalOpen={() => handleOpenModal()}
      />

      <EmergencyRequestModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        settings={settings}
        locations={locations}
        vehicles={vehicles}
        defaultService={selectedService}
      />
    </>
  );
}
