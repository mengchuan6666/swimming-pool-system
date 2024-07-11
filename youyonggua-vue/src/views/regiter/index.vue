<template>
  <div
    :class="[
      'login-wrapper',
      ['', 'login-form-right', 'login-form-left'][direction]
    ]"
  >
    <a-form class="login-form ele-bg-white">
      <h4>用户注册</h4>
      <a-form-item v-bind="validateInfos.username">
        <a-input
          allow-clear
          size="large"
          v-model:value="form.username"
          placeholder="请输入账号信息"
        >
          <template #prefix>
            <user-outlined />
          </template>
        </a-input>
      </a-form-item>
	  <a-form-item v-bind="validateInfos.nickname">
	    <a-input
	      allow-clear
	      size="large"
	      v-model:value="form.nickname"
	      placeholder="请输入用户昵称"
	    >
	      <template #prefix>
	        <user-outlined />
	      </template>
	    </a-input>
	  </a-form-item>
      <a-form-item v-bind="validateInfos.password">
        <a-input-password
          size="large"
          v-model:value="form.password"
          placeholder="请输入密码"
        >
          <template #prefix>
            <lock-outlined />
          </template>
        </a-input-password>
      </a-form-item>
      <a-form-item v-bind="validateInfos.passtwo">
        <a-input-password
          size="large"
          v-model:value="form.passtwo"
          placeholder="请输入确认密码"
        >
          <template #prefix>
            <lock-outlined />
          </template>
        </a-input-password>
      </a-form-item>
      <a-form-item v-bind="validateInfos.email">
        <a-input
          allow-clear
          size="large"
          v-model:value="form.email"
          placeholder="请输入邮箱信息"
        >
          <template #prefix>
            <user-outlined />
          </template>
        </a-input>
      </a-form-item>
      <a-form-item v-bind="validateInfos.phone">
        <a-input
          allow-clear
          size="large"
          v-model:value="form.phone"
          placeholder="请输入手机号"
        >
          <template #prefix>
            <user-outlined />
          </template>
        </a-input>
      </a-form-item>
    <a-form-item>
      <router-link
        to="/login"
        class="ele-pull-right"
        style="line-height: 22px"
      >
        {{ t('login.title') }}
      </router-link>
    </a-form-item>
      <a-form-item>
        <a-button
          block
          size="large"
          type="primary"
          :loading="loading"
          @click="submit"
        >
          注册
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script lang="ts" setup>
  import { ref, reactive, computed, unref } from 'vue';
  import { useI18n } from 'vue-i18n';
  import { useRouter } from 'vue-router';
  import { Form, message } from 'ant-design-vue';
  import {
    UserOutlined,
    LockOutlined
  } from '@ant-design/icons-vue';
  import { getToken } from '@/utils/token-util';
  import { regiter } from '@/api/regiter';

  const useForm = Form.useForm;

  const { currentRoute, replace } = useRouter();
  const { locale, t } = useI18n();

  // 登录框方向, 0居中, 1居右, 2居左
  const direction = ref(0);
  // 加载状态
  const loading = ref(false);
  // 表单数据
  const form = reactive({
    username: '',
    password: '',
    passtwo: '',
    nickname: '',
    email: '',
    phone: ''
  });

  // 表单验证规则
  const rules = computed(() => {
    return {
      username: [
        {
          required: true,
          message: '请输入账号信息',
          type: 'string',
          trigger: 'blur'
        }
      ],
	  nickname: [
	    {
	      required: true,
	      message: '请输入用户昵称',
	      type: 'string',
	      trigger: 'blur'
	    }
	  ],
      password: [
        {
          required: true,
          message: '请输入密码',
          type: 'string',
          trigger: 'blur'
        }
      ],
      passtwo: [
        {
          required: true,
          message: '请输入确认密码',
          type: 'string',
          trigger: 'blur'
        }
      ],
      email: [
        {
          required: true,
          message: '请输入邮箱信息',
          type: 'string',
          trigger: 'blur'
        }
      ],
      phone: [
        {
          required: true,
          message: '请输入手机号',
          type: 'string',
          trigger: 'blur'
        }
      ],
    };
  });

  const { clearValidate, validate, validateInfos } = useForm(form, rules);

  /* 跳转到首页 */
  const goHome = () => {
    const { query } = unref(currentRoute);
    replace(String(query?.from || '/'));
  };

  /* 提交 */
  const submit = () => {
    validate().then(() => {
      loading.value = true;
      regiter(form)
        .then((msg) => {
          message.success(msg);
          goHome();
        })
        .catch((e: Error) => {
          message.error(e.message);
          loading.value = false;
        });
    });
  };

  if (getToken()) {
    goHome();
  }
</script>

<style lang="less" scoped>
  /* 背景 */
  .login-wrapper {
    padding: 48px 16px 0 16px;
    position: relative;
    box-sizing: border-box;
    background-image: url('@/assets/bg-login.jpg');
    background-repeat: no-repeat;
    background-size: cover;
    min-height: 100vh;

    &:before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.2);
    }
  }

  /* 卡片 */
  .login-form {
    width: 360px;
    margin: 0 auto;
    max-width: 100%;
    padding: 0 28px;
    box-sizing: border-box;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.15);
    border-radius: 2px;
    position: relative;
    z-index: 2;

    h4 {
      padding: 22px 0;
      text-align: center;
    }
  }

  .login-form-right .login-form {
    margin: 0 15% 0 auto;
  }

  .login-form-left .login-form {
    margin: 0 auto 0 15%;
  }

  /* 验证码 */
  .login-input-group {
    display: flex;
    align-items: center;

    :deep(.ant-input-affix-wrapper) {
      flex: 1;
    }

    .login-captcha {
      width: 102px;
      height: 40px;
      margin-left: 10px;
      padding: 0;

      & > img {
        width: 100%;
        height: 100%;
      }
    }
  }

  /* 第三方登录图标 */
  .login-oauth-icon {
    color: #fff;
    padding: 5px;
    margin: 0 12px;
    font-size: 18px;
    border-radius: 50%;
    cursor: pointer;
  }

  /* 底部版权 */
  .login-copyright {
    color: #eee;
    text-align: center;
    padding: 48px 0 22px 0;
    position: relative;
    z-index: 1;
  }

  /* 响应式 */
  @media screen and (min-height: 640px) {
    .login-wrapper {
      padding-top: 0;
    }

    .login-form {
      position: absolute;
      top: 40%;
      left: 50%;
      transform: translateX(-50%);
      margin-top: -230px;
    }

    .login-form-right .login-form,
    .login-form-left .login-form {
      left: auto;
      right: 15%;
      transform: translateX(0);
      margin: -230px auto auto auto;
    }

    .login-form-left .login-form {
      right: auto;
      left: 15%;
    }

    .login-copyright {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
    }
  }

  @media screen and (max-width: 768px) {
    .login-form-right .login-form,
    .login-form-left .login-form {
      left: 50%;
      right: auto;
      margin-left: 0;
      margin-right: auto;
      transform: translateX(-50%);
    }
  }
</style>
