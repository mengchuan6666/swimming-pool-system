import type { PageParam } from '@/api';

/**
 * 
 */
export interface site {
  id?: number;
  pic?: string;
  name?: string;
  dec?: string;
  deviceInfo?: string;
  price?: string;
  status?: string;
  orderTime?: string;
  orderDate?: string;
}

/**
 * 搜索条件
 */
export interface siteParam extends PageParam {
  name?: string;
}
