import { CompanyInfo } from '../types';

export const DEFAULT_COMPANY_INFO: CompanyInfo = {
  companyName: 'IBRAHIMAWA GLOBAL AND FARM (IGAF) LIMITED',
  phonePrimary: '07047197737',
  phoneSecondary: '08100809016',
  email: 'igaf.keffi@gmail.com',
  address: 'Masalacin Idi',
  city: 'Keffi',
  state: 'Nasarawa State, Nigeria',
  workingHours: 'Monday – Sunday: 7:00 AM – 8:00 PM',
  announcement: '🎉 Welcome to IGAF Limited! Factory-direct pricing & genuine spare parts available at our Masalacin Idi, Keffi showroom.',
  showAnnouncement: true,
  priceEstimatesOverride: {}
};

const STORAGE_KEY = 'igaf_company_info_v1';

export function getCompanyInfo(): CompanyInfo {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return { ...DEFAULT_COMPANY_INFO, ...JSON.parse(stored) };
    }
  } catch (e) {
    console.error('Failed to parse company info from localStorage', e);
  }
  return DEFAULT_COMPANY_INFO;
}

export function saveCompanyInfo(info: CompanyInfo): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(info));
  } catch (e) {
    console.error('Failed to save company info to localStorage', e);
  }
}
