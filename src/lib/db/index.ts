import fs from 'fs';
import path from 'path';
import {
  SiteSettings,
  PageSectionConfig,
  ServiceItem,
  BatteryBrand,
  BatteryProduct,
  VehicleBrand,
  ServiceLocation,
  Testimonial,
  FAQItem,
  ServiceRequest,
  LeadConversionEvent,
  DashboardMetrics,
  RequestStatus
} from '@/types';
import {
  initialSettings,
  initialSections,
  initialServices,
  initialBatteryBrands,
  initialBatteryProducts,
  initialVehicleBrands,
  initialServiceLocations,
  initialTestimonials,
  initialFAQs,
  initialRequests,
  initialEvents
} from './seed';

interface DatabaseData {
  settings: SiteSettings;
  sections: PageSectionConfig[];
  services: ServiceItem[];
  batteryBrands: BatteryBrand[];
  batteryProducts: BatteryProduct[];
  vehicleBrands: VehicleBrand[];
  serviceLocations: ServiceLocation[];
  testimonials: Testimonial[];
  faqs: FAQItem[];
  requests: ServiceRequest[];
  events: LeadConversionEvent[];
}

const DB_DIR = path.join(process.cwd(), 'src', 'lib', 'db', 'data');
const DB_PATH = path.join(DB_DIR, 'store.json');

// In-memory cache to guarantee blazing speed and seamless fallback
let memoryDb: DatabaseData | null = null;

function ensureDb(): DatabaseData {
  if (memoryDb) {
    return memoryDb;
  }

  try {
    if (fs.existsSync(DB_PATH)) {
      const content = fs.readFileSync(DB_PATH, 'utf-8');
      memoryDb = JSON.parse(content);
      return memoryDb!;
    }
  } catch (err) {
    console.error('Error reading DB from file, falling back to seed:', err);
  }

  // Initialize with seed data
  memoryDb = {
    settings: initialSettings,
    sections: initialSections,
    services: initialServices,
    batteryBrands: initialBatteryBrands,
    batteryProducts: initialBatteryProducts,
    vehicleBrands: initialVehicleBrands,
    serviceLocations: initialServiceLocations,
    testimonials: initialTestimonials,
    faqs: initialFAQs,
    requests: initialRequests,
    events: initialEvents
  };

  saveDb(memoryDb);
  return memoryDb;
}

function saveDb(data: DatabaseData) {
  memoryDb = data;
  try {
    if (!fs.existsSync(DB_DIR)) {
      fs.mkdirSync(DB_DIR, { recursive: true });
    }
    fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error persisting DB to disk:', err);
  }
}

// ---------------- Site Settings ----------------
export async function getSettings(): Promise<SiteSettings> {
  const db = ensureDb();
  return db.settings;
}

export async function updateSettings(partial: Partial<SiteSettings>): Promise<SiteSettings> {
  const db = ensureDb();
  db.settings = {
    ...db.settings,
    ...partial,
    updatedAt: new Date().toISOString()
  };
  saveDb(db);
  return db.settings;
}

// ---------------- Page Sections ----------------
export async function getSections(pageSlug = 'home'): Promise<PageSectionConfig[]> {
  const db = ensureDb();
  return db.sections
    .filter((s) => s.pageSlug === pageSlug && s.isActive)
    .sort((a, b) => a.displayOrder - b.displayOrder);
}

export async function getAllSections(): Promise<PageSectionConfig[]> {
  const db = ensureDb();
  return db.sections.sort((a, b) => a.displayOrder - b.displayOrder);
}

export async function updateSection(id: string, partial: Partial<PageSectionConfig>): Promise<PageSectionConfig | null> {
  const db = ensureDb();
  const idx = db.sections.findIndex((s) => s.id === id);
  if (idx === -1) return null;
  db.sections[idx] = { ...db.sections[idx], ...partial };
  saveDb(db);
  return db.sections[idx];
}

// ---------------- Services ----------------
export async function getServices(activeOnly = true): Promise<ServiceItem[]> {
  const db = ensureDb();
  return db.services
    .filter((s) => (!activeOnly || s.isActive))
    .sort((a, b) => a.displayOrder - b.displayOrder);
}

export async function getServiceBySlug(slug: string): Promise<ServiceItem | null> {
  const db = ensureDb();
  return db.services.find((s) => s.slug === slug && s.isActive) || null;
}

export async function saveService(serviceData: Partial<ServiceItem> & { name: string }): Promise<ServiceItem> {
  const db = ensureDb();
  const id = serviceData.id || `srv-${Date.now()}`;
  const slug = serviceData.slug || serviceData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');

  const existingIdx = db.services.findIndex((s) => s.id === id);
  const newService: ServiceItem = {
    id,
    slug,
    name: serviceData.name,
    tagline: serviceData.tagline || '',
    shortDescription: serviceData.shortDescription || '',
    fullDescription: serviceData.fullDescription || '',
    iconName: serviceData.iconName || 'Wrench',
    features: serviceData.features || [],
    diagnosticSteps: serviceData.diagnosticSteps || [],
    isEmergency: serviceData.isEmergency ?? false,
    isFeatured: serviceData.isFeatured ?? true,
    isActive: serviceData.isActive ?? true,
    displayOrder: serviceData.displayOrder ?? db.services.length + 1,
    estimatedTime: serviceData.estimatedTime || '25–40 min',
    warrantyInfo: serviceData.warrantyInfo,
    metaTitle: serviceData.metaTitle,
    metaDescription: serviceData.metaDescription
  };

  if (existingIdx >= 0) {
    db.services[existingIdx] = newService;
  } else {
    db.services.push(newService);
  }

  saveDb(db);
  return newService;
}

export async function deleteService(id: string): Promise<boolean> {
  const db = ensureDb();
  const initialLength = db.services.length;
  db.services = db.services.filter((s) => s.id !== id);
  if (db.services.length !== initialLength) {
    saveDb(db);
    return true;
  }
  return false;
}

// ---------------- Batteries ----------------
export async function getBatteryBrands(activeOnly = true): Promise<BatteryBrand[]> {
  const db = ensureDb();
  return db.batteryBrands
    .filter((b) => (!activeOnly || b.isActive))
    .sort((a, b) => a.displayOrder - b.displayOrder);
}

export async function saveBatteryBrand(brandData: Partial<BatteryBrand> & { name: string }): Promise<BatteryBrand> {
  const db = ensureDb();
  const id = brandData.id || `brand-${Date.now()}`;
  const slug = brandData.slug || brandData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  const existingIdx = db.batteryBrands.findIndex((b) => b.id === id);

  const brand: BatteryBrand = {
    id,
    slug,
    name: brandData.name,
    countryOfOrigin: brandData.countryOfOrigin || 'International',
    warrantyStandard: brandData.warrantyStandard || '12 Months',
    description: brandData.description || '',
    isFeatured: brandData.isFeatured ?? true,
    isActive: brandData.isActive ?? true,
    displayOrder: brandData.displayOrder ?? db.batteryBrands.length + 1
  };

  if (existingIdx >= 0) {
    db.batteryBrands[existingIdx] = brand;
  } else {
    db.batteryBrands.push(brand);
  }

  saveDb(db);
  return brand;
}

export async function deleteBatteryBrand(id: string): Promise<boolean> {
  const db = ensureDb();
  db.batteryBrands = db.batteryBrands.filter((b) => b.id !== id);
  saveDb(db);
  return true;
}

export async function getBatteryProducts(activeOnly = true): Promise<BatteryProduct[]> {
  const db = ensureDb();
  return db.batteryProducts
    .filter((p) => (!activeOnly || p.isInStock))
    .sort((a, b) => a.displayOrder - b.displayOrder);
}

export async function getBatteryBySlug(slug: string): Promise<BatteryProduct | null> {
  const db = ensureDb();
  return db.batteryProducts.find((p) => p.slug === slug) || null;
}

export async function saveBatteryProduct(data: Partial<BatteryProduct> & { brandName: string; modelNumber: string }): Promise<BatteryProduct> {
  const db = ensureDb();
  const id = data.id || `bat-${Date.now()}`;
  const slug = data.slug || `${data.brandName}-${data.modelNumber}`.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  const existingIdx = db.batteryProducts.findIndex((p) => p.id === id);

  const product: BatteryProduct = {
    id,
    slug,
    brandId: data.brandId || 'brand-varta',
    brandName: data.brandName,
    modelNumber: data.modelNumber,
    batteryType: data.batteryType || 'SMF (Sealed)',
    capacityAh: data.capacityAh || 70,
    coldCrankingAmps: data.coldCrankingAmps || 600,
    voltage: data.voltage || 12,
    dimensionsMm: data.dimensionsMm || 'Standard',
    warrantyMonths: data.warrantyMonths || 12,
    priceAed: data.priceAed,
    showPrice: data.showPrice ?? true,
    isInStock: data.isInStock ?? true,
    recommendedFor: data.recommendedFor || [],
    features: data.features || [],
    displayOrder: data.displayOrder ?? db.batteryProducts.length + 1
  };

  if (existingIdx >= 0) {
    db.batteryProducts[existingIdx] = product;
  } else {
    db.batteryProducts.push(product);
  }

  saveDb(db);
  return product;
}

export async function deleteBatteryProduct(id: string): Promise<boolean> {
  const db = ensureDb();
  db.batteryProducts = db.batteryProducts.filter((p) => p.id !== id);
  saveDb(db);
  return true;
}

// ---------------- Vehicles ----------------
export async function getVehicleBrands(activeOnly = true): Promise<VehicleBrand[]> {
  const db = ensureDb();
  return db.vehicleBrands
    .filter((v) => (!activeOnly || v.isActive))
    .sort((a, b) => a.displayOrder - b.displayOrder);
}

export async function saveVehicleBrand(data: Partial<VehicleBrand> & { name: string }): Promise<VehicleBrand> {
  const db = ensureDb();
  const id = data.id || `veh-${Date.now()}`;
  const slug = data.slug || data.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  const existingIdx = db.vehicleBrands.findIndex((v) => v.id === id);

  const item: VehicleBrand = {
    id,
    slug,
    name: data.name,
    originRegion: data.originRegion || 'Japanese',
    commonBatteryType: data.commonBatteryType || 'SMF or AGM',
    notes: data.notes || '',
    isPopular: data.isPopular ?? true,
    isActive: data.isActive ?? true,
    displayOrder: data.displayOrder ?? db.vehicleBrands.length + 1,
    models: data.models || []
  };

  if (existingIdx >= 0) {
    db.vehicleBrands[existingIdx] = item;
  } else {
    db.vehicleBrands.push(item);
  }

  saveDb(db);
  return item;
}

export async function deleteVehicleBrand(id: string): Promise<boolean> {
  const db = ensureDb();
  db.vehicleBrands = db.vehicleBrands.filter((v) => v.id !== id);
  saveDb(db);
  return true;
}

// ---------------- Locations ----------------
export async function getServiceLocations(activeOnly = true): Promise<ServiceLocation[]> {
  const db = ensureDb();
  return db.serviceLocations
    .filter((l) => (!activeOnly || l.isActive))
    .sort((a, b) => a.displayOrder - b.displayOrder);
}

export async function saveServiceLocation(data: Partial<ServiceLocation> & { name: string }): Promise<ServiceLocation> {
  const db = ensureDb();
  const id = data.id || `loc-${Date.now()}`;
  const slug = data.slug || data.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  const existingIdx = db.serviceLocations.findIndex((l) => l.id === id);

  const item: ServiceLocation = {
    id,
    slug,
    name: data.name,
    districtName: data.districtName || data.name,
    zoneType: data.zoneType || 'Central',
    estimatedEta: data.estimatedEta || '20–35 min',
    isActive: data.isActive ?? true,
    isPriority: data.isPriority ?? false,
    dispatchNote: data.dispatchNote || 'Mobile unit on patrol.',
    displayOrder: data.displayOrder ?? db.serviceLocations.length + 1
  };

  if (existingIdx >= 0) {
    db.serviceLocations[existingIdx] = item;
  } else {
    db.serviceLocations.push(item);
  }

  saveDb(db);
  return item;
}

export async function deleteServiceLocation(id: string): Promise<boolean> {
  const db = ensureDb();
  db.serviceLocations = db.serviceLocations.filter((l) => l.id !== id);
  saveDb(db);
  return true;
}

// ---------------- Testimonials ----------------
export async function getTestimonials(activeOnly = true): Promise<Testimonial[]> {
  const db = ensureDb();
  return db.testimonials.filter((t) => (!activeOnly || t.isActive));
}

export async function saveTestimonial(data: Partial<Testimonial> & { customerName: string; reviewText: string }): Promise<Testimonial> {
  const db = ensureDb();
  const id = data.id || `test-${Date.now()}`;
  const existingIdx = db.testimonials.findIndex((t) => t.id === id);

  const item: Testimonial = {
    id,
    customerName: data.customerName,
    district: data.district || 'Dubai',
    vehicle: data.vehicle || 'Vehicle Owner',
    rating: data.rating || 5,
    serviceUsed: data.serviceUsed || 'Mobile Battery Replacement',
    reviewText: data.reviewText,
    date: data.date || new Date().toISOString().split('T')[0],
    isVerified: data.isVerified ?? true,
    isFeatured: data.isFeatured ?? true,
    isActive: data.isActive ?? true
  };

  if (existingIdx >= 0) {
    db.testimonials[existingIdx] = item;
  } else {
    db.testimonials.push(item);
  }

  saveDb(db);
  return item;
}

export async function deleteTestimonial(id: string): Promise<boolean> {
  const db = ensureDb();
  db.testimonials = db.testimonials.filter((t) => t.id !== id);
  saveDb(db);
  return true;
}

// ---------------- FAQs ----------------
export async function getFAQs(activeOnly = true): Promise<FAQItem[]> {
  const db = ensureDb();
  return db.faqs
    .filter((f) => (!activeOnly || f.isActive))
    .sort((a, b) => a.displayOrder - b.displayOrder);
}

export async function saveFAQ(data: Partial<FAQItem> & { question: string; answer: string }): Promise<FAQItem> {
  const db = ensureDb();
  const id = data.id || `faq-${Date.now()}`;
  const existingIdx = db.faqs.findIndex((f) => f.id === id);

  const item: FAQItem = {
    id,
    category: data.category || 'Emergency & Response',
    question: data.question,
    answer: data.answer,
    isActive: data.isActive ?? true,
    displayOrder: data.displayOrder ?? db.faqs.length + 1
  };

  if (existingIdx >= 0) {
    db.faqs[existingIdx] = item;
  } else {
    db.faqs.push(item);
  }

  saveDb(db);
  return item;
}

export async function deleteFAQ(id: string): Promise<boolean> {
  const db = ensureDb();
  db.faqs = db.faqs.filter((f) => f.id !== id);
  saveDb(db);
  return true;
}

// ---------------- Service Requests ----------------
export async function getRequests(): Promise<ServiceRequest[]> {
  const db = ensureDb();
  return [...db.requests].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export async function getRequestById(id: string): Promise<ServiceRequest | null> {
  const db = ensureDb();
  return db.requests.find((r) => r.id === id) || null;
}

export async function createServiceRequest(input: {
  customerName: string;
  customerPhone: string;
  customerWhatsapp?: string;
  vehicleBrand: string;
  vehicleModel: string;
  vehicleYear?: string;
  serviceRequired: string;
  locationArea: string;
  specificLocation?: string;
  issueDescription: string;
  urgency?: 'EMERGENCY_NOW' | 'TODAY' | 'SCHEDULED';
  source?: 'WEBSITE_EMERGENCY' | 'SMART_FINDER' | 'CONTACT_FORM';
}): Promise<ServiceRequest> {
  const db = ensureDb();
  const now = new Date();
  const count = db.requests.length + 1;
  const refNo = `DXB-${now.getFullYear().toString().slice(-2)}${(now.getMonth() + 1).toString().padStart(2, '0')}-${count.toString().padStart(2, '0')}`;

  const newReq: ServiceRequest = {
    id: `req-${Date.now()}`,
    referenceNo: refNo,
    customerName: input.customerName,
    customerPhone: input.customerPhone,
    customerWhatsapp: input.customerWhatsapp || input.customerPhone,
    vehicleBrand: input.vehicleBrand,
    vehicleModel: input.vehicleModel,
    vehicleYear: input.vehicleYear || '',
    serviceRequired: input.serviceRequired,
    locationArea: input.locationArea,
    specificLocation: input.specificLocation || '',
    issueDescription: input.issueDescription,
    urgency: input.urgency || 'EMERGENCY_NOW',
    status: 'NEW',
    source: input.source || 'WEBSITE_EMERGENCY',
    createdAt: now.toISOString(),
    updatedAt: now.toISOString()
  };

  db.requests.unshift(newReq);
  saveDb(db);
  return newReq;
}

export async function updateRequestStatus(id: string, status: RequestStatus, technicianNotes?: string): Promise<ServiceRequest | null> {
  const db = ensureDb();
  const req = db.requests.find((r) => r.id === id);
  if (!req) return null;

  req.status = status;
  if (technicianNotes !== undefined) {
    req.technicianNotes = technicianNotes;
  }
  req.updatedAt = new Date().toISOString();

  saveDb(db);
  return req;
}

// ---------------- Analytics & Conversion Events ----------------
export async function logConversionEvent(event: Omit<LeadConversionEvent, 'id' | 'timestamp'>): Promise<LeadConversionEvent> {
  const db = ensureDb();
  const newEvt: LeadConversionEvent = {
    id: `evt-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
    ...event,
    timestamp: new Date().toISOString()
  };
  db.events.unshift(newEvt);
  if (db.events.length > 500) {
    db.events = db.events.slice(0, 500); // keep reasonable window
  }
  saveDb(db);
  return newEvt;
}

export async function getEvents(): Promise<LeadConversionEvent[]> {
  const db = ensureDb();
  return db.events;
}

// ---------------- Dashboard Metrics ----------------
export async function getDashboardMetrics(): Promise<DashboardMetrics> {
  const db = ensureDb();
  const whatsappClicks = db.events.filter((e) => e.eventType === 'WHATSAPP_CLICK').length;
  const phoneClicks = db.events.filter((e) => e.eventType === 'PHONE_CALL').length;

  return {
    totalRequests: db.requests.length,
    newRequests: db.requests.filter((r) => r.status === 'NEW').length,
    dispatchedRequests: db.requests.filter((r) => r.status === 'DISPATCHED' || r.status === 'CONFIRMED').length,
    completedRequests: db.requests.filter((r) => r.status === 'COMPLETED').length,
    whatsappClicksCount: whatsappClicks,
    phoneClicksCount: phoneClicks,
    activeServicesCount: db.services.filter((s) => s.isActive).length,
    activeBatteryBrandsCount: db.batteryBrands.filter((b) => b.isActive).length,
    activeDistrictsCount: db.serviceLocations.filter((l) => l.isActive).length
  };
}
