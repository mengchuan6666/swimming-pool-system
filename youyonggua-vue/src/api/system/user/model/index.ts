import type { PageParam } from '@/api';
import type { Role } from '../../role/model';
import type { Menu } from '../../menu/model';

/**
 * 用户
 */
export interface User {
  // 用户id
  userId?: number;
  // 账号
  username?: string;
  // 密码
  password?: string;
  // 昵称
  nickname?: string;
  // 头像
  avatar?: string;
  // 性别(字典)
  sex?: string;
  // 手机号
  phone?: string;
  // 邮箱
  email?: string;
  // 出生日期
  birthday?: string;
  // 用户类型
  type?: string;
  // 状态, 0正常, 1冻结
  status?: number;
  // 性别名称
  sexName?: string;
  // 角色列表
  roles?: Role[];
  // 权限列表
  authorities?: Menu[];
  // 创建时间
  createTime?: string;
  //学号或者工号
  bianhao?: string;
  //专业或者职称
  zhuanye?: string;
  //班级
  banji?: string;
  //学院
  xueyuan?: string;
  //级别或者入职年份
  nianfen?: string;
}

/**
 * 用户搜索条件
 */
export interface UserParam extends PageParam {
  username?: string;
  nickname?: string;
  sex?: string;
  phone?: string;
  status?: number;
  organizationId?: number;
  sexName?: string;
}
