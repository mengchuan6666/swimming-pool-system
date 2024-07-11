import type { PageParam } from '@/api';

/**
 * 角色
 */
export interface Role {
  // 角色id
  roleId?: number;
  // 角色标识
  roleCode?: string;
  // 角色名称
  roleName?: string;
  // 备注
  comments?: string;
  // 创建时间
  createTime?: string;
}

/**
 * 角色搜索条件
 */
export interface RoleParam extends PageParam {
  roleName?: string;
  roleCode?: string;
  comments?: string;
}
