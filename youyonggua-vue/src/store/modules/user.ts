/**
 * 登录用户store
 */
import { defineStore } from 'pinia';
import { USER_MENUS } from '@/config/setting';
import { formatMenus, toTreeData, formatTreeData } from 'ele-admin-pro';
import type { MenuItem } from 'ele-admin-pro';
import type { User } from '@/api/system/user/model';
import { getUserInfo } from '@/api/layout';

export interface UserState {
  info: User | null;
  menus: MenuItem[] | null | undefined;
  authorities: (string | undefined)[];
  roles: (string | undefined)[];
}

export const useUserStore = defineStore({
  id: 'user',
  state: (): UserState => ({
    // 当前登录用户的信息
    info: null,
    // 当前登录用户的菜单
    menus: null,
    // 当前登录用户的权限
    authorities: [],
    // 当前登录用户的角色
    roles: []
  }),
  getters: {},
  actions: {
    /**
     * 请求用户信息、权限、角色、菜单
     */
    async fetchUserInfo() {
      const result = await getUserInfo();
      // 用户信息
      this.info = result;
      // 用户权限
      this.authorities =
        result.authorities
          ?.filter((d) => !!d.authority)
          ?.map((d) => d.authority) ?? [];
      // 用户角色
      this.roles = result.roles?.map((d) => d.roleCode) ?? [];
      // 用户菜单, 过滤掉按钮类型并转为children形式
      const { menus, homePath } = formatMenus(
        USER_MENUS ??
          toTreeData({
            data: result.authorities?.filter((d) => d.menuType === 0),
            idField: 'menuId',
            parentIdField: 'parentId'
          })
      );
      this.menus = menus;
      return { menus, homePath };
    },
    /**
     * 更新用户信息
     */
    setInfo(value: User) {
      this.info = value;
    },
    /**
     * 更新菜单的badge
     */
    setMenuBadge(path: string, value?: number | string, color?: string) {
      this.menus = formatTreeData(this.menus, (m) => {
        if (path === m.path) {
          return Object.assign({}, m, {
            meta: Object.assign({}, m.meta, {
              badge: value,
              badgeColor: color
            })
          });
        }
        return m;
      });
    }
  }
});
