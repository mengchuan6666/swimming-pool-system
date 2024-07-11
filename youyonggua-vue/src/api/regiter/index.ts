import request from '@/utils/request';
import { setToken } from '@/utils/token-util';
import type { ApiResult } from '@/api';
import type { RegiterParam } from './model';

/**
 * 注册
 */
export async function regiter(data: RegiterParam) {
  const res = await request.post<ApiResult<unknown>>('/regiter', data);
  if (res.data.code === 0) {
    return res.data.message;
  }
  return Promise.reject(new Error(res.data.message));
}
