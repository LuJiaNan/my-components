import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import * as en from "./i18json/en.json";
import * as zn from "./i18json/zn.json";
import * as dict from "./i18json/dict.json";

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources: {
      en,
      zn,
      dict
    },
    lng: "zn",
    // ns: ['moduleA','moduleB'],
    defaultNS: "moduleA", // 如果不写，只会加载namespace为默认的translation的模块
    keySeparator: false, // we do not use keys in form messages.welcome
    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

export default i18n;
