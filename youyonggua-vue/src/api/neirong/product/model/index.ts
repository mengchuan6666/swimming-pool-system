import type { PageParam } from '@/api';

/**
 * 
 */
export interface product {
  id?: number;
  name?: string;
  price?: number;
  detail?: string;
  status?: string;
  pic?: string;
  num?: number;
  maxNum?: number;
}

/**
 * 搜索条件
 */
export interface productParam extends PageParam {
  name?: string;
}
