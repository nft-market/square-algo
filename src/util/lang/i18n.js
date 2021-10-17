//i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import zh from './zh';
import en from './en';

const resources = {
  zh: {
    translation: zh
  },
  en: {
    translation: en
  }
};

console.log(resources);

let language = 'en'
if (localStorage.chair_language != undefined && localStorage.chair_language != null && localStorage.chair_language != '') {
  language = localStorage.chair_language
} else {
  if ('zh' == navigator.language) {
    language = 'zh'
  }
}

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: language,

    keySeparator: false, // we do not use keys in form messages.welcome

    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;