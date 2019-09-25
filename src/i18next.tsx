import i18next from "i18next";

i18next.init({
  lng: "en",
  debug: true,
  resources: {
    en: {
      translation: {
        person: {
          name: "hello world"
        }
      }
    }
  }
});

export default i18next;
