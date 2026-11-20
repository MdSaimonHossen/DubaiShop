/**
 * Utilities for formatting WhatsApp URLs and intelligent pre-filled messages.
 * Never hard-codes the phone number, accepts the configurable number from SiteSettings.
 */

export function cleanPhoneNumber(phone: string): string {
  // Strip non-digits
  return phone.replace(/[^0-9]/g, '');
}

export function buildEmergencyWhatsAppUrl(options: {
  whatsappNumber: string;
  vehicleBrand?: string;
  vehicleModel?: string;
  year?: string;
  locationArea?: string;
  issue?: string;
}): string {
  const number = cleanPhoneNumber(options.whatsappNumber);
  
  const lines = [
    'Hello Apex Auto Team, I need emergency roadside assistance in Dubai.',
    '',
    options.vehicleBrand || options.vehicleModel
      ? `🚗 Vehicle: ${[options.vehicleBrand, options.vehicleModel, options.year].filter(Boolean).join(' ')}`
      : '🚗 Vehicle: [Pending confirmation]',
    options.locationArea
      ? `📍 Location: ${options.locationArea}`
      : '📍 Location: [Sharing live WhatsApp pin next]',
    options.issue
      ? `⚠️ Issue: ${options.issue}`
      : '⚠️ Issue: Car will not start / Dead battery',
    '',
    'Please confirm technician availability and estimated arrival time.'
  ];

  const text = encodeURIComponent(lines.join('\n'));
  return `https://wa.me/${number}?text=${text}`;
}

export function buildBatteryQuoteWhatsAppUrl(options: {
  whatsappNumber: string;
  batteryName: string;
  vehicleInfo?: string;
}): string {
  const number = cleanPhoneNumber(options.whatsappNumber);

  const lines = [
    'Hello Apex Auto Team,',
    `I would like to check availability and request on-site replacement for:`,
    `⚡ Battery: ${options.batteryName}`,
    options.vehicleInfo ? `🚗 My Vehicle: ${options.vehicleInfo}` : '',
    'Please send available options, warranty details, and installation ETA in Dubai.',
    'Thank you.'
  ].filter(Boolean);

  const text = encodeURIComponent(lines.join('\n'));
  return `https://wa.me/${number}?text=${text}`;
}

export function buildGeneralInquiryWhatsAppUrl(whatsappNumber: string, context = 'mobile service in Dubai'): string {
  const number = cleanPhoneNumber(whatsappNumber);
  const text = encodeURIComponent(`Hello Apex Auto Team, I have an inquiry regarding ${context}. Please let me know how we can proceed.`);
  return `https://wa.me/${number}?text=${text}`;
}
