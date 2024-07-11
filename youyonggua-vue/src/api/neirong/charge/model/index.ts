import type { PageParam } from '@/api';

/**
 * 
 */
export interface charge {
  id?: number;
  amount?: number;
  status?: string;
  startTime?: string;
  endTime?: string;
}

/**
 * 搜索条件
 */
export interface chargeParam extends PageParam {
  name?: string;
}
