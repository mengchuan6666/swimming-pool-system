import type { PageParam } from '@/api';

/**
 * 
 */
export interface Notice {
  id?: number;
  name?: string;
  message?: string;
  // status?: string;
  createTime?: string;
  createUser?: string;
}

/**
 * 搜索条件
 */
export interface NoticeParam extends PageParam {
  name?: string;
  message?: string;
}
