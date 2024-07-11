import request from '@/utils/request';
import type { ApiResult, PageResult } from '@/api';
import type { charge, chargeParam } from './model';


export async function mycharge() {
    const res = await request.get<ApiResult<PageResult<charge>>>(
      '/api/mycharge/list'
    );
    if (res.data.code === 0) {
      return res.data.data;
    }
    return Promise.reject(new Error(res.data.message));
  }


  
  export async function charge(data:charge) {
    const res = await request.post<ApiResult<PageResult<charge>>>(
      '/api/mycharge/charge',
       data
    );
    if (res.data.code === 0) {
      return res.data.data;
    }
    return Promise.reject(new Error(res.data.message));
  }
  