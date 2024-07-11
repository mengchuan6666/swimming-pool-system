/** 用于刷新的路由组件 */
import { createVNode, defineComponent, unref } from 'vue';
import { useRouter } from 'vue-router';
import { useThemeStore } from '@/store/modules/theme';

export default defineComponent({
  name: 'RedirectLayout',
  setup() {
    const themeStore = useThemeStore();
    themeStore.setKeepAliveExclude([]);

    const { currentRoute, replace } = useRouter();
    const { params, query } = unref(currentRoute);
    const { path } = params;
    replace({
      path: '/' + (Array.isArray(path) ? path.join('/') : path),
      query: query
    });
    return {};
  },
  render() {
    return createVNode('div');
  }
});
