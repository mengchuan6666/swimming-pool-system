<!-- router-view 结合 keep-alive 组件 -->
<template>
  <router-view v-slot="{ Component }">
    <keep-alive :include="include" :exclude="exclude">
      <component :is="Component" />
    </keep-alive>
  </router-view>
</template>

<script lang="ts">
  import { defineComponent, computed } from 'vue';
  import { useThemeStore } from '@/store/modules/theme';

  export default defineComponent({
    name: 'RouterLayout',
    setup() {
      const themeStore = useThemeStore();
      const include = computed(() => themeStore.keepAliveInclude);
      const exclude = computed(() => themeStore.keepAliveExclude);

      return { include, exclude };
    }
  });
</script>
