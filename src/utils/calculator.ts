export interface CalculationParams {
  productId: string;
  basePrice: number;
  unitType: string;
  width: number; // in meters or cm
  height: number;
  unit: 'm' | 'cm';
  quantity: number;
  selectedFinishes: string[];
  needsGraphicDesign: boolean;
  urgency: 'normal' | 'express';
}

export interface CalculationResult {
  areaM2: number;
  perimeterM: number;
  grommetCount: number;
  unitBasePrice: number;
  finishesCostPerUnit: number;
  designCost: number;
  unitPrice: number;
  subtotal: number;
  discountRate: number;
  discountAmount: number;
  urgencySurcharge: number;
  total: number;
}

export function calculatePrintQuote(params: CalculationParams): CalculationResult {
  const widthM = params.unit === 'cm' ? params.width / 100 : params.width;
  const heightM = params.unit === 'cm' ? params.height / 100 : params.height;
  
  const areaM2 = Math.max(0.1, Number((widthM * heightM).toFixed(2)));
  const perimeterM = Number(((widthM + heightM) * 2).toFixed(2));
  
  // Grommet count (every ~50cm along perimeter)
  const grommetCount = Math.max(4, Math.round(perimeterM / 0.5));
  
  let unitBasePrice = params.basePrice;
  
  // If product is sold per m², multiply by area
  if (params.unitType === 'm²') {
    unitBasePrice = params.basePrice * areaM2;
  }
  
  // Calculate selected finishes
  let finishesCostPerUnit = 0;
  
  if (params.selectedFinishes.includes('ojalillos')) {
    finishesCostPerUnit += grommetCount * 0.4;
  }
  if (params.selectedFinishes.includes('bastilla')) {
    finishesCostPerUnit += perimeterM * 0.8;
  }
  if (params.selectedFinishes.includes('laminado')) {
    finishesCostPerUnit += areaM2 * 8.0;
  }
  if (params.selectedFinishes.includes('reserva-uv')) {
    finishesCostPerUnit += 15.0; // flat fee for UV plates/varnish
  }
  if (params.selectedFinishes.includes('puntas-boleadas')) {
    finishesCostPerUnit += 5.0;
  }
  if (params.selectedFinishes.includes('tubo-bolsillo')) {
    finishesCostPerUnit += widthM * 4.0;
  }
  
  const designCost = params.needsGraphicDesign ? 20.0 : 0.0;
  const unitPrice = unitBasePrice + finishesCostPerUnit;
  const rawSubtotal = unitPrice * params.quantity;
  
  // Volume Discount Tiers
  let discountRate = 0;
  if (params.quantity >= 50) {
    discountRate = 0.22; // 22% al por mayor
  } else if (params.quantity >= 25) {
    discountRate = 0.16; // 16%
  } else if (params.quantity >= 10) {
    discountRate = 0.10; // 10%
  } else if (params.quantity >= 5) {
    discountRate = 0.05; // 5%
  }
  
  const discountAmount = Number((rawSubtotal * discountRate).toFixed(2));
  const subtotalAfterDiscount = rawSubtotal - discountAmount;
  
  // Urgency Surcharge
  const urgencySurcharge = params.urgency === 'express' 
    ? Number((subtotalAfterDiscount * 0.20).toFixed(2)) 
    : 0;
    
  const total = Number((subtotalAfterDiscount + urgencySurcharge + designCost).toFixed(2));
  
  return {
    areaM2,
    perimeterM,
    grommetCount,
    unitBasePrice: Number(unitBasePrice.toFixed(2)),
    finishesCostPerUnit: Number(finishesCostPerUnit.toFixed(2)),
    designCost,
    unitPrice: Number(unitPrice.toFixed(2)),
    subtotal: Number(rawSubtotal.toFixed(2)),
    discountRate,
    discountAmount,
    urgencySurcharge,
    total: Math.max(10, total), // minimum order S/ 10
  };
}

export function formatPEN(amount: number): string {
  return `S/ ${amount.toLocaleString('es-PE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}
