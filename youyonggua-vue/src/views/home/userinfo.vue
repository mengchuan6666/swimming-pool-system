<template>
	<Header />
	<div class="ele-admin-main" style="background-color: #f1f1f1;">
		<div class="ele-admin-body">
			<div class="ele-admin-content">
				<div class="ele-admin-content-view">
					<div class="ele-body" style="margin-left: 300px;margin-right: 300px;">
						<div style="margin:10px 0px;padding: 20px 0px 20px 0px;text-align: center;">
							<div>
								<a-avatar :size="100"
									:src="loginUser.pic == null ? '/src/assets/user.png' : loginUser.pic">
								</a-avatar>
							</div>
							<div>
								<a-typography>
									<a-typography-title :level="3">{{ loginUser.nickName }}</a-typography-title>
								</a-typography>
								<a-space :size="10">
									<a-tag color="red">{{ loginUser.type }}</a-tag>
								</a-space>
							</div>
						</div>
						<div style="margin:-10px 0px 20px 0px;padding: 0px 20px 20px 20px;background-color:#FFF;">
							<a-tabs v-model:activeKey="activeKey" size="large" centered>
								<a-tab-pane key="ziliao" tab="个人资料">
									<a-descriptions title="基本信息" :column='3' size="default" bordered layout="vertical">
										<template #extra>
											<a-space>
												<a-button type="primary" @click="userEdit(loginUser)">编辑</a-button>
												<a-button type="primary" @click="passEdit(loginUser)">修改密码</a-button>
											</a-space>
										</template>
										<a-descriptions-item label="用户ID">{{ loginUser.id }}</a-descriptions-item>
										<a-descriptions-item
											label="账户余额">{{ loginUser.money }}</a-descriptions-item>
										<a-descriptions-item label="账号">{{ loginUser.username }}</a-descriptions-item>
										<a-descriptions-item label="昵称">{{ loginUser.nickname }}</a-descriptions-item>
										<a-descriptions-item
											label="性别">{{ loginUser.sex == 1 ? '男' : '女' }}</a-descriptions-item>
										<a-descriptions-item label="手机">{{ loginUser.phone }}</a-descriptions-item>
										<a-descriptions-item label="邮箱">{{ loginUser.email }}</a-descriptions-item>

									</a-descriptions>
								</a-tab-pane>
							</a-tabs>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<!-- 编辑弹窗 -->
	<userInfo v-model:visible="showEdit" :data="current" @done="reload" />
	<!-- 修改密码弹窗 -->
	<password-modal v-model:visible="passwordVisible" />
</template>

<script lang="ts" setup>
	import {
		computed,
		ref,
		onMounted,
		watch
	} from 'vue';
	import type { EleProTable } from 'ele-admin-pro';
	import type {
		DatasourceFunction,
		ColumnItem
	} from 'ele-admin-pro/es/ele-pro-table';
	import { toDateString } from 'ele-admin-pro';
	import PasswordModal from './password-modal.vue';
	import Header from './header.vue';
	import {
		useUserStore
	} from '@/store/modules/user';
	import userInfo from './userInfo/user-edit.vue';
	import type { User, UserParam } from '@/api/system/user/model';
	import {
		useRoute,
		useRouter
	} from "vue-router";
	import { message } from 'ant-design-vue';
	
	// 是否显示修改密码弹窗
	const passwordVisible = ref(false);

	// 获取用户存储
	const userStore = useUserStore();
	// 当前用户信息
	const loginUser = computed(() => userStore.info ?? {});

	const activeKey = ref("ziliao");

	const router = useRouter();

	// 当前编辑数据
	const current = ref<User>();

	// 是否显示编辑弹窗
	const showEdit = ref(false);
	
	const passEdit = (loginUser : User) => {
		passwordVisible.value = true;
	}

	const userEdit = (loginUser : User) => {
		showEdit.value = true;
		current.value = loginUser;
	}

	const reload = () => {
		router.go(0);
	}

	// 表格实例
	const tableRef = ref<InstanceType<typeof EleProTable>>();

	// 表格列配置
	const columns = ref<ColumnItem[]>([
		{
			key: 'index',
			width: 48,
			align: 'center',
			fixed: 'left',
			hideInSetting: true,
			customRender: ({ index }) => index + (tableRef.value?.tableIndex ?? 0)
		},
		{
			title: '名称',
			dataIndex: 'name',
			sorter: true
		},
		{
			title: '分类',
			dataIndex: 'type',
			key: 'type',
			sorter: true
		},
		{
			title: '价钱',
			dataIndex: 'price',
			sorter: true
		},
		{
			title: '添加时间',
			dataIndex: 'createTime',
			sorter: true,
			ellipsis: true,
			customRender: ({ text }) => toDateString(text)
		},
		{
			title: '操作',
			key: 'action',
			width: 200,
			align: 'center',
			hideInSetting: true
		}
	]);

</script>

<style scoped>


</style>