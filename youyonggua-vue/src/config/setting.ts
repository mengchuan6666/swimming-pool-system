// 不显示侧栏的路由
export const HIDE_SIDEBARS = [];

// 不显示页脚的路由
export const HIDE_FOOTERS = [
  '/system/dictionary',
  '/system/organization',
  '/form/advanced',
  '/example/choose'
];

// 页签同路由不同参数可重复打开的路由
export const REPEATABLE_TABS = ['/system/user-info'];

// 不需要登录的路由
export const WHITE_LIST = ['/login', '/forget', '/regiter','/index','/product',
'/site','/ticket','/video','/holiday','/product','/notice'];

// 直接指定菜单数据
export const USER_MENUS = null;

// 首页名称, 为空则取第一个菜单的名称
export const HOME_TITLE = null;

// 开启多页签是否缓存组件
//export const TAB_KEEP_ALIVE = !import.meta.env.DEV;
export const TAB_KEEP_ALIVE = true;

// token传递的header名称
export const TOKEN_HEADER_NAME = 'Authorization';

// token存储的名称
export const TOKEN_STORE_NAME = 'access_token';

// 主题配置存储的名称
export const THEME_STORE_NAME = 'theme';

// i18n缓存的名称
export const I18N_CACHE_NAME = 'i18n-lang';
