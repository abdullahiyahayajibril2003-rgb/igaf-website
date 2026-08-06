export type ProductCategory = 
  | 'Grinding Machines'
  | 'Chaff Cutters'
  | 'Rice Mills'
  | 'Hammer Mills'
  | 'Garri Processing'
  | 'Water Pumps'
  | 'Power Tillers'
  | 'De-stoners & Cleaners'
  | 'Maize Dehuskers'
  | 'Spare Parts';

export type PowerSource = 'Diesel Engine' | 'Petrol Engine' | 'Electric Motor' | 'Manual / PTO';

export interface ProductSpec {
  label: string;
  value: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  shortName?: string;
  category: ProductCategory;
  machineType: string;
  tagline: string;
  description: string;
  fullOverview: string;
  priceEstimate?: string;
  priceNumeric?: number;
  powerSource: PowerSource;
  capacity: string;
  enginePower: string;
  weight: string;
  warranty: string;
  isFeatured?: boolean;
  isNew?: boolean;
  mainImage: string;
  galleryImages: string[];
  specs: ProductSpec[];
  features: string[];
  uses: string[];
  includedAccessories: string[];
}

export interface CompanyInfo {
  companyName: string;
  phonePrimary: string;
  phoneSecondary: string;
  email: string;
  address: string;
  city: string;
  state: string;
  workingHours: string;
  announcement: string;
  showAnnouncement: boolean;
  priceEstimatesOverride?: Record<string, string>;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'Showroom' | 'On Farm' | 'Deliveries' | 'Spare Parts';
  imageUrl: string;
  description: string;
  location?: string;
}

export interface CustomerReview {
  id: string;
  name: string;
  role: string;
  location: string;
  machinePurchased: string;
  comment: string;
  rating: number;
  avatarUrl: string;
  date: string;
  machineImage?: string;
}

export interface QuoteFormData {
  fullName: string;
  companyName: string;
  phoneNumber: string;
  email: string;
  productSlug: string;
  quantity: number;
  state: string;
  deliveryOption: 'Pickup at Keffi Store' | 'Delivery to Location';
  message: string;
}

export type QuoteStatus = 'New' | 'Contacted' | 'Quoted' | 'Completed' | 'Cancelled';

export interface QuoteRequest {
  id: string;
  refCode: string;
  fullName: string;
  companyName: string;
  phoneNumber: string;
  email: string;
  productName: string;
  productSlug: string;
  quantity: number;
  state: string;
  deliveryOption: string;
  message: string;
  createdAt: string;
  status: QuoteStatus;
  adminNotes?: string;
  quotedAmount?: number;
}

export interface SystemUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'Admin' | 'Sales Manager' | 'Inventory Staff' | 'Customer / Client';
  state: string;
  status: 'Active' | 'Inactive';
  createdAt: string;
}

export type PageRoute = 
  | 'home'
  | 'about'
  | 'products'
  | 'product-detail'
  | 'gallery'
  | 'quote'
  | 'contact';
