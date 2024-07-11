import { PageParam } from '@/api';

/**
 * 登录日志
 */
export interface LoginRecord {
  // 登录日志id
  id: number;
  // 用户账号
  username: string;
  // 操作系统
  os: string;
  // 设备名称
  device: string;
  // 浏览器类型
  browser: string;
  // ip地址
  ip: string;
  // 操作类型, 0登录成功, 1登录失败, 2退出登录, 3续签token
  loginType: number;
  // 备注
  comments: string;
  // 操作时间
  createTime: string;
  // 用户昵称
  nickname: string;
}

/**
 * 登录日志搜索条件
 */
export interface LoginRecordParam extends PageParam {
  username?: string;
  nickname?: string;
  createTimeStart?: string;
  createTimeEnd?: string;
  loginType?: number;
}
