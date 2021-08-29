import { createI18n } from 'vue-i18n'
import storage from 'storejs'

// default lang
import znCN from './lang/zh-CN'

export const defaultLang = 'zh-CN'

const message = {
  'zh-CN': {
    ...znCN
  }
}

const i18n = createI18n({
  locale: 'zh-cn', // set locale
  fallbackLocale: 'zh-cn', // set fallback locale
  message, // set locale messages
})

const loadedLanguages = [defaultLang]

/**
 * 设置语言
 * @author 陆耀华
 * @date 2021-08-19
 * @param {any} lang
 * @returns {any}
 */
function setI18nLanguage (lang) {
  i18n.locale = lang
  // request.headers['Accept-Language'] = lang
  document.querySelector('html').setAttribute('lang', lang)
  return lang
}

export function loadLanguageAsync (lang = defaultLang) {
  return new Promise(resolve => {
    // 缓存语言设置
    storage.set('lang', lang)
    if (i18n.locale !== lang) {
      if (!loadedLanguages.includes(lang)) {
        return import(/* webpackChunkName: "lang-[request]" */ `./lang/${lang}`).then(msg => {
          const locale = msg.default
          i18n.setLocaleMessage(lang, locale)
          loadedLanguages.push(lang)
          // moment.updateLocale(locale.momentName, locale.momentLocale)
          return setI18nLanguage(lang)
        })
      }
      return resolve(setI18nLanguage(lang))
    }
    return resolve(lang)
  })
}

export function i18nRender (key) {
  return i18n.t(`${key}`)
}

export default i18n
