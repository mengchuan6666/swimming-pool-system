import request from '@/utils/request';
import type { ApiResult, PageResult } from '@/api';
import type { Notice, NoticeParam } from './model';

/**
 * 分页查询
 */
export async function pageMesg(params: NoticeParam) {
  const res = await request.get<ApiResult<PageResult<Notice>>>(
    '/system/leavemessage/page',
    { params }
  );
  if (res.data.code === 0) {
    return res.data.data;
  }
  return Promise.reject(new Error(res.data.message));
}

/**
 * 查询列表
 */
export async function listMesg(params?: NoticeParam) {
  const res = await request.get<ApiResult<Notice[]>>('/system/leavemessage', {
    params
  });
  if (res.data.code === 0 && res.data.data) {
    return res.data.data;
  }
  return Promise.reject(new Error(res.data.message));
}

/**
 * 添加
 */
export async function addMesg(data: Notice) {
  const res = await request.post<ApiResult<unknown>>('/system/leavemessage', data);
  if (res.data.code === 0) {
    return res.data.message;
  }
  return Promise.reject(new Error(res.data.message));
}

/**
 * 修改
 */
export async function updateMesg(data: Notice) {
  const res = await request.put<ApiResult<unknown>>('/system/leavemessage', data);
  if (res.data.code === 0) {
    return res.data.message;
  }
  return Promise.reject(new Error(res.data.message));
}


/**
 * 删除
 */
export async function removeMesg(id?: number) {
  const res = await request.delete<ApiResult<unknown>>('/system/leavemessage/' + id);
  if (res.data.code === 0) {
    return res.data.message;
  }
  return Promise.reject(new Error(res.data.message));
}
