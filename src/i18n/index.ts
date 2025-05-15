import { createI18n } from 'vue-i18n';
import en from './en.json';
import de from './de.json';

export default createI18n({
  legacy: false,
  locale: localStorage.getItem('locale') || 'en',
  fallbackLocale: 'en',
  messages: {
    en,
    de
  }
});