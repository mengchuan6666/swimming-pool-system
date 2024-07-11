import request from '@/utils/request';
import type { ApiResult, PageResult } from '@/api';
import type { site, siteParam } from './model';

export async function mysite() {
  const res = await request.get<ApiResult<PageResult<site>>>(
    '/api/site/list'
  );
  if (res.data.code === 0) {
    return res.data.data;
  }
  return Promise.reject(new Error(res.data.message));
}

/**
 * 分页查询
 */
export async function pagesites(params: siteParam) {
  const res = await request.get<ApiResult<PageResult<site>>>(
    '/api/site/page',
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
export async function listsites(params?: siteParam) {
  const res = await request.get<ApiResult<site[]>>('/api/site', {
    params
  });
  if (res.data.code === 0 && res.data.data) {
    return res.data.data;
  }
  return Promise.reject(new Error(res.data.message));
}

/**
 * 根据id查询
 */
export async function getsite(id: number) {
  const res = await request.get<ApiResult<site>>('/api/site/' + id);
  if (res.data.code === 0 && res.data.data) {
    return res.data.data;
  }
  return Promise.reject(new Error(res.data.message));
}

/**
 * 上传文件
 */
export async function uploadFile(file: File) {
  const formData = new FormData();
  formData.append('file', file);
  const res = await request.post<ApiResult<unknown>>(
    '/api/file/upload',
    formData
  );
  // debugger
  if (res.data.code === 0) {
    return res.data.message;
  }
  return Promise.reject(new Error(res.data.message));
}

/**
 * 添加
 */
export async function addsite(data: site) {
  const res = await request.post<ApiResult<unknown>>('/api/site', data);
  if (res.data.code === 0) {
    return res.data.message;
  }
  return Promise.reject(new Error(res.data.message));
}


export async function orderSite(data: site) {
  const res = await request.post<ApiResult<unknown>>('/api/site/orderSite', data);
  if (res.data.code === 0) {
    return res.data.message;
  }
  return Promise.reject(new Error(res.data.message));
}

/**
 * 修改
 */
export async function updatesite(data: site) {
  const res = await request.put<ApiResult<unknown>>('/api/site', data);
  if (res.data.code === 0) {
    return res.data.message;
  }
  return Promise.reject(new Error(res.data.message));
}

/**
 * 发布
 */
export async function fabusite(id?: number) {
  const res = await request.put<ApiResult<unknown>>('/api/site/' + id);
  if (res.data.code === 0) {
    return res.data.message;
  }
  return Promise.reject(new Error(res.data.message));
}

/**
 * 删除
 */
export async function removesite(id?: number) {
  const res = await request.delete<ApiResult<unknown>>('/api/site/' + id);
  if (res.data.code === 0) {
    return res.data.message;
  }
  return Promise.reject(new Error(res.data.message));
}
