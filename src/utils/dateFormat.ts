import { format, formatRelative } from 'date-fns';
import { de, enUS } from 'date-fns/locale';

const locales = {
  en: enUS,
  de: de
};

export function formatDate(date: string | Date, formatStr: string, locale: string = 'en'): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return format(dateObj, formatStr, {
    locale: locales[locale as keyof typeof locales] || locales.en
  });
}

export function formatRelativeDate(date: string | Date, locale: string = 'en'): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return formatRelative(dateObj, new Date(), {
    locale: locales[locale as keyof typeof locales] || locales.en
  });
}

export const dateFormats = {
  eventCard: {
    en: 'EEE, MMM d, yyyy - h:mm a',
    de: 'EEE, d. MMM yyyy - HH:mm'
  },
  eventDetails: {
    en: 'EEEE, MMMM d, yyyy',
    de: 'EEEE, d. MMMM yyyy'
  },
  time: {
    en: 'h:mm a',
    de: 'HH:mm'
  }
};