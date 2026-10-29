/**
 * Formats a numeric price into Pakistani Rupee string (e.g., Rs. 28,500)
 */
export function formatPKR(amount: number): string {
  return `Rs. ${amount.toLocaleString('en-PK')}`;
}

/**
 * Store WhatsApp details
 */
export const STORE_WHATSAPP_NUMBER = '+923245772549';
export const STORE_PHONE_DISPLAY = '+92 324 5772549';
export const STORE_EMAIL = 'support@sportaccessories.pk';

/**
 * Builds direct WhatsApp URL with URL-encoded message
 */
export function buildWhatsAppUrl(message: string): string {
  const cleanNumber = STORE_WHATSAPP_NUMBER.replace(/[^0-9]/g, '');
  return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`;
}

/**
 * Generates pre-filled general inquiry link
 */
export function getGeneralWhatsAppLink(): string {
  return buildWhatsAppUrl('Hi, I have a question about your cricket accessories.');
}

/**
 * Generates order confirmation WhatsApp message
 */
export function generateOrderWhatsAppMessage(order: {
  orderId: string;
  customerName: string;
  phone: string;
  city: string;
  address: string;
  paymentMethod: string;
  items: Array<{ name: string; quantity: number; size: string; pricePKR: number }>;
  subtotal: number;
  deliveryNotes?: string;
}): string {
  const itemsList = order.items
    .map((item, idx) => `${idx + 1}. ${item.name} (${item.size}) x${item.quantity} = ${formatPKR(item.pricePKR * item.quantity)}`)
    .join('\n');

  return `🏏 *NEW ORDER: #${order.orderId}* - Sport Accessories Pakistan

*Customer Details:*
• Name: ${order.customerName}
• Phone: ${order.phone}
• City: ${order.city}
• Delivery Address: ${order.address}
${order.deliveryNotes ? `• Notes: ${order.deliveryNotes}\n` : ''}
*Order Items:*
${itemsList}

*Subtotal:* ${formatPKR(order.subtotal)}
*Payment Choice:* ${order.paymentMethod === 'cod' ? 'Cash on Delivery (COD)' : 'Direct Transfer / Online Inquiry'}
*Delivery Status:* Across Pakistan (charges to be confirmed by store)

Please confirm my order and courier tracking! Thank you.`;
}
