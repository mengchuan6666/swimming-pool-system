import request from '@/utils/request';
import type { ApiResult } from '@/api';
import type { Menu, MenuParam } from './model';

/**
 * 查询菜单列表
 */
export async function listMenus(params: MenuParam) {
  const res = await request.get<ApiResult<Menu[]>>('/system/menu', {
    params
  });
  if (res.data.code === 0) {
    return res.data.data;
  }
  return Promise.reject(new Error(res.data.message));
}

/**
 * 添加菜单
 */
export async function addMenu(data: Menu) {
  const res = await request.post<ApiResult<unknown>>('/system/menu', data);
  if (res.data.code === 0) {
    return res.data.message;
  }
  return Promise.reject(new Error(res.data.message));
}

/**
 * 修改菜单
 */
export async function updateMenu(data: Menu) {
  const res = await request.put<ApiResult<unknown>>('/system/menu', data);
  if (res.data.code === 0) {
    return res.data.message;
  }
  return Promise.reject(new Error(res.data.message));
}

/**
 * 删除菜单
 */
export async function removeMenu(id?: number) {
  const res = await request.delete<ApiResult<unknown>>('/system/menu/' + id);
  if (res.data.code === 0) {
    return res.data.message;
  }
  return Promise.reject(new Error(res.data.message));
}
