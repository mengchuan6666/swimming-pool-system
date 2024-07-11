import request from '@/utils/request';
import type { RegionsData } from './types';
let reqPromise: Promise<RegionsData[]>;

/**
 * 获取省市区数据
 */
export function getRegionsData() {
  if (!reqPromise) {
    reqPromise = new Promise<RegionsData[]>((resolve, reject) => {
      request
        .get<RegionsData[]>(
          'https://cdn.eleadmin.com/20200610/regions-data.json'
        )
        .then((res) => {
          resolve(res.data ?? []);
        })
        .catch((e) => {
          reject(e);
        });
    });
  }
  return reqPromise;
}
