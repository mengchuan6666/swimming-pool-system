/**
 * 页签操作封装
 */
import { unref } from 'vue';
import router from '@/router';
import { useThemeStore } from '@/store/modules/theme';
import type { TabItem } from 'ele-admin-pro';
const homePath = '/';

/**
 * 刷新当前路由
 */
export function reloadPageTab() {
  const { path, query, matched } = unref(router.currentRoute);
  const components = new Set<string>();
  matched.forEach((m) => {
    if (
      m.components?.default?.name &&
      !['RouterLayout', 'EleLayout'].includes(m.components.default.name)
    ) {
      components.add(m.components.default.name);
    }
  });
  useThemeStore().setKeepAliveExclude(Array.from(components));
  router.replace({
    query: query,
    path: '/redirect' + path
  });
}

/**
 * 关闭当前页签
 */
export function finishPageTab() {
  const { fullPath } = unref(router.currentRoute);
  removePageTab({ key: fullPath, active: fullPath });
}

/**
 * 关闭页签
 * @param key 页签的key
 * @param active 选中页签的key
 */
export function removePageTab({ key, active }: TabRemoveOptions) {
  useThemeStore()
    .tabRemove(key)
    .then(({ lastPath }) => {
      if (active && key === active) {
        router.push(lastPath || homePath);
      }
    });
}

/**
 * 关闭全部页签
 */
export function removeAllPageTab(active: string) {
  useThemeStore()
    .tabRemoveAll(active)
    .then((stay) => {
      if (!stay && active && active !== homePath) {
        router.push(homePath);
      }
    });
}

/**
 * 关闭左侧页签
 */
export function removeLeftPageTab(key: string) {
  useThemeStore().tabRemoveLeft(key);
}

/**
 * 关闭右侧页签
 */
export function removeRightPageTab(key: string) {
  useThemeStore().tabRemoveRight(key);
}

/**
 * 关闭其它页签
 */
export function removeOtherPageTab(key: string) {
  useThemeStore().tabRemoveOther(key);
}

/**
 * 添加页签
 */
export function addPageTab(data: TabItem | TabItem[]) {
  useThemeStore().tabAdd(data);
}

/**
 * 修改页签
 */
export function setPageTab(data: TabItem) {
  useThemeStore().tabSetItem(data);
}

/**
 * 设置主页的组件名称
 */
export function setHomeComponents(data: string[]) {
  useThemeStore().setHomeComponents(data);
}

/**
 * 关闭页签参数类型
 */
export interface TabRemoveOptions {
  key: string;
  active?: string;
}
