export type ProductCategory = 
  | 'todos'
  | 'gigantografias'
  | 'papeleria'
  | 'merchandising'
  | 'empaques'
  | 'senaletica';

export interface PrintProduct {
  id: string;
  name: string;
  category: ProductCategory;
  categoryLabel: string;
  image: string;
  fallbackGradient: string;
  minQuantity: string;
  turnaround: string;
  priceDescription: string;
  basePrice: number;
  unit: string;
  description: string;
  specs: {
    material: string;
    durability: string;
    resolution: string;
    standardSizes: string[];
    finishes: string[];
  };
  badge?: string;
  featured?: boolean;
}

export interface QuoteConfig {
  productId: string;
  productName: string;
  category: string;
  width: number;
  height: number;
  unit: 'm' | 'cm';
  quantity: number;
  selectedFinishes: string[];
  hasArtworkReady: boolean;
  needsGraphicDesign: boolean;
  urgency: 'normal' | 'express';
  deliveryLocation: string;
  customerName?: string;
  customerPhone?: string;
  notes?: string;
}

export interface OrderTrackingItem {
  id: string;
  clientName: string;
  projectName: string;
  date: string;
  status: 'verificacion' | 'impresion' | 'acabados' | 'listo' | 'entregado';
  statusLabel: string;
  stepNumber: number; // 1 to 5
  estimatedCompletion: string;
  destination: string;
  operatorNotes: string;
  specsSummary: string;
  total: number;
}
