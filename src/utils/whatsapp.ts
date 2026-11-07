import { CalculationParams, CalculationResult, formatPEN } from './calculator';

const WHATSAPP_PHONE = '51984892143'; // Official Workshop Mazamari line

export function createProductWhatsAppUrl(productName: string, priceText: string): string {
  const message = `👋 ¡Hola Gráfica Arte Digital! Vengo desde su página web y deseo consultar sobre:
📄 *Producto:* ${productName}
💰 *Referencia:* ${priceText}
📍 *Mi Ciudad:* Mazamari / Satipo / Selva Central

¿Tienen disponibilidad para producción hoy mismo? ¡Muchas gracias!`;

  return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`;
}

export function createCustomQuoteWhatsAppUrl(
  productName: string,
  params: CalculationParams,
  result: CalculationResult,
  city: string,
  notes?: string
): string {
  const finishesText = params.selectedFinishes.length > 0 
    ? params.selectedFinishes.join(', ')
    : 'Corte estándar sin adicionales';

  const message = `🖨️ *COTIZACIÓN FORMAL - GRÁFICA ARTE DIGITAL*
----------------------------------------
📍 *Taller Central Mazamari - Selva Central*

🔹 *Producto:* ${productName}
📏 *Medidas:* ${params.width} x ${params.height} ${params.unit} (${result.areaM2} m² c/u)
🔢 *Cantidad:* ${params.quantity} unidad(es)
🛠️ *Acabados:* ${finishesText}
🎨 *Diseño:* ${params.needsGraphicDesign ? 'Requiero apoyo con diseño gráfico (+S/ 20)' : 'Ya tengo mi archivo listo en alta resolución'}
⚡ *Modalidad:* ${params.urgency === 'express' ? '🚀 URGENTE EXPRESS (Taller 4h)' : '⏱️ Regular (24 a 48h)'}
🚚 *Destino / Entrega:* ${city || 'Mazamari'}

----------------------------------------
💵 *Subtotal:* ${formatPEN(result.subtotal)}
${result.discountAmount > 0 ? `🎁 *Descuento Volumen (${Math.round(result.discountRate * 100)}%):* -${formatPEN(result.discountAmount)}\n` : ''}${result.urgencySurcharge > 0 ? `⚡ *Recargo Express:* +${formatPEN(result.urgencySurcharge)}\n` : ''}${result.designCost > 0 ? `🎨 *Diseño Gráfico:* +${formatPEN(result.designCost)}\n` : ''}💰 *TOTAL ESTIMADO:* ${formatPEN(result.total)}
----------------------------------------
${notes ? `📝 *Nota adicional:* ${notes}\n\n` : ''}¿Por favor me confirman número de cuenta o Yape/Plin para iniciar el pedido? ¡Gracias!`;

  return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`;
}

export function createOrderInquiryWhatsAppUrl(orderId: string, clientName: string): string {
  const message = `👋 ¡Hola Gráfica Arte Digital Mazamari! Deseo consultar el estado de mi orden de trabajo:
🔖 *Código de Pedido:* #${orderId}
👤 *Cliente:* ${clientName}

¿A qué hora puedo pasar a recogerlo al taller o cuándo sale la encomienda? ¡Muchas gracias!`;

  return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`;
}
