import { createI18n } from 'vue-i18n'
import { getLanguage } from '@/utils'
import cn from './zh-ch'
import en from './en'

// 创建 i18n
const i18n = createI18n({
  legacy: false,
  globalInjection: true, // 全局模式，可以直接使用 $t
  locale: getLanguage() || 'cn',
  messages: {
    cn,
    en,
  },
})


export function getLocales() {
  const locale = getLanguage() || 'cn'
  const messages = locale === 'cn' ? cn : en
  return messages
}

export default i18n
