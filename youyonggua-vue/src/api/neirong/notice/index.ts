import request from '@/utils/request';
import type { ApiResult, PageResult } from '@/api';
import type { Notice, NoticeParam } from './model';

/**
 * 分页查询
 */
export async function pageNotices(params: NoticeParam) {
  const res = await request.get<ApiResult<PageResult<Notice>>>(
    '/api/notice/page',
    { params }
  );
  if (res.data.code === 0) {
    return res.data.data;
  }
  return Promise.reject(new Error(res.data.message));
}

export async function getData() {
  const res = await request.get<ApiResult<object>>(
    '/getData',
  );
  console.log(res)
 
  return Promise.reject(new Error(res.data.message));
}

/**
 * 查询列表
 */
export async function listNotices(params?: NoticeParam) {
  const res = await request.get<ApiResult<Notice[]>>('/api/notice', {
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
export async function addNotice(data: Notice) {
  const res = await request.post<ApiResult<unknown>>('/api/notice', data);
  if (res.data.code === 0) {
    return res.data.message;
  }
  return Promise.reject(new Error(res.data.message));
}

/**
 * 修改
 */
export async function updateNotice(data: Notice) {
  const res = await request.put<ApiResult<unknown>>('/api/notice', data);
  if (res.data.code === 0) {
    return res.data.message;
  }
  return Promise.reject(new Error(res.data.message));
}

/**
 * 发布
 */
export async function fabuNotice(id?: number) {
  const res = await request.put<ApiResult<unknown>>('/api/notice/' + id);
  if (res.data.code === 0) {
    return res.data.message;
  }
  return Promise.reject(new Error(res.data.message));
}

/**
 * 删除
 */
export async function removeNotice(id?: number) {
  const res = await request.delete<ApiResult<unknown>>('/api/notice/' + id);
  if (res.data.code === 0) {
    return res.data.message;
  }
  return Promise.reject(new Error(res.data.message));
}
