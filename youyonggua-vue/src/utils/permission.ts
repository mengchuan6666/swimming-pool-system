/**
 * 按钮级权限控制
 */
import type { App } from 'vue';
import { useUserStore } from '@/store/modules/user';

// 判断数组是否有某些值
const arrayHas = function (
  array: (string | undefined)[],
  value: string | string[]
): boolean {
  if (!value) {
    return true;
  }
  if (!array) {
    return false;
  }
  if (Array.isArray(value)) {
    for (let i = 0; i < value.length; i++) {
      if (array.indexOf(value[i]) === -1) {
        return false;
      }
    }
    return true;
  }
  return array.indexOf(value) !== -1;
};

// 判断数组是否有任意值
const arrayHasAny = function (
  array: (string | undefined)[],
  value: string | string[]
): boolean {
  if (!value) {
    return true;
  }
  if (!array) {
    return false;
  }
  if (Array.isArray(value)) {
    for (let i = 0; i < value.length; i++) {
      if (array.indexOf(value[i]) !== -1) {
        return true;
      }
    }
    return false;
  }
  return array.indexOf(value) !== -1;
};

/**
 * 是否有某些角色
 * @param value 角色字符或字符数组
 */
export function hasRole(value: string | string[]): boolean {
  const userStore = useUserStore();
  return arrayHas(userStore?.roles, value);
}

/**
 * 是否有任意角色
 * @param value 角色字符或字符数组
 */
export function hasAnyRole(value: string | string[]): boolean {
  const userStore = useUserStore();
  return arrayHasAny(userStore?.roles, value);
}

/**
 * 是否有某些权限
 * @param value 权限字符或字符数组
 */
export function hasPermission(value: string | string[]): boolean {
  const userStore = useUserStore();
  return arrayHas(userStore?.authorities, value);
}

/**
 * 是否有任意权限
 * @param value 权限字符或字符数组
 */
export function hasAnyPermission(value: string | string[]): boolean {
  const userStore = useUserStore();
  return arrayHasAny(userStore?.authorities, value);
}

export default {
  install(app: App) {
    // 添加自定义指令
    app.directive('role', {
      mounted: (el, binding) => {
        if (!hasRole(binding.value)) {
          el.parentNode?.removeChild(el);
        }
      }
    });
    app.directive('any-role', {
      mounted: (el, binding) => {
        if (!hasAnyRole(binding.value)) {
          el.parentNode?.removeChild(el);
        }
      }
    });
    app.directive('permission', {
      mounted: (el, binding) => {
        if (!hasPermission(binding.value)) {
          el.parentNode?.removeChild(el);
        }
      }
    });
    app.directive('any-permission', {
      mounted: (el, binding) => {
        if (!hasAnyPermission(binding.value)) {
          el.parentNode?.removeChild(el);
        }
      }
    });
  }
};
