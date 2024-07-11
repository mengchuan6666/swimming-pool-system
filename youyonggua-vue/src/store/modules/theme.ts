/**
 * 主题状态管理
 */
import { defineStore } from 'pinia';
import { TAB_KEEP_ALIVE, THEME_STORE_NAME } from '@/config/setting';
import {
  changeColor,
  screenWidth,
  screenHeight,
  contentWidth,
  contentHeight
} from 'ele-admin-pro';
import type {
  TabItem,
  HeadStyleType,
  SideStyleType,
  LayoutStyleType,
  SideMenuStyleType,
  TabStyleType
} from 'ele-admin-pro';

// state默认值
const DEFAULT_STATE: ThemeState = Object.freeze({
  // 多页签数据
  tabs: [],
  // 是否折叠侧边栏
  collapse: false,
  // 是否折叠侧栏一级菜单
  sideNavCollapse: false,
  // 内容区域是否全屏
  bodyFullscreen: false,
  // 是否开启多页签
  showTabs: true,
  // 是否开启页脚
  showFooter: true,
  // 顶栏风格: light(亮色), dark(暗色), primary(主色)
  headStyle: 'light',
  // 侧边栏风格: light(亮色), dark(暗色)
  sideStyle: 'dark',
  // 布局风格: side(默认), top(顶栏菜单), mix(混合菜单)
  layoutStyle: 'side',
  // 侧边栏菜单风格: default(默认), mix(双排菜单)
  sideMenuStyle: 'default',
  // 标签页风格: default(默认), dot(圆点), card(卡片)
  tabStyle: 'default',
  // 是否固定顶栏
  fixedHeader: false,
  // 是否固定侧栏
  fixedSidebar: true,
  // 是否固定主体
  fixedBody: true,
  // 内容区域宽度铺满
  bodyFull: true,
  // logo是否自适应宽度
  logoAutoSize: false,
  // 侧栏是否多彩图标
  colorfulIcon: false,
  // 侧边栏是否只保持一个子菜单展开
  sideUniqueOpen: true,
  // 是否是色弱模式
  weakMode: false,
  // 是否是暗黑模式
  darkMode: false,
  // 主题色
  color: null,
  // 主页的组件
  homeComponents: [],
  // 不需要keep-alive的组件
  keepAliveExclude: [],
  // 屏幕宽度
  screenWidth: screenWidth(),
  // 屏幕高度
  screenHeight: screenHeight(),
  // 内容区域宽度
  contentWidth: contentWidth(),
  // 内容区域高度
  contentHeight: contentHeight()
});

// 读取缓存配置
const getCacheSetting = function (): any {
  try {
    const value = localStorage.getItem(THEME_STORE_NAME);
    if (value) {
      const cache = JSON.parse(value);
      if (typeof cache === 'object') {
        return cache;
      }
    }
  } catch (e) {
    console.error(e);
  }
  return {};
};

// 缓存配置
const cacheSetting = function (key: string, value: any) {
  const cache = getCacheSetting();
  if (cache[key] !== value) {
    cache[key] = value;
    localStorage.setItem(THEME_STORE_NAME, JSON.stringify(cache));
  }
};

// 切换色弱模式
const changeWeakMode = function (weakMode: boolean) {
  const weakClass = 'ele-admin-weak';
  if (weakMode) {
    document.body.classList.add(weakClass);
  } else {
    document.body.classList.remove(weakClass);
  }
};

// 切换主题
const changeTheme = function (value?: string | null, dark?: boolean) {
  return new Promise<void>((resolve, reject) => {
    try {
      changeColor(value, dark);
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

// 延时操作定时器
let disableTransitionTimer: number;
let updateContentSizeTimer: number;

// 切换布局时禁用过渡动画
const disableTransition = function () {
  disableTransitionTimer && clearTimeout(disableTransitionTimer);
  const disabledClass = 'ele-transition-disabled';
  document.body.classList.add(disabledClass);
  disableTransitionTimer = setTimeout(() => {
    document.body.classList.remove(disabledClass);
  }, 100) as unknown as number;
};

// useThemeStore
export const useThemeStore = defineStore({
  id: 'theme',
  state: (): ThemeState => {
    const state = { ...DEFAULT_STATE };
    // 读取本地缓存
    const cache = getCacheSetting();
    Object.keys(state).forEach((key) => {
      if (typeof cache[key] !== 'undefined') {
        state[key] = cache[key];
      }
    });
    return state;
  },
  getters: {
    // 需要keep-alive的组件
    keepAliveInclude(): string[] {
      if (TAB_KEEP_ALIVE && this.showTabs) {
        const components = new Set<string>();
        this.tabs?.forEach((t) => {
          if (t?.components?.length) {
            t.components.forEach((c) => {
              if (typeof c === 'string' && c) {
                components.add(c);
              }
            });
          }
        });
        this.homeComponents?.forEach((c) => {
          if (typeof c === 'string' && c) {
            components.add(c);
          }
        });
        return Array.from(components);
      }
      return [];
    }
  },
  actions: {
    setTabs(value: TabItem[]) {
      this.tabs = value;
    },
    setCollapse(value: boolean) {
      this.collapse = value;
      this.delayUpdateContentSize(800);
    },
    setSideNavCollapse(value: boolean) {
      this.sideNavCollapse = value;
      this.delayUpdateContentSize(800);
    },
    setBodyFullscreen(value: boolean) {
      this.bodyFullscreen = value;
      this.delayUpdateContentSize(800);
    },
    setShowTabs(value: boolean) {
      this.showTabs = value;
      cacheSetting('showTabs', value);
      this.delayUpdateContentSize();
    },
    setShowFooter(value: boolean) {
      this.showFooter = value;
      cacheSetting('showFooter', value);
      this.delayUpdateContentSize();
    },
    setHeadStyle(value: HeadStyleType) {
      this.headStyle = value;
      cacheSetting('headStyle', value);
    },
    setSideStyle(value: SideStyleType) {
      this.sideStyle = value;
      cacheSetting('sideStyle', value);
    },
    setLayoutStyle(value: LayoutStyleType) {
      disableTransition();
      this.layoutStyle = value;
      cacheSetting('layoutStyle', value);
      this.delayUpdateContentSize();
    },
    setSideMenuStyle(value: SideMenuStyleType) {
      disableTransition();
      this.sideMenuStyle = value;
      cacheSetting('sideMenuStyle', value);
      this.delayUpdateContentSize();
    },
    setTabStyle(value: TabStyleType) {
      this.tabStyle = value;
      cacheSetting('tabStyle', value);
    },
    setFixedHeader(value: boolean) {
      disableTransition();
      this.fixedHeader = value;
      cacheSetting('fixedHeader', value);
    },
    setFixedSidebar(value: boolean) {
      disableTransition();
      this.fixedSidebar = value;
      cacheSetting('fixedSidebar', value);
    },
    setFixedBody(value: boolean) {
      disableTransition();
      this.fixedBody = value;
      cacheSetting('fixedBody', value);
    },
    setBodyFull(value: boolean) {
      this.bodyFull = value;
      cacheSetting('bodyFull', value);
      this.delayUpdateContentSize();
    },
    setLogoAutoSize(value: boolean) {
      disableTransition();
      this.logoAutoSize = value;
      cacheSetting('logoAutoSize', value);
    },
    setColorfulIcon(value: boolean) {
      this.colorfulIcon = value;
      cacheSetting('colorfulIcon', value);
    },
    setSideUniqueOpen(value: boolean) {
      this.sideUniqueOpen = value;
      cacheSetting('sideUniqueOpen', value);
    },
    setWeakMode(value: boolean) {
      return new Promise<void>((resolve) => {
        changeWeakMode(value);
        this.weakMode = value;
        cacheSetting('weakMode', value);
        resolve();
      });
    },
    setDarkMode(value: boolean) {
      return new Promise<void>((resolve, reject) => {
        changeTheme(this.color, value)
          .then(() => {
            this.darkMode = value;
            cacheSetting('darkMode', value);
            resolve();
          })
          .catch((e) => {
            reject(e);
          });
      });
    },
    setColor(value?: string) {
      return new Promise<void>((resolve, reject) => {
        changeTheme(value, this.darkMode)
          .then(() => {
            this.color = value;
            cacheSetting('color', value);
            resolve();
          })
          .catch((e) => {
            reject(e);
          });
      });
    },
    setHomeComponents(value: string[]) {
      this.homeComponents = value;
    },
    setKeepAliveExclude(value: string[]) {
      this.keepAliveExclude = value;
    },
    // 更新屏幕尺寸
    updateScreenSize() {
      this.screenWidth = screenWidth();
      this.screenHeight = screenHeight();
      this.updateContentSize();
    },
    // 更新内容区域尺寸
    updateContentSize() {
      this.contentWidth = contentWidth();
      this.contentHeight = contentHeight();
    },
    // 延时更新内容区域尺寸
    delayUpdateContentSize(delay?: number) {
      updateContentSizeTimer && clearTimeout(updateContentSizeTimer);
      updateContentSizeTimer = setTimeout(() => {
        this.updateContentSize();
      }, delay ?? 100) as unknown as number;
    },
    // 重置配置
    resetSetting() {
      return new Promise<void>((resolve, reject) => {
        disableTransition();
        this.showTabs = DEFAULT_STATE.showTabs;
        this.showFooter = DEFAULT_STATE.showFooter;
        this.headStyle = DEFAULT_STATE.headStyle;
        this.sideStyle = DEFAULT_STATE.sideStyle;
        this.layoutStyle = DEFAULT_STATE.layoutStyle;
        this.sideMenuStyle = DEFAULT_STATE.sideMenuStyle;
        this.tabStyle = DEFAULT_STATE.tabStyle;
        this.fixedHeader = DEFAULT_STATE.fixedHeader;
        this.fixedSidebar = DEFAULT_STATE.fixedSidebar;
        this.fixedBody = DEFAULT_STATE.fixedBody;
        this.bodyFull = DEFAULT_STATE.bodyFull;
        this.logoAutoSize = DEFAULT_STATE.logoAutoSize;
        this.colorfulIcon = DEFAULT_STATE.colorfulIcon;
        this.sideUniqueOpen = DEFAULT_STATE.sideUniqueOpen;
        this.weakMode = DEFAULT_STATE.weakMode;
        this.darkMode = DEFAULT_STATE.darkMode;
        this.color = DEFAULT_STATE.color;
        localStorage.removeItem(THEME_STORE_NAME);
        changeWeakMode(this.weakMode);
        changeTheme(this.color, this.darkMode)
          .then(() => {
            resolve();
          })
          .catch((e) => {
            reject(e);
          });
      });
    },
    // 恢复主题
    recoverTheme() {
      // 恢复色弱模式
      if (this.weakMode) {
        changeWeakMode(true);
      }
      // 恢复主题色
      if (this.color || this.darkMode) {
        changeTheme(this.color, this.darkMode).catch((e) => {
          console.error(e);
        });
      }
    },
    // 添加页签
    tabAdd(data: TabItem | TabItem[]) {
      if (Array.isArray(data)) {
        data.forEach((d) => {
          this.tabAdd(d);
        });
        return;
      }
      const i = this.tabs.findIndex((d) => d.key === data.key);
      if (i === -1) {
        this.setTabs(this.tabs.concat([data]));
      } else if (data.fullPath !== this.tabs[i].fullPath) {
        this.setTabs(
          this.tabs
            .slice(0, i)
            .concat([data])
            .concat(this.tabs.slice(i + 1))
        );
      }
    },
    // 关闭页签
    tabRemove(key: string) {
      return new Promise<TabRemoveResult>((resolve) => {
        let index = -1;
        let lastIndex = -1;
        let last: TabItem | undefined;
        let lastPath: string | undefined;
        for (let i = 0; i < this.tabs.length; i++) {
          const t = this.tabs[i];
          if (t.closable && (t.key === key || t.fullPath === key)) {
            index = i;
            break;
          }
          lastIndex = i;
          last = this.tabs[i];
          lastPath = last.fullPath;
        }
        this.setTabs(this.tabs.filter((_d, i) => i !== index));
        resolve({ lastIndex, lastPath, last });
      });
    },
    // 关闭全部页签
    tabRemoveAll(active?: string) {
      return new Promise<boolean>((resolve) => {
        const tab = this.tabs.find((d) => d.key === active);
        const stay = active ? !!(tab && tab.closable === false) : false;
        this.setTabs(this.tabs.filter((d) => !d.closable));
        resolve(stay);
      });
    },
    // 关闭左侧页签
    tabRemoveLeft(key: string) {
      for (let i = 0; i < this.tabs.length; i++) {
        if (this.tabs[i].key === key) {
          this.setTabs(
            this.tabs
              .filter((d, j) => !d.closable && j < i)
              .concat(this.tabs.slice(i))
          );
          break;
        }
      }
    },
    // 关闭右侧页签
    tabRemoveRight(key: string) {
      for (let i = 0; i < this.tabs.length; i++) {
        if (this.tabs[i].key === key) {
          this.setTabs(
            this.tabs
              .slice(0, i + 1)
              .concat(this.tabs.filter((d, j) => !d.closable && j > i))
          );
          break;
        }
      }
    },
    // 关闭其它页签
    tabRemoveOther(key: string) {
      this.setTabs(this.tabs.filter((d) => !d.closable || d.key === key));
    },
    // 修改页签
    tabSetItem(data: TabItem) {
      let i = -1;
      if (data.key) {
        i = this.tabs.findIndex((d) => d.key === data.key);
      } else if (data.fullPath) {
        i = this.tabs.findIndex((d) => d.fullPath === data.fullPath);
      } else if (data.path) {
        i = this.tabs.findIndex((d) => d.path === data.path);
      }
      if (i !== -1) {
        const item = Object.assign({}, this.tabs[i]);
        if (data.title) {
          item.title = data.title;
        }
        if (typeof data.closable === 'boolean') {
          item.closable = data.closable;
        }
        if (data.components) {
          item.components = data.components;
        }
        this.setTabs(
          this.tabs
            .slice(0, i)
            .concat([item])
            .concat(this.tabs.slice(i + 1))
        );
      }
    }
  }
});

// 主题State类型
export interface ThemeState {
  tabs: TabItem[];
  collapse: boolean;
  sideNavCollapse: boolean;
  bodyFullscreen: boolean;
  showTabs: boolean;
  showFooter: boolean;
  headStyle: HeadStyleType;
  sideStyle: SideStyleType;
  layoutStyle: LayoutStyleType;
  sideMenuStyle: SideMenuStyleType;
  tabStyle: TabStyleType;
  fixedHeader: boolean;
  fixedSidebar: boolean;
  fixedBody: boolean;
  bodyFull: boolean;
  logoAutoSize: boolean;
  colorfulIcon: boolean;
  sideUniqueOpen: boolean;
  weakMode: boolean;
  darkMode: boolean;
  color?: string | null;
  homeComponents: string[];
  keepAliveExclude: string[];
  screenWidth: number;
  screenHeight: number;
  contentWidth: number;
  contentHeight: number;
}

// 关闭页签返回类型
export interface TabRemoveResult {
  lastIndex: number;
  lastPath?: string;
  last?: TabItem;
}
