
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import messages_br from "../translations/pt-BR.json";
import messages_en from "../translations/en.json";
import * as Localization from 'expo-localization';

const resources = {
  en: {
    translation: messages_en
  },
  "pt-BR": {
    translation: messages_br
  }
};
i18n
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    resources,
    lng: Localization.locale,
    fallbackLng: 'en',
    debug: true,
    interpolation: {
      escapeValue: false
    }
  });
export default i18n;