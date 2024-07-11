import request from '@/utils/request';
import type { ApiResult, PageResult } from '@/api';
import type { course, courseParam } from './model';

export async function mycourse() {
  const res = await request.get<ApiResult<PageResult<course>>>(
    '/api/course/list'
  );
  if (res.data.code === 0) {
    return res.data.data;
  }
  return Promise.reject(new Error(res.data.message));
}


/**
 * 分页查询
 */
export async function pagecourses(params: courseParam) {
  const res = await request.get<ApiResult<PageResult<course>>>(
    '/api/course/page',
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
export async function listcourses(params?: courseParam) {
  const res = await request.get<ApiResult<course[]>>('/api/course', {
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
export async function getcourse(id: number) {
  const res = await request.get<ApiResult<course>>('/api/course/' + id);
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
export async function addcourse(data: course) {
  const res = await request.post<ApiResult<unknown>>('/api/course', data);
  if (res.data.code === 0) {
    return res.data.message;
  }
  return Promise.reject(new Error(res.data.message));
}

export async function ordercourse(data: course) {
  const res = await request.post<ApiResult<unknown>>('/api/course/orderCourse', data);
  if (res.data.code === 0) {
    return res.data.message;
  }
  return Promise.reject(new Error(res.data.message));
}

/**
 * 修改
 */
export async function updatecourse(data: course) {
  const res = await request.put<ApiResult<unknown>>('/api/course', data);
  if (res.data.code === 0) {
    return res.data.message;
  }
  return Promise.reject(new Error(res.data.message));
}

/**
 * 浏览
 */
export async function viewcourse(id?: number) {
  const res = await request.put<ApiResult<unknown>>('/api/course/view/' + id);
  if (res.data.code === 0) {
    //return res.data.message;
  }
  return Promise.reject(new Error(res.data.message));
}

/**
 * 删除
 */
export async function removecourse(id?: number) {
  const res = await request.delete<ApiResult<unknown>>('/api/course/' + id);
  if (res.data.code === 0) {
    return res.data.message;
  }
  return Promise.reject(new Error(res.data.message));
}
