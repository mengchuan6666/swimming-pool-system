import request from '@/utils/request';
import type { ApiResult, PageResult } from '@/api';
import type { product, productParam } from './model';

/**
 * 分页查询
 */
export async function pageproducts(params: productParam) {
  const res = await request.get<ApiResult<PageResult<product>>>(
    '/api/product/page',
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
export async function listproducts(params?: productParam) {
  const res = await request.get<ApiResult<product[]>>('/api/product', {
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
export async function getproduct(id: number) {
  const res = await request.get<ApiResult<product>>('/api/product/' + id);
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
  if (res.data.code === 0) {
    return res.data.message;
  }
  return Promise.reject(new Error(res.data.message));
}

/**
 * 添加
 */
export async function addproduct(data: product) {
  const res = await request.post<ApiResult<unknown>>('/api/product', data);
  if (res.data.code === 0) {
    return res.data.message;
  }
  return Promise.reject(new Error(res.data.message));
}

export async function orderproduct(data: course) {
  const res = await request.post<ApiResult<unknown>>(
    '/api/product/orderProduct',
    data
  );
  if (res.data.code === 0) {
    return res.data.message;
  }
  return Promise.reject(new Error(res.data.message));
}

/**
 * 修改
 */
export async function updateproduct(data: product) {
  const res = await request.put<ApiResult<unknown>>('/api/product', data);
  if (res.data.code === 0) {
    return res.data.message;
  }
  return Promise.reject(new Error(res.data.message));
}

/**
 * 浏览
 */
export async function viewproduct(id?: number) {
  const res = await request.put<ApiResult<unknown>>('/api/product/view/' + id);
  if (res.data.code === 0) {
    //return res.data.message;
  }
  return Promise.reject(new Error(res.data.message));
}

/**
 * 删除
 */
export async function removeproduct(id?: number) {
  const res = await request.delete<ApiResult<unknown>>('/api/product/' + id);
  if (res.data.code === 0) {
    return res.data.message;
  }
  return Promise.reject(new Error(res.data.message));
}
