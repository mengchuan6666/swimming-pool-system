import { watch, onActivated, nextTick } from 'vue';
import { storeToRefs } from 'pinia';
import { useThemeStore } from '@/store/modules/theme';

export function onSizeChange(hook: Function) {
  if (!hook) {
    return;
  }
  const themeStore = useThemeStore();
  const { contentWidth } = storeToRefs(themeStore);

  watch(contentWidth, () => {
    hook();
  });

  onActivated(() => {
    nextTick(() => {
      hook();
    });
  });
}
