<template>
	<div :class="[
      'login-wrapper',
      ['', 'login-form-right', 'login-form-left'][direction]
    ]">
		<a-form class="login-form ele-bg-white">
			<h4>{{ t('login.title') }}</h4>
			<a-form-item v-bind="validateInfos.username">
				<a-input allow-clear size="large" v-model:value="form.username" :placeholder="t('login.username')">
					<template #prefix>
						<user-outlined />
					</template>
				</a-input>
			</a-form-item>
			<a-form-item v-bind="validateInfos.password">
				<a-input-password size="large" v-model:value="form.password" :placeholder="t('login.password')">
					<template #prefix>
						<lock-outlined />
					</template>
				</a-input-password>
			</a-form-item>
			<a-form-item label="菜单类型" v-bind="validateInfos.type">
			  <a-radio-group
			    v-model:value="form.type"
			  >
			    <a-radio value="游客用户">游客用户</a-radio>
			  </a-radio-group>

			</a-form-item>
			<a-form-item v-bind="validateInfos.code">
				<div class="login-input-group">
					<a-input allow-clear size="large" v-model:value="form.code" :placeholder="t('login.code')">
						<template #prefix>
							<safety-certificate-outlined />
						</template>
					</a-input>
					<a-button class="login-captcha" @click="changeCaptcha">
						<img v-if="captcha" :src="captcha" alt="" />
					</a-button>
				</div>
			</a-form-item>
			<a-form-item>
				<p>
					<router-link to="/regiter" class="ele-pull-right" style="line-height: 22px">
						{{ t('login.regiter') }}
					</router-link>
				</p>
				
				<p>
					<a value="管理员"  class="ele-pull-right" style="margin-top:10px;margin-right: -60px" @click="jumpAdmin">管理员后台</a>
				</p>
			</a-form-item>
			<a-form-item>
				<a-button block size="large" type="primary" :loading="loading" @click="submit">
					{{ loading ? t('login.loading') : t('login.login') }}
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
		LockOutlined,
		SafetyCertificateOutlined,
		QqOutlined,
		WechatOutlined,
		WeiboOutlined,
		GlobalOutlined
	} from '@ant-design/icons-vue';
	import { getToken } from '@/utils/token-util';
	import { login, getCaptcha } from '@/api/login';
	import {
		useUserStore
	} from '@/store/modules/user';
	import TypeSelect from './type-select.vue';

	const useForm = Form.useForm;
	const checked = true;

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
		code: '',
		type: '游客用户',
		remember: true
	});
	// 验证码base64数据
	const captcha = ref('');
	// 验证码内容, 实际项目去掉
	const text = ref('');

	// 当前显示语言
	const language = computed(() => [locale.value]);
	// 表单验证规则
	const rules = computed(() => {
		return {
			username: [
				{
					required: true,
					message: t('login.username'),
					type: 'string',
					trigger: 'blur'
				}
			],
			password: [
				{
					required: true,
					message: t('login.password'),
					type: 'string',
					trigger: 'blur'
				}
			],
			code: [
				{
					required: true,
					message: t('login.code'),
					type: 'string',
					trigger: 'blur'
				}
			],
			type: [
				{
					required: true,
					message: '请选择用户类型',
					type: 'string',
					trigger: 'blur'
				}
			]
		};
	});

	const { clearValidate, validate, validateInfos } = useForm(form, rules);

	/* 跳转到首页 */
	const goHome = () => {
		const { query } = unref(currentRoute);
		replace(String(query?.from || '/'));
	};

	const goIndex = () => {
		const { query } = unref(currentRoute);
		replace(String(query?.from || '/index'));
	};
	const jumpAdmin = () => {
		window.location.href = "http://localhost:8080"
	}

	/* 提交 */
	const submit = () => {
		validate().then(() => {
			if (form.code.toLowerCase() !== text.value) {
				message.error('验证码错误');
				return;
			}
			loading.value = true;
			login(form)
				.then((res) => {
					message.success("登录成功");
					if (res.user.type === '游客用户') {
						goIndex();
					} else {
						goHome();
					}

				})
				.catch((e : Error) => {
					message.error(e.message);
					loading.value = false;
				});
		});
	};

	/* 获取图形验证码 */
	const changeCaptcha = () => {
		// 这里演示的验证码是后端返回base64格式的形式, 如果后端地址直接是图片请参考忘记密码页面
		getCaptcha()
			.then((data) => {
				captcha.value = data.base64;
				// 实际项目后端一般会返回验证码的key而不是直接返回验证码的内容, 登录用key去验证, 你可以根据自己后端接口修改
				text.value = data.text;
				// 自动回填验证码, 实际项目去掉这个
				//form.code = data.text;
				clearValidate();
			})
			.catch((e) => {
				message.error(e.message);
			});
	};

	if (getToken()) {
		goHome();
	} else {
		changeCaptcha();
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

			&>img {
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
			top: 50%;
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