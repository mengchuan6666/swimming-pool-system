import { PageParam } from '@/api';

/**
 * 操作日志
 */
export interface OperationRecord {
  // 操作日志id
  id?: number;
  // 用户id
  userId?: number;
  // 操作模块
  module: string;
  // 操作功能
  description: string;
  // 请求地址
  url: string;
  // 请求方式
  requestMethod: string;
  // 调用方法
  method: string;
  // 请求参数
  params: string;
  // 返回结果
  result: string;
  // 异常信息
  error: string;
  // 消耗时间, 单位毫秒
  spendTime: number;
  // 操作系统
  os: string;
  // 设备名称
  device: string;
  // 浏览器类型
  browser: string;
  // ip地址
  ip: string;
  // 状态, 0成功, 1异常
  status: number;
  // 操作时间
  createTime: string;
  // 用户昵称
  nickname: string;
  // 用户账号
  username: string;
}

/**
 * 操作日志搜索条件
 */
export interface OperationRecordParam extends PageParam {
  username?: string;
  module?: string;
  createTimeStart?: string;
  createTimeEnd?: string;
  status?: number;
}
