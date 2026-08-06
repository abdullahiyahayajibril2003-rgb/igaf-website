import { GalleryItem } from '../types';

import riceMillImg from '../assets/images/rice-mill.jpg';
import grindingMachineImg from '../assets/images/grinding-machine.jpg';
import chaffCutterImg from '../assets/images/chaff-cutter.jpg';
import hammerMillImg from '../assets/images/hammer-mill.jpg';
import garriProcessingImg from '../assets/images/garri-processing.jpg';
import waterPumpImg from '../assets/images/water-pump.jpg';
import powerTillerImg from '../assets/images/power-tiller.jpg';
import grainDestonerImg from '../assets/images/grain-destoner.jpg';
import maizeShellerImg from '../assets/images/maize-sheller.jpg';
import sparePartsImg from '../assets/images/spare-parts.jpg';

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'gal-01',
    title: 'Showroom Showcase: IGAF Commercial Rice Mill Unit',
    category: 'Showroom',
    imageUrl: riceMillImg,
    description: 'Showroom Display: Heavy-duty commercial rice processing unit with integrated huller, de-stoner, and polisher on live display at our Masalacin Idi showroom.',
    location: 'Masalacin Idi Showroom, Keffi, Nasarawa State'
  },
  {
    id: 'gal-02',
    title: 'On Farm Operation: Heavy-Duty Multi-Grain Grinding Machine',
    category: 'On Farm',
    imageUrl: grindingMachineImg,
    description: 'On-Farm Live Milling: Commercial wet & dry grain grinder processing maize, guinea corn, beans, and cassava on active farm site.',
    location: 'Keffi Farm Milling Site, Nasarawa State'
  },
  {
    id: 'gal-03',
    title: 'On Farm Operation: Motorized Chaff Cutter & Fodder Chopper',
    category: 'On Farm',
    imageUrl: chaffCutterImg,
    description: 'On-Farm Forage Chopping: Motorized chaff cutter chopping green pasture, elephant grass, and corn stalks for livestock fattening on farm.',
    location: 'Keffi Livestock Farm'
  },
  {
    id: 'gal-04',
    title: 'Showroom Showcase: Industrial Feed Hammer Mill',
    category: 'Showroom',
    imageUrl: hammerMillImg,
    description: 'Showroom Display: High-impact alloy swing-hammer pulverizer with air cyclone collector displayed at our Keffi store.',
    location: 'IGAF Keffi Store Showroom'
  },
  {
    id: 'gal-05',
    title: 'Delivery Dispatch: Complete Garri Processing Plant',
    category: 'Deliveries',
    imageUrl: garriProcessingImg,
    description: 'Customer Delivery Waybill: Integrated cassava peeling, grating, pressing, and frying machinery set packaged for truck loading to client.',
    location: 'Keffi Loading Bay & Dispatch Depot'
  },
  {
    id: 'gal-06',
    title: 'Delivery Dispatch: Diesel Irrigation Water Pump Sets',
    category: 'Deliveries',
    imageUrl: waterPumpImg,
    description: 'Customer Delivery Waybill: High-volume 3-inch/4-inch diesel irrigation water pump units loaded for dry season farm delivery.',
    location: 'Karu / Nyanya Axis Delivery Transit'
  },
  {
    id: 'gal-07',
    title: 'On Farm Operation: Diesel Power Tiller & Rotary Paddy Tractor',
    category: 'On Farm',
    imageUrl: powerTillerImg,
    description: 'On-Farm Land Prep: 15HP walking tractor plowing rice paddies and creating seedbed ridges directly on farmland.',
    location: 'Akwanga Rice Fields, Nasarawa State'
  },
  {
    id: 'gal-08',
    title: 'Showroom Showcase: Gravity Grain De-stoner & Cleaner',
    category: 'Showroom',
    imageUrl: grainDestonerImg,
    description: 'Showroom Display: High-precision vibratory stone separator unit exhibited at our Masalacin Idi, Keffi showroom floor.',
    location: 'Masalacin Idi Showroom, Keffi'
  },
  {
    id: 'gal-09',
    title: 'On Farm Operation: High-Speed Maize Dehusker & Sheller',
    category: 'On Farm',
    imageUrl: maizeShellerImg,
    description: 'On-Farm Harvesting: Multi-crop corn thresher removing maize cobs and shelling kernels in real-time on farm site during harvest.',
    location: 'Lafia Maize Harvesting Farm'
  },
  {
    id: 'gal-10',
    title: 'Spare Parts Inventory: Original Engine Parts & Machine Wear Spares',
    category: 'Spare Parts',
    imageUrl: sparePartsImg,
    description: 'Spare Parts Stock: Original Changchai & Changfa diesel engine pistons, rubber rollers, manganese blades, and alloy grinding plates in store.',
    location: 'IGAF Central Spares Warehouse, Keffi'
  }
];
