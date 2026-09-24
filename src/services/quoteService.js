import { quotesApi } from './api';

// The server persists requests and handles configured studio notifications.
// Never report success or retain contact details locally when delivery fails.
export async function submitQuoteRequest(data) {
  const payload = {
    id: 'RB-' + crypto.randomUUID(),
    name: data.name.trim(), email: data.email.trim(), phone: data.phone.trim(),
    location: data.location || 'Roseville, CA',
    make: 'PMU Consultation', modelAndYear: '',
    serviceCategory: data.serviceCategory,
    detailedService: data.detailedService,
    timeline: data.timeline || 'Flexible / next available',
    specificDate: data.specificDate || '',
    details: data.details || '',
  };
  const result = await quotesApi.submitPublicQuote(payload);
  if (!result.success || !result.quoteId) throw new Error('The studio could not receive your request.');
  return result;
}
