import { QuoteRequest, SystemUser } from '../types';

const QUOTES_STORAGE_KEY = 'igaf_machinery_quotes_v1';
const USERS_STORAGE_KEY = 'igaf_machinery_users_v1';

export const INITIAL_QUOTES: QuoteRequest[] = [
  {
    id: 'qt-101',
    refCode: 'IGAF-QT-2026-8812',
    fullName: 'Alhaji Haruna Danladi',
    companyName: 'Danladi Rice Mill Cooperative',
    phoneNumber: '08034567891',
    email: 'haruna.danladi@gmail.com',
    productName: 'IGAF Commercial Heavy-Duty Rice Mill Unit',
    productSlug: 'commercial-rice-mill-unit',
    quantity: 1,
    state: 'Nasarawa State',
    deliveryOption: 'Pickup at Keffi Store',
    message: 'We are setting up a commercial rice processing station in Lafia. Need quick delivery and technical setup.',
    createdAt: '2026-08-04T10:15:00Z',
    status: 'New',
    adminNotes: 'Client called on WhatsApp. Requested discount for 2 units if possible.',
    quotedAmount: 4800000,
  },
  {
    id: 'qt-102',
    refCode: 'IGAF-QT-2026-4409',
    fullName: 'Dr. Clementine Okafor',
    companyName: 'GreenPastures Feeds & Agro',
    phoneNumber: '08129876543',
    email: 'okafor.clem@greenpastures.ng',
    productName: 'Industrial Heavy-Duty Grain & Feed Hammer Mill',
    productSlug: 'industrial-feed-hammer-mill',
    quantity: 2,
    state: 'FCT Abuja',
    deliveryOption: 'Delivery to Location',
    message: 'Require 2 units of 24HP diesel hammer mills for our poultry feed factory in Gwagwalada.',
    createdAt: '2026-08-03T14:30:00Z',
    status: 'Contacted',
    adminNotes: 'Sent proforma invoice on Aug 4.',
    quotedAmount: 4800000,
  },
  {
    id: 'qt-103',
    refCode: 'IGAF-QT-2026-1902',
    fullName: 'Chief Usman Keffi',
    companyName: 'Keffi Integrated Farms Ltd',
    phoneNumber: '07031122334',
    email: 'usman@keffifarms.com',
    productName: 'Integrated Garri Processing Plant',
    productSlug: 'integrated-garri-processing-plant',
    quantity: 1,
    state: 'Nasarawa State',
    deliveryOption: 'Delivery to Location',
    message: 'Please send specs for the 30-ton hydraulic cassava de-watering press and stainless fryer.',
    createdAt: '2026-08-01T09:00:00Z',
    status: 'Quoted',
    adminNotes: 'Deposit received. Scheduled delivery for Friday.',
    quotedAmount: 3200000,
  },
  {
    id: 'qt-104',
    refCode: 'IGAF-QT-2026-7731',
    fullName: 'Engr. Festus Audu',
    companyName: 'Audu Agricultural Services',
    phoneNumber: '08055667788',
    email: 'festus.audu@yahoo.com',
    productName: 'Multi-Crop Fodder Chaff Cutter',
    productSlug: 'multi-crop-fodder-chaff-cutter',
    quantity: 3,
    state: 'Plateau State',
    deliveryOption: 'Delivery to Location',
    message: 'Need 3 chaff cutters for cattle fattening center in Jos.',
    createdAt: '2026-07-29T16:20:00Z',
    status: 'Completed',
    adminNotes: 'Delivered and tested successfully.',
    quotedAmount: 2550000,
  }
];

export const INITIAL_USERS: SystemUser[] = [
  {
    id: 'usr-001',
    name: 'Ibrahimawa Yahaya Jibril',
    email: 'ibrahimawa@igaf.com.ng',
    phone: '07047197737',
    role: 'Admin',
    state: 'Nasarawa State',
    status: 'Active',
    createdAt: '2025-01-10T08:00:00Z'
  },
  {
    id: 'usr-002',
    name: 'Alhaji Abubakar Musa',
    email: 'abubakar.sales@igaf.com.ng',
    phone: '08023456789',
    role: 'Sales Manager',
    state: 'Nasarawa State',
    status: 'Active',
    createdAt: '2025-03-15T09:30:00Z'
  },
  {
    id: 'usr-003',
    name: 'Alhaji Haruna Danladi',
    email: 'haruna.danladi@gmail.com',
    phone: '08034567891',
    role: 'Customer / Client',
    state: 'Nasarawa State',
    status: 'Active',
    createdAt: '2026-08-04T10:15:00Z'
  },
  {
    id: 'usr-004',
    name: 'Dr. Clementine Okafor',
    email: 'okafor.clem@greenpastures.ng',
    phone: '08129876543',
    role: 'Customer / Client',
    state: 'FCT Abuja',
    status: 'Active',
    createdAt: '2026-08-03T14:30:00Z'
  }
];

export function getStoredQuotes(): QuoteRequest[] {
  try {
    const raw = localStorage.getItem(QUOTES_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(QUOTES_STORAGE_KEY, JSON.stringify(INITIAL_QUOTES));
      return INITIAL_QUOTES;
    }
    return JSON.parse(raw);
  } catch (e) {
    console.error('Failed to load quotes from localStorage', e);
    return INITIAL_QUOTES;
  }
}

export function saveQuotes(quotes: QuoteRequest[]): void {
  try {
    localStorage.setItem(QUOTES_STORAGE_KEY, JSON.stringify(quotes));
  } catch (e) {
    console.error('Failed to save quotes to localStorage', e);
  }
}

export function addQuoteRequest(newQuote: Omit<QuoteRequest, 'id' | 'createdAt' | 'status'>): QuoteRequest {
  const currentQuotes = getStoredQuotes();
  const created: QuoteRequest = {
    ...newQuote,
    id: `qt-${Date.now()}`,
    createdAt: new Date().toISOString(),
    status: 'New',
  };
  const updated = [created, ...currentQuotes];
  saveQuotes(updated);
  return created;
}

export function getStoredUsers(): SystemUser[] {
  try {
    const raw = localStorage.getItem(USERS_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(INITIAL_USERS));
      return INITIAL_USERS;
    }
    return JSON.parse(raw);
  } catch (e) {
    console.error('Failed to load users from localStorage', e);
    return INITIAL_USERS;
  }
}

export function saveUsers(users: SystemUser[]): void {
  try {
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
  } catch (e) {
    console.error('Failed to save users to localStorage', e);
  }
}
