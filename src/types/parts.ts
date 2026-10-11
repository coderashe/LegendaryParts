export type ProductCategory = 
  | 'service-kits' 
  | 'braking-systems' 
  | 'suspension' 
  | 'engine-timing' 
  | 'car-accessories';

export interface CategoryInfo {
  id: ProductCategory;
  label: string;
  iconName: string;
  description: string;
}

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  shortDescription: string;
  details?: string;
  oemEquivalent?: string;
  supportedBrands: string[];
  icon: string;
  badge?: string;
  origin?: 'UAE' | 'China' | 'UK' | 'OEM Spec';
}

export interface Branch {
  id: string;
  name: string;
  isHQ?: boolean;
  addresses: string[];
  phoneNumbers: string[];
  primaryWhatsApp: string;
  openingHours: string;
  servingAreas?: string[];
}

export interface ServiceArea {
  title: string;
  cities: string[];
  description: string;
  contactNumber: string;
  whatsappNumber: string;
}

export interface InquiryFormData {
  customerName: string;
  phoneNumber: string;
  vehicleMake: 'Toyota' | 'Nissan' | 'Honda' | 'Mazda' | 'VW' | 'Ford' | 'Other' | '';
  vehicleModel: string;
  year: string;
  engineCode: string;
  partNeeded: string;
  preferredBranch: string;
  urgency: 'Normal' | 'Urgent';
}

export interface InquiryFormErrors {
  customerName?: string;
  phoneNumber?: string;
  vehicleMake?: string;
  vehicleModel?: string;
  year?: string;
  partNeeded?: string;
  preferredBranch?: string;
}
