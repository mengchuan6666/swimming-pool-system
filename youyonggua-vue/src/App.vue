<template>
  <ele-config-provider map-key="3854b5cc6abbcf1b16bbe5c56535fe8e">
    <a-config-provider :locale="language">
      <router-view />
    </a-config-provider>
  </ele-config-provider>
</template>

<script lang="ts">
  import { defineComponent, ref, watch } from 'vue';
  import type { Locale } from 'ele-admin-pro';
  import zh_CN from 'ele-admin-pro/es/lang/zh_CN';
  import zh_TW from 'ele-admin-pro/es/lang/zh_TW';
  import en from 'ele-admin-pro/es/lang/en_US';
  import dayjs from 'dayjs';
  import 'dayjs/locale/zh-cn';
  import 'dayjs/locale/zh-tw';
  import { useI18n } from 'vue-i18n';
  import { useThemeStore } from '@/store/modules/theme';
  const languages = { zh_CN, zh_TW, en };

  export default defineComponent({
    name: 'App',
    setup() {
      const { locale } = useI18n();
      const language = ref<Locale>();

      watch(
        locale,
        (value) => {
          language.value = languages[value];
          dayjs.locale(value.toLowerCase().replace(/_/g, '-'));
        },
        {
          immediate: true
        }
      );

      // 恢复主题
      const themeStore = useThemeStore();
      themeStore.recoverTheme();

      return { language };
    }
  });
</script>
