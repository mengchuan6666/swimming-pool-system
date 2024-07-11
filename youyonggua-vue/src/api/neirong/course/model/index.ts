import type { PageParam } from '@/api';

/**
 * 
 */
export interface course {
  id?: number;
  name?: string;
  price?: number;
  status?: string;
  pic?: string;
  coachName?: string;
  coachDesc?: string;
  num?: number;
  maxNum?: number;
}

/**
 * 搜索条件
 */
export interface courseParam extends PageParam {
  name?: string;
}
