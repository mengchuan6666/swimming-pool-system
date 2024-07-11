<!-- 主题设置抽屉 -->
<template>
  <a-drawer
    :width="280"
    :visible="visible"
    :body-style="{ padding: 0 }"
    :header-style="{
      position: 'absolute',
      top: '16px',
      right: 0,
      padding: 0,
      background: 'none'
    }"
    :z-index="1001"
    @update:visible="updateVisible"
  >
    <div :class="['ele-setting-wrapper', { 'ele-setting-dark': darkMode }]">
      <!-- 侧栏风格 -->
      <div class="ele-setting-title">{{ t('layout.setting.title') }}</div>
      <div class="ele-setting-theme ele-text-primary">
        <a-tooltip :title="t('layout.setting.sideStyles.dark')">
          <div
            class="ele-bg-base ele-side-dark"
            @click="updateSideStyle('dark')"
          >
            <check-outlined v-if="sideStyle === 'dark'" />
          </div>
        </a-tooltip>
        <a-tooltip :title="t('layout.setting.sideStyles.light')">
          <div class="ele-bg-base" @click="updateSideStyle('light')">
            <check-outlined v-if="sideStyle === 'light'" />
          </div>
        </a-tooltip>
      </div>
      <!-- 顶栏风格 -->
      <div class="ele-setting-theme ele-text-primary">
        <a-tooltip :title="t('layout.setting.headStyles.light')">
          <div
            class="ele-bg-base ele-head-light"
            @click="updateHeadStyle('light')"
          >
            <check-outlined v-if="headStyle === 'light'" />
          </div>
        </a-tooltip>
        <a-tooltip :title="t('layout.setting.headStyles.dark')">
          <div
            class="ele-bg-base ele-head-dark"
            @click="updateHeadStyle('dark')"
          >
            <check-outlined v-if="headStyle === 'dark'" />
          </div>
        </a-tooltip>
        <a-tooltip :title="t('layout.setting.headStyles.primary')">
          <div
            class="ele-bg-base ele-head-primary"
            @click="updateHeadStyle('primary')"
          >
            <div class="ele-bg-primary"></div>
            <check-outlined v-if="headStyle === 'primary'" />
          </div>
        </a-tooltip>
      </div>
      <!-- 主题色 -->
      <div class="ele-setting-colors">
        <div
          v-for="item in themes"
          :key="item.name"
          :style="{ 'background-color': item.color || item.value }"
          class="ele-setting-color-item"
          @click="updateColor(item.value)"
        >
          <check-outlined v-if="item.value ? item.value === color : !color" />
          <a-tooltip :title="t('layout.setting.colors.' + item.name)">
            <div class="ele-setting-color-tooltip"></div>
          </a-tooltip>
        </div>
        <!-- 颜色选择器 -->
        <ele-color-picker
          :value="colorValue"
          :predefine="predefineColors"
          custom-class="ele-setting-color-picker"
          @change="updateColor"
        />
      </div>
      <!-- 暗黑模式 -->
      <div class="ele-setting-item">
        <div class="setting-item-title">{{ t('layout.setting.darkMode') }}</div>
        <div class="setting-item-control">
          <a-switch size="small" :checked="darkMode" @change="updateDarkMode" />
        </div>
      </div>
      <a-divider />
      <!-- 导航布局 -->
      <div class="ele-setting-title ele-text-secondary">
        {{ t('layout.setting.layoutStyle') }}
      </div>
      <div class="ele-setting-theme ele-text-primary">
        <a-tooltip :title="t('layout.setting.layoutStyles.side')">
          <div
            class="ele-bg-base ele-side-dark"
            @click="updateLayoutStyle('side')"
          >
            <check-outlined v-if="layoutStyle === 'side'" />
          </div>
        </a-tooltip>
        <a-tooltip :title="t('layout.setting.layoutStyles.top')">
          <div
            class="ele-bg-base ele-head-dark"
            @click="updateLayoutStyle('top')"
          >
            <check-outlined v-if="layoutStyle === 'top'" />
          </div>
        </a-tooltip>
        <a-tooltip :title="t('layout.setting.layoutStyles.mix')">
          <div
            class="ele-bg-base ele-layout-mix"
            @click="updateLayoutStyle('mix')"
          >
            <check-outlined v-if="layoutStyle === 'mix'" />
          </div>
        </a-tooltip>
      </div>
      <!-- 侧栏菜单布局 -->
      <div class="ele-setting-item">
        <div class="setting-item-title">
          {{ t('layout.setting.sideMenuStyle') }}
        </div>
        <div class="setting-item-control">
          <a-switch
            size="small"
            :checked="sideMenuStyle === 'mix'"
            @change="updateSideMenuStyle"
          />
        </div>
      </div>
      <!-- 内容区域铺满 -->
      <div class="ele-setting-item">
        <div class="setting-item-title">{{ t('layout.setting.bodyFull') }}</div>
        <div class="setting-item-control">
          <a-switch size="small" :checked="bodyFull" @change="updateBodyFull" />
        </div>
      </div>
      <a-divider />
      <!-- 固定顶栏 -->
      <div class="ele-setting-title ele-text-secondary">
        {{ t('layout.setting.other') }}
      </div>
      <div class="ele-setting-item">
        <div class="setting-item-title">
          {{ t('layout.setting.fixedHeader') }}
        </div>
        <div class="setting-item-control">
          <a-switch
            size="small"
            :checked="fixedHeader"
            @change="updateFixedHeader"
          />
        </div>
      </div>
      <!-- 固定侧栏 -->
      <div class="ele-setting-item">
        <div class="setting-item-title">
          {{ t('layout.setting.fixedSidebar') }}
        </div>
        <div class="setting-item-control">
          <a-switch
            size="small"
            :checked="fixedSidebar"
            @change="updateFixedSidebar"
          />
        </div>
      </div>
      <!-- 固定主体 -->
      <div class="ele-setting-item">
        <div class="setting-item-title">{{
          t('layout.setting.fixedBody')
        }}</div>
        <div class="setting-item-control">
          <a-switch
            size="small"
            :checked="fixedBody"
            @change="updateFixedBody"
          />
        </div>
      </div>
      <!-- LOGO自适应宽度 -->
      <div class="ele-setting-item">
        <div class="setting-item-title"
          >{{ t('layout.setting.logoAutoSize') }}
        </div>
        <div class="setting-item-control">
          <a-switch
            size="small"
            :checked="logoAutoSize"
            @change="updateLogoAutoSize"
          />
        </div>
      </div>
      <!-- 侧栏彩色图标 -->
      <div class="ele-setting-item">
        <div class="setting-item-title">
          {{ t('layout.setting.colorfulIcon') }}
        </div>
        <div class="setting-item-control">
          <a-switch
            size="small"
            :checked="colorfulIcon"
            @change="updateColorfulIcon"
          />
        </div>
      </div>
      <!-- 侧栏排他展开 -->
      <div class="ele-setting-item">
        <div class="setting-item-title">
          {{ t('layout.setting.sideUniqueOpen') }}
        </div>
        <div class="setting-item-control">
          <a-switch
            size="small"
            :checked="sideUniqueOpen"
            @change="updateSideUniqueOpen"
          />
        </div>
      </div>
      <!-- 全局页脚 -->
      <div class="ele-setting-item">
        <div class="setting-item-title">
          {{ t('layout.setting.showFooter') }}
        </div>
        <div class="setting-item-control">
          <a-switch
            size="small"
            :checked="showFooter"
            @change="updateShowFooter"
          />
        </div>
      </div>
      <!-- 色弱模式 -->
      <div class="ele-setting-item">
        <div class="setting-item-title">{{ t('layout.setting.weakMode') }}</div>
        <div class="setting-item-control">
          <a-switch size="small" :checked="weakMode" @change="updateWeakMode" />
        </div>
      </div>
      <!-- 页签 -->
      <div class="ele-setting-item">
        <div class="setting-item-title">{{ t('layout.setting.showTabs') }}</div>
        <div class="setting-item-control">
          <a-switch size="small" :checked="showTabs" @change="updateShowTabs" />
        </div>
      </div>
      <!-- 页签风格 -->
      <div class="ele-setting-item">
        <div class="setting-item-title">{{ t('layout.setting.tabStyle') }}</div>
        <div class="setting-item-control">
          <a-select
            size="small"
            :value="tabStyle"
            style="width: 80px"
            @change="updateTabStyle"
          >
            <a-select-option value="default">
              {{ t('layout.setting.tabStyles.default') }}
            </a-select-option>
            <a-select-option value="dot">
              {{ t('layout.setting.tabStyles.dot') }}
            </a-select-option>
            <a-select-option value="card">
              {{ t('layout.setting.tabStyles.card') }}
            </a-select-option>
          </a-select>
        </div>
      </div>
      <!-- message -->
      <a-divider />
      <a-alert show-icon type="warning" :message="t('layout.setting.tips')">
        <template #icon>
          <sound-outlined />
        </template>
      </a-alert>
      <!-- reset -->
      <a-button block type="dashed" @click="resetSetting">
        {{ t('layout.setting.reset') }}
      </a-button>
    </div>
  </a-drawer>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import { message } from 'ant-design-vue';
  import { CheckOutlined, SoundOutlined } from '@ant-design/icons-vue';
  import { useThemeStore } from '@/store/modules/theme';
  import type {
    ThemeItem,
    HeadStyleType,
    SideStyleType,
    LayoutStyleType,
    TabStyleType
  } from 'ele-admin-pro';
  import { storeToRefs } from 'pinia';
  import { useI18n } from 'vue-i18n';

  const emit = defineEmits<{
    (e: 'update:visible', value: boolean): void;
  }>();

  defineProps<{
    // drawer是否显示, v-model
    visible: boolean;
  }>();

  const { t } = useI18n();
  const themeStore = useThemeStore();

  const {
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
    sideUniqueOpen,
    weakMode,
    darkMode,
    color
  } = storeToRefs(themeStore);

  // 主题列表
  const themes = ref<ThemeItem[]>([
    {
      name: 'default',
      color: '#1890ff'
    },
    {
      name: 'dust',
      value: '#5f80c7'
    },
    {
      name: 'sunset',
      value: '#faad14'
    },
    {
      name: 'volcano',
      value: '#f5686f'
    },
    {
      name: 'purple',
      value: '#9266f9'
    },
    {
      name: 'green',
      value: '#33cc99'
    },
    {
      name: 'geekblue',
      value: '#32a2d4'
    }
  ]);

  // 颜色选择器预设颜色
  const predefineColors = [
    '#f5222d',
    '#fa541c',
    '#fa8c16',
    '#faad14',
    '#a0d911',
    '#52c41a',
    '#13c2c2',
    '#2f54eb',
    '#722ed1',
    '#eb2f96'
  ];

  // 颜色选择器选中颜色
  const colorValue = ref(
    color?.value && !themes.value.some((t) => t.value === color.value)
      ? color.value
      : undefined
  );

  const updateVisible = (value: boolean) => {
    emit('update:visible', value);
  };

  const updateShowTabs = (value: boolean) => {
    themeStore.setShowTabs(value);
  };

  const updateShowFooter = (value: boolean) => {
    themeStore.setShowFooter(value);
  };

  const updateHeadStyle = (value: HeadStyleType) => {
    themeStore.setHeadStyle(value);
  };

  const updateSideStyle = (value: SideStyleType) => {
    themeStore.setSideStyle(value);
  };

  const updateLayoutStyle = (value: LayoutStyleType) => {
    themeStore.setLayoutStyle(value);
  };

  const updateSideMenuStyle = (value: boolean) => {
    themeStore.setSideMenuStyle(value ? 'mix' : 'default');
  };

  const updateTabStyle = (value: TabStyleType) => {
    themeStore.setTabStyle(value);
  };

  const updateFixedHeader = (value: boolean) => {
    themeStore.setFixedHeader(value);
  };

  const updateFixedSidebar = (value: boolean) => {
    themeStore.setFixedSidebar(value);
  };

  const updateFixedBody = (value: boolean) => {
    themeStore.setFixedBody(value);
  };

  const updateBodyFull = (value: boolean) => {
    themeStore.setBodyFull(value);
  };

  const updateLogoAutoSize = (value: boolean) => {
    themeStore.setLogoAutoSize(value);
  };

  const updateColorfulIcon = (value: boolean) => {
    themeStore.setColorfulIcon(value);
  };

  const updateSideUniqueOpen = (value: boolean) => {
    themeStore.setSideUniqueOpen(value);
  };

  const updateWeakMode = (value: boolean) => {
    themeStore.setWeakMode(value);
  };

  const updateDarkMode = (value: boolean) => {
    doWithLoading(() => themeStore.setDarkMode(value));
  };

  const updateColor = (value?: string) => {
    colorValue.value = undefined;
    doWithLoading(() => themeStore.setColor(value));
  };

  const resetSetting = () => {
    doWithLoading(() => themeStore.resetSetting());
  };

  const doWithLoading = (fun: () => Promise<void>) => {
    const hide = message.loading('正在加载主题..', 0);
    fun()
      .then(() => {
        hide();
      })
      .catch((e) => {
        hide();
        console.error(e);
        message.error('主题加载失败');
      });
  };
</script>

<style lang="less">
  .ele-setting-wrapper {
    padding: 20px 18px;

    .ele-setting-title {
      font-size: 13px;
      margin-bottom: 15px;
    }

    // 主题风格
    .ele-setting-theme > div {
      width: 52px;
      height: 36px;
      line-height: 1;
      border-radius: 3px;
      margin: 0 20px 30px 0;
      padding: 16px 0 0 26px;
      box-sizing: border-box;
      box-shadow: 0 1px 4px rgba(0, 0, 0, 0.15);
      display: inline-block;
      vertical-align: top;
      position: relative;
      overflow: hidden;
      cursor: pointer;
      transition: background-color 0.2s;

      &:before,
      &:after,
      & > .ele-bg-primary {
        content: '';
        width: 100%;
        height: 10px;
        background: #fff;
        position: absolute;
        left: 0;
        top: 0;
        transition: background-color 0.2s;
      }

      &:after {
        width: 14px;
        height: 100%;
      }

      &.ele-side-dark:after,
      &.ele-head-dark:before,
      &.ele-layout-mix:before,
      &.ele-layout-mix:after {
        background: #001529;
      }

      &.ele-head-light:before,
      &.ele-head-dark:before,
      & > .ele-bg-primary {
        z-index: 1;
      }
    }

    // 主题色选择
    .ele-setting-colors {
      color: #fff;
      margin-bottom: 20px;
    }

    .ele-setting-color-item {
      width: 20px;
      height: 20px;
      line-height: 20px;
      border-radius: 2px;
      margin: 8px 8px 0 0;
      display: inline-block;
      box-shadow: 0 1px 4px rgba(0, 0, 0, 0.15);
      vertical-align: top;
      position: relative;
      text-align: center;
      cursor: pointer;

      .ele-setting-color-tooltip {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
      }
    }

    // 主题配置项
    .ele-setting-item {
      display: flex;
      align-items: center;
      margin-bottom: 20px;

      .setting-item-title {
        flex: 1;
        line-height: 28px;
      }

      .setting-item-control {
        line-height: 1;
      }
    }

    .ant-divider {
      margin-bottom: 20px;
    }

    .ant-alert + .ant-btn {
      margin-top: 12px;
    }

    // 暗黑模式
    &.ele-setting-dark .ele-setting-theme > div {
      box-shadow: 0 1px 4px rgba(0, 0, 0, 0.55);

      &:before,
      &:after,
      & > .ele-bg-primary {
        background: #1f1f1f;
      }

      &.ele-side-dark:after,
      &.ele-head-dark:before,
      &.ele-layout-mix:before,
      &.ele-layout-mix:after {
        background: #262626;
      }
    }
  }

  /* 颜色选择器 */
  .ele-setting-color-picker.ele-color-picker-trigger {
    padding: 0;
    width: 20px;
    height: 20px;
    margin-top: 8px;
    border: none !important;
    background: none !important;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.15);

    & > .ele-color-picker-trigger-inner {
      background: none;

      &.is-empty {
        background: linear-gradient(45deg, #00dbde 5%, #fc00ff 105%);

        & + .ele-color-picker-trigger-arrow {
          display: none;
        }
      }
    }
  }
</style>
