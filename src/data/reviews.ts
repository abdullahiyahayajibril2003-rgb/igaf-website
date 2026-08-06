import { CustomerReview } from '../types';

import riceMillImg from '../assets/images/rice-mill.jpg';
import powerTillerImg from '../assets/images/power-tiller.jpg';
import garriProcessingImg from '../assets/images/garri-processing.jpg';
import waterPumpImg from '../assets/images/water-pump.jpg';
import maizeShellerImg from '../assets/images/maize-sheller.jpg';
import grainDestonerImg from '../assets/images/grain-destoner.jpg';
import chaffCutterImg from '../assets/images/chaff-cutter.jpg';
import grindingMachineImg from '../assets/images/grinding-machine.jpg';

// Helper function to generate 100% offline-ready vector SVG avatars with crisp typography & gradients
export function makeOfflineAvatar(name: string, bgFrom: string, bgTo: string): string {
  const initials = name
    .split(' ')
    .filter(Boolean)
    .map((part) => part[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" width="120" height="120">
    <defs>
      <linearGradient id="bg-${initials}-${bgFrom.replace('#', '')}" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="${bgFrom}"/>
        <stop offset="100%" stop-color="${bgTo}"/>
      </linearGradient>
    </defs>
    <rect width="120" height="120" rx="60" fill="url(#bg-${initials}-${bgFrom.replace('#', '')})" />
    <circle cx="60" cy="46" r="22" fill="#FFFFFF" fill-opacity="0.22" />
    <path d="M 22,108 C 22,82 40,72 60,72 C 80,72 98,82 98,108 Z" fill="#FFFFFF" fill-opacity="0.22" />
    <text x="60" y="58" font-family="system-ui, -apple-system, sans-serif" font-weight="900" font-size="28" fill="#FFFFFF" text-anchor="middle" dominant-baseline="central" letter-spacing="1">${initials}</text>
  </svg>`;

  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

export const REVIEWS: CustomerReview[] = [
  {
    id: 'rev-01',
    name: 'Alhaji Umar Farouk',
    role: 'Managing Director, Farouk Rice Mills',
    location: 'Lafia, Nasarawa State',
    machinePurchased: 'IGAF Commercial Heavy-Duty Rice Mill Unit',
    comment: 'I bought two commercial rice mill machines from Ibrahimawa Global and Farm in Keffi. The head rice yield is phenomenal and broken grains are minimal. Most importantly, when I needed extra rubber rollers, I got original parts directly at their showroom without delay!',
    rating: 5,
    avatarUrl: makeOfflineAvatar('Alhaji Umar Farouk', '#065f46', '#047857'),
    machineImage: riceMillImg,
    date: 'July 2026'
  },
  {
    id: 'rev-02',
    name: 'Engr. Stephen Bako',
    role: 'Chairman, Keffi Farmers Cooperative Union',
    location: 'Keffi, Nasarawa State',
    machinePurchased: 'IGAF Diesel Power Tiller & Chaff Cutters',
    comment: 'IGAF Limited has revolutionized dry season farming for our cooperative. Their power tillers handle our hard soil easily, and their motorized chaff cutters cut silage preparation time by 80%. Excellent customer service and genuine machinery!',
    rating: 5,
    avatarUrl: makeOfflineAvatar('Stephen Bako', '#c2410c', '#ea580c'),
    machineImage: powerTillerImg,
    date: 'June 2026'
  },
  {
    id: 'rev-03',
    name: 'Hajia Amina Suleiman',
    role: 'CEO, Sunnah Cassava & Garri Processing Hub',
    location: 'Akwanga, Nasarawa State',
    machinePurchased: 'IGAF Complete Garri Processing Line',
    comment: 'The stainless cassava grater and 30-ton hydraulic press we acquired from IGAF in Masalacin Idi, Keffi are extremely durable. Our garri quality is now uniform and loved in Abuja markets. I recommend IGAF to every serious processor.',
    rating: 5,
    avatarUrl: makeOfflineAvatar('Amina Suleiman', '#0f766e', '#115e59'),
    machineImage: garriProcessingImg,
    date: 'May 2026'
  },
  {
    id: 'rev-04',
    name: 'Dr. Joseph Chukwu',
    role: 'Commercial Livestock & Mixed Farmer',
    location: 'Karu / Nyanya, FCT Suburb',
    machinePurchased: 'High-Flow Irrigation Water Pumps & Hammer Mill',
    comment: 'Getting reliable diesel water pumps for our 15-hectare dry season farm was crucial. IGAF provided high-lift 3-inch pumps and a 20HP hammer mill for feed crushing. Their prices are very competitive and machines perform top-notch.',
    rating: 5,
    avatarUrl: makeOfflineAvatar('Joseph Chukwu', '#1e293b', '#334155'),
    machineImage: waterPumpImg,
    date: 'April 2026'
  },
  {
    id: 'rev-05',
    name: 'Mallam Kabiru Danladi',
    role: 'Managing Partner, Danladi Grains Enterprise',
    location: 'Doma, Nasarawa State',
    machinePurchased: 'IGAF Industrial Maize Dehusker & Sheller',
    comment: 'Processing over 500 bags of harvested maize used to take us days with manual labor. With our new IGAF diesel-powered maize sheller, we clear 50 bags per hour cleanly. The technical team in Keffi offered free training upon delivery.',
    rating: 5,
    avatarUrl: makeOfflineAvatar('Kabiru Danladi', '#854d0e', '#a16207'),
    machineImage: maizeShellerImg,
    date: 'March 2026'
  },
  {
    id: 'rev-06',
    name: 'Mrs. Patience Oladipo',
    role: 'Director, Agribusiness Development',
    location: 'Makurdi, Benue State',
    machinePurchased: 'IGAF Multi-Crop Thresher & De-stoner',
    comment: 'The precision and grain cleanliness achieved by the IGAF destoning machine is unmatched. Rice buyers specifically demand grain from our mill now because it is 100% stone-free. Exceptional machinery backed by 1-year warranty!',
    rating: 5,
    avatarUrl: makeOfflineAvatar('Patience Oladipo', '#701a75', '#86198f'),
    machineImage: grainDestonerImg,
    date: 'February 2026'
  },
  {
    id: 'rev-07',
    name: 'Chief Audu Ogbeh',
    role: 'Executive Director, Keffi Valley Agro Hub',
    location: 'Keffi Rural District, Nasarawa State',
    machinePurchased: 'Heavy-Duty Commercial Grinding Machine',
    comment: 'Our commercial milling shop processes corn, millet, and cassava flour daily. The IGAF cast-steel grinding machine runs smoothly for 10 hours straight without overheating. Replacement manganese plates are always in stock in Keffi.',
    rating: 5,
    avatarUrl: makeOfflineAvatar('Audu Ogbeh', '#064e3b', '#065f46'),
    machineImage: grindingMachineImg,
    date: 'January 2026'
  },
  {
    id: 'rev-08',
    name: 'Alhaji Haruna Keffi',
    role: 'Chairman, Local Livestock & Forage Producers',
    location: 'Masalacin Idi Area, Keffi',
    machinePurchased: 'Motorized High-Capacity Chaff Cutter',
    comment: 'Preparing fodder for our dairy cattle used to be labor intensive. The motorized chaff cutter from IGAF handles wet and dry grass with ease. Waybill delivery was fast and the setup engineers were extremely helpful.',
    rating: 5,
    avatarUrl: makeOfflineAvatar('Haruna Keffi', '#9a3412', '#c2410c'),
    machineImage: chaffCutterImg,
    date: 'December 2025'
  }
];

