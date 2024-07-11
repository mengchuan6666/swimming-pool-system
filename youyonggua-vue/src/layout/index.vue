<template>
  <ele-pro-layout
    :menus="menus"
    :tabs="tabs"
    :collapse="collapse"
    :side-nav-collapse="sideNavCollapse"
    :body-fullscreen="bodyFullscreen"
    :show-tabs="showTabs"
    :show-footer="showFooter"
    :head-style="headStyle"
    :side-style="sideStyle"
    :layout-style="layoutStyle"
    :side-menu-style="sideMenuStyle"
    :tab-style="tabStyle"
    :fixed-header="fixedHeader"
    :fixed-sidebar="fixedSidebar"
    :fixed-body="fixedBody"
    :body-full="bodyFull"
    :logo-auto-size="logoAutoSize"
    :colorful-icon="colorfulIcon"
    :side-unique-open="sideUniqueOpen"
    :project-name="projectName"
    :hide-footers="HIDE_FOOTERS"
    :hide-sidebars="HIDE_SIDEBARS"
    :repeatable-tabs="REPEATABLE_TABS"
    :home-title="homeTitle"
    :locale="locale"
    :i18n="i18n"
    @update:collapse="updateCollapse"
    @update:side-nav-collapse="updateSideNavCollapse"
    @update:body-fullscreen="updateBodyFullscreen"
    @tab-add="addPageTab"
    @tab-remove="removePageTab"
    @tab-remove-all="removeAllPageTab"
    @tab-remove-left="removeLeftPageTab"
    @tab-remove-right="removeRightPageTab"
    @tab-remove-other="removeOtherPageTab"
    @reload-page="reloadPageTab"
    @logo-click="onLogoClick"
    @screen-size-change="screenSizeChange"
    @set-home-components="setHomeComponents"
  >
    <!-- 路由出口 -->
    <router-layout />
    <!-- logo图标 -->
    <template #logo>
      <img src="/src/assets/xingguang.svg" alt="logo" />
    </template>
    <!-- 顶栏右侧区域 -->
    <template #right>
      <header-tools :fullscreen="fullscreen" @fullscreen="onFullscreen" />
    </template>
    <!-- 全局页脚 -->
    <template #footer>
      <page-footer />
    </template>
    <!-- 菜单图标 -->
    <template #icon="{ icon }">
      <component :is="icon" class="ant-menu-item-icon" />
    </template>
    <!-- 自定义菜单标题增加徽章、小红点 -->
    <template #title="{ title, item }">
      <span>{{ title }}</span>
      <div v-if="item.meta && item.meta.badge" class="ele-menu-badge">
        <a-badge
          :count="item.meta.badge"
          :number-style="{ background: item.meta.badgeColor as string }"
        />
      </div>
    </template>
    <template #top-title="{ title, item }">
      <span>{{ title }}</span>
      <div v-if="item.meta && item.meta.badge" class="ele-menu-badge">
        <a-badge
          :count="item.meta.badge"
          :number-style="{ background: item.meta.badgeColor as string }"
        />
      </div>
    </template>
    <template #nav-title="{ title, item }">
      <span>{{ title }}</span>
      <div v-if="item.meta && item.meta.badge" class="ele-menu-badge">
        <a-badge
          :count="item.meta.badge"
          :number-style="{ background: item.meta.badgeColor as string }"
        />
      </div>
    </template>
  </ele-pro-layout>
</template>

<script lang="ts" setup>
  import { ref, computed } from 'vue';
  import { useRouter } from 'vue-router';
  import { storeToRefs } from 'pinia';
  import { useI18n } from 'vue-i18n';
  import { message } from 'ant-design-vue';
  import { toggleFullscreen, isFullscreen } from 'ele-admin-pro';
  import { useUserStore } from '@/store/modules/user';
  import { useThemeStore } from '@/store/modules/theme';
  import RouterLayout from '@/components/RouterLayout/index.vue';
  import HeaderTools from './components/header-tools.vue';
  import PageFooter from './components/page-footer.vue';
  import {
    HIDE_SIDEBARS,
    HIDE_FOOTERS,
    REPEATABLE_TABS,
    HOME_TITLE
  } from '@/config/setting';
  import {
    addPageTab,
    removePageTab,
    removeAllPageTab,
    removeLeftPageTab,
    removeRightPageTab,
    removeOtherPageTab,
    reloadPageTab,
    setHomeComponents
  } from '@/utils/page-tab-util';

  const { push } = useRouter();
  const { t, locale } = useI18n();
  const userStore = useUserStore();
  const themeStore = useThemeStore();

  // 项目名
  const projectName = import.meta.env.VITE_APP_NAME as string;

  // 是否全屏
  const fullscreen = ref(false);

  // 主页标题
  const homeTitle = computed(() => {
    return HOME_TITLE ?? t('layout.home');
  });

  // 菜单数据
  const { menus } = storeToRefs(userStore);

  // 布局风格
  const {
    tabs,
    collapse,
    sideNavCollapse,
    bodyFullscreen,
    showTabs,
    showFooter,
    headStyle,
    sideStyle,
    layoutStyle,
    sideMenuStyle,
    tabStyle,
    fixedHeader,
    fixedSidebar,
    fixedBody,
    bodyFull,
    logoAutoSize,
    colorfulIcon,
    sideUniqueOpen
  } = storeToRefs(themeStore);

  const updateCollapse = (value: boolean) => {
    themeStore.setCollapse(value);
  };

  const updateSideNavCollapse = (value: boolean) => {
    themeStore.setSideNavCollapse(value);
  };

  const updateBodyFullscreen = (value: boolean) => {
    themeStore.setBodyFullscreen(value);
  };

  const onLogoClick = (isHome: boolean) => {
    isHome || push('/');
  };

  const screenSizeChange = () => {
    themeStore.updateScreenSize();
    fullscreen.value = isFullscreen();
  };

  const onFullscreen = () => {
    try {
      fullscreen.value = toggleFullscreen();
    } catch (e) {
      message.error('您的浏览器不支持全屏模式');
    }
  };

  /* 菜单标题国际化 */
  const i18n = (_path: string, key: string) => {
    const k = 'route.' + key + '._name';
    const title = t(k);
    return title === k ? undefined : title;
  };
</script>

<script lang="ts">
  import * as MenuIcons from './menu-icons';

  export default {
    name: 'EleLayout',
    components: MenuIcons
  };
</script>

<style lang="less">
  // 侧栏菜单徽章样式，定位在右侧垂直居中并调小尺寸
  .ele-menu-badge {
    position: absolute;
    top: 50%;
    right: 14px;
    line-height: 1;
    margin-top: -9px;
    font-size: 0;

    .ant-badge-count {
      height: 18px;
      line-height: 18px;
      border-radius: 9px;
      box-shadow: none;
      min-width: 18px;
      padding: 0 4px;
    }

    .ant-scroll-number-only {
      height: 18px;

      & > p.ant-scroll-number-only-unit {
        height: 18px;
      }
    }
  }

  // 父级菜单标题中右侧多定位一点，避免与箭头重合
  .ant-menu-submenu-title > .ant-menu-title-content .ele-menu-badge {
    right: 36px;
  }

  // 折叠悬浮中样式调整
  .ant-menu-submenu-popup {
    .ant-menu-submenu-title > .ant-menu-title-content .ele-menu-badge {
      right: 30px;
    }
  }

  // 顶栏菜单标题中样式调整
  .ele-admin-header-nav > .ant-menu {
    & > .ant-menu-item,
    & > .ant-menu-submenu > .ant-menu-submenu-title {
      & > .ant-menu-title-content .ele-menu-badge {
        position: static;
        right: auto;
        top: auto;
        display: inline-block;
        vertical-align: 5px;
        margin: 0 0 0 4px;
      }
    }
  }

  // 双侧栏时一级侧栏菜单中样式调整，定位在右上角
  .ele-admin-sidebar-nav-menu > .ant-menu {
    & > .ant-menu-item,
    & > .ant-menu-submenu > .ant-menu-submenu-title {
      & > .ant-menu-title-content .ele-menu-badge {
        top: 8px;
        right: 6px;
        margin: 0;
      }
    }
  }

  // 双侧栏时一级侧栏菜单折叠后样式调整
  .ele-admin-nav-collapse .ele-admin-sidebar-nav-menu > .ant-menu {
    & > .ant-menu-item,
    & > .ant-menu-submenu > .ant-menu-submenu-title {
      & > .ant-menu-title-content .ele-menu-badge {
        top: 4px;
        right: 0;
      }
    }
  }

  // 菜单折叠后在tooltip中不显示徽章
  .ant-tooltip-inner .ele-menu-badge {
    display: none;
  }
</style>
