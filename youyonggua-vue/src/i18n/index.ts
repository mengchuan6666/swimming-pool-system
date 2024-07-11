/**
 * 国际化配置
 */
import { createI18n } from 'vue-i18n';
import zhCNLocale from './lang/zh_CN';
import zhTWLocale from './lang/zh_TW';
import enLocale from './lang/en';
import { I18N_CACHE_NAME } from '@/config/setting';

const messages = {
  zh_CN: zhCNLocale,
  zh_TW: zhTWLocale,
  en: enLocale
};

const i18n = createI18n({
  messages,
  silentTranslationWarn: true,
  // 默认语言
  locale: localStorage.getItem(I18N_CACHE_NAME) || 'zh_CN'
});

export default i18n;
