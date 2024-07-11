import request from '@/utils/request';

/**
 * 查询景点
 */
export async function jdList() {
  const res = await request.get('/system/charts/QuersiteCounts');
  if (res.data.code === 0 && res.data.data) {
    return res.data.data;
  }
  return Promise.reject(new Error(res.data.message));
}
/**
 * 查询景点
 */
export async function fxList() {
  const res = await request.get('/system/charts/QueryUserShare');
  if (res.data.code === 0 && res.data.data) {
    return res.data.data;
  }
  return Promise.reject(new Error(res.data.message));
}
/**
 * 查询景点
 */
export async function zbList() {
  const res = await request.get('/system/charts/QuerHolidayCounts');
  if (res.data.code === 0 && res.data.data) {
    return res.data.data;
  }
  return Promise.reject(new Error(res.data.message));
}
