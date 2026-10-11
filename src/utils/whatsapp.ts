/**
 * Utility functions for formatting and generating WhatsApp API URLs
 */

/**
 * Strips all non-digit characters (+, spaces, dashes, parentheses)
 * so the phone number can be used in wa.me URLs.
 * e.g., "+263 77 259 1965" -> "263772591965"
 */
export function cleanPhoneNumber(phone: string): string {
  return phone.replace(/\D/g, '');
}

/**
 * Builds a standard wa.me WhatsApp URL with an encoded message query string.
 * @param phone Clean or unformatted phone number
 * @param message Pre-filled message string
 */
export function buildWhatsAppUrl(phone: string, message: string): string {
  const cleanPhone = cleanPhoneNumber(phone);
  const encodedMessage = encodeURIComponent(message.trim());
  return `https://wa.me/${cleanPhone}?text=${encodedMessage}`;
}

/**
 * Formats a part inquiry into a readable WhatsApp message layout
 */
export function formatInquiryMessage(data: {
  customerName: string;
  phoneNumber: string;
  vehicleMake: string;
  vehicleModel: string;
  year: string;
  engineCode?: string;
  partNeeded: string;
  preferredBranch: string;
  urgency: 'Normal' | 'Urgent';
}): string {
  const urgencyTag = data.urgency === 'Urgent' ? '🚨 [URGENT INQUIRY]' : '📋 [PART INQUIRY]';
  
  return [
    `*${urgencyTag} - Legendary Parts Centre*`,
    `----------------------------------------`,
    `👤 *Customer Name:* ${data.customerName}`,
    `📞 *Contact Number:* ${data.phoneNumber}`,
    `📍 *Preferred Branch:* ${data.preferredBranch}`,
    `⚡ *Urgency:* ${data.urgency}`,
    ``,
    `🚗 *VEHICLE SPECIFICATIONS:*`,
    `• *Make:* ${data.vehicleMake}`,
    `• *Model:* ${data.vehicleModel}`,
    `• *Year:* ${data.year}`,
    data.engineCode ? `• *Engine Code:* ${data.engineCode}` : null,
    ``,
    `🔧 *PARTS REQUESTED:*`,
    `${data.partNeeded}`,
    ``,
    `_Sent via Legendary Parts Centre online portal._`,
  ]
    .filter((line) => line !== null)
    .join('\n');
}
