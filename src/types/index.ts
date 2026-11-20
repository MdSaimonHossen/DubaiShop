export interface SiteSettings {
  id: string;
  companyName: string;
  tagline: string;
  phonePrimary: string;
  phoneEmergency: string;
  whatsappNumber: string;
  emailPrimary: string;
  addressText: string;
  googleMapsUrl: string;
  workingHours: string;
  serviceStatusText: string;
  emergencyActive: boolean;
  warrantyStandard: string;
  serviceRadiusDescription: string;
  metaTitle: string;
  metaDescription: string;
  updatedAt: string;
}

export interface PageSectionConfig {
  id: string;
  pageSlug: string;
  sectionKey: string;
  title: string;
  subtitle: string;
  badgeText?: string;
  primaryButtonText?: string;
  primaryButtonUrl?: string;
  secondaryButtonText?: string;
  secondaryButtonUrl?: string;
  contentData?: Record<string, any>;
  isActive: boolean;
  displayOrder: number;
}

export interface ServiceItem {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  shortDescription: string;
  fullDescription: string;
  iconName: string;
  features: string[];
  diagnosticSteps?: string[];
  isEmergency: boolean;
  isFeatured: boolean;
  isActive: boolean;
  displayOrder: number;
  estimatedTime: string;
  warrantyInfo?: string;
  metaTitle?: string;
  metaDescription?: string;
}

export type BatteryTypeCategory = 'AGM' | 'EFB' | 'SMF (Sealed)' | 'Heavy Duty Commercial';

export interface BatteryBrand {
  id: string;
  slug: string;
  name: string;
  countryOfOrigin: string;
  warrantyStandard: string;
  description: string;
  isFeatured: boolean;
  isActive: boolean;
  displayOrder: number;
}

export interface BatteryProduct {
  id: string;
  slug: string;
  brandId: string;
  brandName: string;
  modelNumber: string;
  batteryType: BatteryTypeCategory;
  capacityAh: number;
  coldCrankingAmps: number;
  voltage: number;
  dimensionsMm: string;
  warrantyMonths: number;
  priceAed?: number;
  showPrice: boolean;
  isInStock: boolean;
  recommendedFor: string[];
  features: string[];
  displayOrder: number;
}

export interface VehicleBrand {
  id: string;
  slug: string;
  name: string;
  originRegion: 'Japanese' | 'European' | 'American' | 'Korean' | 'Luxury/Exotic' | 'Other';
  commonBatteryType: string;
  notes: string;
  isPopular: boolean;
  isActive: boolean;
  displayOrder: number;
  models: VehicleModel[];
}

export interface VehicleModel {
  name: string;
  yearRange: string;
  batteryType: BatteryTypeCategory;
  recommendedAh: number;
  startStop: boolean;
}

export interface ServiceLocation {
  id: string;
  slug: string;
  name: string;
  districtName: string;
  zoneType: 'Central' | 'Coastal' | 'South Dubai' | 'North Dubai';
  estimatedEta: string;
  isActive: boolean;
  isPriority: boolean;
  dispatchNote: string;
  displayOrder: number;
}

export interface Testimonial {
  id: string;
  customerName: string;
  district: string;
  vehicle: string;
  rating: number;
  serviceUsed: string;
  reviewText: string;
  date: string;
  isVerified: boolean;
  isFeatured: boolean;
  isActive: boolean;
}

export interface FAQItem {
  id: string;
  category: 'Emergency & Response' | 'Battery & Tech' | 'Pricing & Warranty' | 'Areas & Booking';
  question: string;
  answer: string;
  isActive: boolean;
  displayOrder: number;
}

export type RequestStatus = 'NEW' | 'CONTACTED' | 'CONFIRMED' | 'DISPATCHED' | 'COMPLETED' | 'CANCELLED';

export interface ServiceRequest {
  id: string;
  referenceNo: string;
  customerName: string;
  customerPhone: string;
  customerWhatsapp: string;
  vehicleBrand: string;
  vehicleModel: string;
  vehicleYear?: string;
  serviceRequired: string;
  locationArea: string;
  specificLocation?: string;
  issueDescription: string;
  urgency: 'EMERGENCY_NOW' | 'TODAY' | 'SCHEDULED';
  status: RequestStatus;
  technicianNotes?: string;
  source: 'WEBSITE_EMERGENCY' | 'SMART_FINDER' | 'CONTACT_FORM' | 'PHONE_CLICK' | 'WHATSAPP_CLICK';
  createdAt: string;
  updatedAt: string;
}

export interface LeadConversionEvent {
  id: string;
  eventType: 'WHATSAPP_CLICK' | 'PHONE_CALL' | 'EMERGENCY_FORM_SUBMIT' | 'FINDER_COMPLETED';
  pageUrl: string;
  vehicleBrand?: string;
  locationDistrict?: string;
  timestamp: string;
  metadata?: Record<string, any>;
}

export interface DashboardMetrics {
  totalRequests: number;
  newRequests: number;
  dispatchedRequests: number;
  completedRequests: number;
  whatsappClicksCount: number;
  phoneClicksCount: number;
  activeServicesCount: number;
  activeBatteryBrandsCount: number;
  activeDistrictsCount: number;
}
