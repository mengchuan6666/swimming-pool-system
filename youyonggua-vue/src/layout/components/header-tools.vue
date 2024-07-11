<!-- 顶栏右侧区域 -->
<template>
  <div class="ele-admin-header-tool">
    <div
      class="ele-admin-header-tool-item hidden-sm-and-down"
      @click="toggleFullscreen"
    >
      <fullscreen-exit-outlined v-if="fullscreen" />
      <fullscreen-outlined v-else />
    </div>
    <!-- 用户信息 -->
    <div class="ele-admin-header-tool-item">
      <a-dropdown
        placement="bottomCenter"
        :overlay-style="{ minWidth: '120px' }"
      >
        <div class="ele-admin-header-avatar">
          <a-avatar :src="loginUser.avatar" />
          <span class="hidden-sm-and-down">{{ loginUser.nickname }}</span>
          <down-outlined style="margin-left: 6px" />
        </div>
        <template #overlay>
          <a-menu :selectable="false" @click="onUserDropClick">
            <a-menu-item key="password">
              <div class="ele-cell">
                <key-outlined />
                <div class="ele-cell-content">
                  {{ t('layout.header.password') }}
                </div>
              </div>
            </a-menu-item>
            <a-menu-divider />
            <a-menu-item key="logout">
              <div class="ele-cell">
                <logout-outlined />
                <div class="ele-cell-content">
                  {{ t('layout.header.logout') }}
                </div>
              </div>
            </a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
    </div>
  </div>
  <!-- 修改密码弹窗 -->
  <password-modal v-model:visible="passwordVisible" />
  <!-- 主题设置抽屉 -->
  <setting-drawer v-model:visible="settingVisible" />
</template>

<script lang="ts" setup>
  import { computed, createVNode, ref } from 'vue';
  import { useRouter } from 'vue-router';
  import { useI18n } from 'vue-i18n';
  import { Modal } from 'ant-design-vue';
  import {
    DownOutlined,
    MoreOutlined,
    UserOutlined,
    KeyOutlined,
    LogoutOutlined,
    ExclamationCircleOutlined,
    FullscreenOutlined,
    FullscreenExitOutlined,
    GlobalOutlined
  } from '@ant-design/icons-vue';
  import HeaderNotice from './header-notice.vue';
  import PasswordModal from './password-modal.vue';
  import SettingDrawer from './setting-drawer.vue';
  import { useUserStore } from '@/store/modules/user';
  import { removeToken } from '@/utils/token-util';
  import { I18N_CACHE_NAME } from '@/config/setting';

  const emit = defineEmits<{
    (e: 'fullscreen'): void;
  }>();

  defineProps<{
    // 是否是全屏
    fullscreen: boolean;
  }>();

  const { push } = useRouter();
  const { locale, t } = useI18n();
  const userStore = useUserStore();

  // 是否显示修改密码弹窗
  const passwordVisible = ref(false);

  // 是否显示主题设置抽屉
  const settingVisible = ref(false);

  // 当前用户信息
  const loginUser = computed(() => userStore.info ?? {});

  // 当前显示语言
  const language = computed(() => [locale.value]);

  // 用户信息下拉点击
  const onUserDropClick = ({ key }) => {
    if (key === 'password') {
      passwordVisible.value = true;
    } else if (key === 'profile') {
      push('/user/profile');
    } else if (key === 'logout') {
      // 退出登录
      Modal.confirm({
        title: t('layout.logout.title'),
        content: t('layout.logout.message'),
        icon: createVNode(ExclamationCircleOutlined),
        maskClosable: true,
        onOk: () => {
          removeToken();
          location.replace('/login'); // 这样跳转避免再次登录重复注册动态路由
        }
      });
    }
  };

  // 切换全屏
  const toggleFullscreen = () => {
    emit('fullscreen');
  };

  // 打开主题设置抽屉
  const openSetting = () => {
    settingVisible.value = true;
  };

  // 切换语言
  const changeLanguage = ({ key }) => {
    locale.value = key;
    localStorage.setItem(I18N_CACHE_NAME, key);
  };
</script>
