/**
 * 修改密码参数
 */
export interface UpdatePasswordParam {
  // 新密码
  password: string;
  // 原始密码
  oldPassword: string;
}

/**
 * 通知数据格式
 */
export interface NoticeModel {
  // 图标颜色
  color?: string;
  // 图标
  icon?: string;
  // 标题
  title?: string;
  // 时间
  time?: string;
}

/**
 * 私信数据格式
 */
export interface LetterModel {
  // 头像
  avatar?: string;
  // 标题
  title?: string;
  // 内容
  content?: string;
  // 时间
  time?: string;
}

/**
 * 代办数据格式
 */
export interface TodoModel {
  // 状态
  status?: number;
  // 标题
  title?: string;
  // 描述
  description?: string;
}

/**
 * 查询未读通知返回结果
 */
export interface NoticeResult {
  notice: NoticeModel[];
  letter: LetterModel[];
  todo: TodoModel[];
}
