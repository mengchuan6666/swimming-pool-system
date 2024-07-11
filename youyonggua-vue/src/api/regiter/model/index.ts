import type { User } from '../../system/user/model';
/**
 * 登录参数
 */
export interface RegiterParam {
  // 账号
  username?: string;
  // 用户昵称
  nickname?: string;
  // 密码
  password?: string;
  
  passtwo?: string;
  email?: string;
  phone?:string;
}

