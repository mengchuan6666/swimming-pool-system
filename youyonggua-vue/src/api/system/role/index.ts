import request from '@/utils/request';
import type { ApiResult, PageResult } from '@/api';
import type { Role, RoleParam } from './model';
import type { Menu } from '../menu/model';

/**
 * 分页查询角色
 */
export async function pageRoles(params: RoleParam) {
  const res = await request.get<ApiResult<PageResult<Role>>>(
    '/system/role/page',
    { params }
  );
  if (res.data.code === 0) {
    return res.data.data;
  }
  return Promise.reject(new Error(res.data.message));
}

/**
 * 查询角色列表
 */
export async function listRoles(params?: RoleParam) {
  const res = await request.get<ApiResult<Role[]>>('/system/role', {
    params
  });
  if (res.data.code === 0 && res.data.data) {
    return res.data.data;
  }
  return Promise.reject(new Error(res.data.message));
}

/**
 * 添加角色
 */
export async function addRole(data: Role) {
  const res = await request.post<ApiResult<unknown>>('/system/role', data);
  if (res.data.code === 0) {
    return res.data.message;
  }
  return Promise.reject(new Error(res.data.message));
}

/**
 * 修改角色
 */
export async function updateRole(data: Role) {
  const res = await request.put<ApiResult<unknown>>('/system/role', data);
  if (res.data.code === 0) {
    return res.data.message;
  }
  return Promise.reject(new Error(res.data.message));
}

/**
 * 删除角色
 */
export async function removeRole(id?: number) {
  const res = await request.delete<ApiResult<unknown>>('/system/role/' + id);
  if (res.data.code === 0) {
    return res.data.message;
  }
  return Promise.reject(new Error(res.data.message));
}

/**
 * 批量删除角色
 */
export async function removeRoles(data: (number | undefined)[]) {
  const res = await request.delete<ApiResult<unknown>>('/system/role/batch', {
    data
  });
  if (res.data.code === 0) {
    return res.data.message;
  }
  return Promise.reject(new Error(res.data.message));
}

/**
 * 获取角色分配的菜单
 */
export async function listRoleMenus(roleId?: number) {
  const res = await request.get<ApiResult<Menu[]>>(
    '/system/role-menu/' + roleId
  );
  if (res.data.code === 0) {
    return res.data.data;
  }
  return Promise.reject(new Error(res.data.message));
}

/**
 * 修改角色菜单
 */
export async function updateRoleMenus(roleId?: number, data?: number[]) {
  const res = await request.put<ApiResult<unknown>>(
    '/system/role-menu/' + roleId,
    data
  );
  if (res.data.code === 0) {
    return res.data.message;
  }
  return Promise.reject(new Error(res.data.message));
}
