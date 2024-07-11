import type { PageParam } from '@/api';

/**
 * 
 */
export interface Notice {
  id?: number;
  title?: string;
  content?: string;
  status?: string;
  createtime?: string;
  creater?: string;
}

/**
 * 搜索条件
 */
export interface NoticeParam extends PageParam {
  title?: string;
}
