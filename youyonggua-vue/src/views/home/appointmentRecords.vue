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
								<a-tab-pane key="ziliao" tab="预约记录">
                                    <a-table :dataSource="dataList" :columns="dataSourceColumns" />
								</a-tab-pane>
							</a-tabs>
						</div>
					</div>
				</div>
			</div>
			<a-modal v-model:visible="visible" title="Basic Modal" @ok="handleOk">
				<p>Some contents...</p>
				<p>Some contents...</p>
				<p>Some contents...</p>
			  </a-modal>
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
	import {
		mysite
	} from '@/api/neirong/site';
	
	const visible = ref<boolean>(false);

    const handleOk = (e: MouseEvent) => {
      console.log(e);
      visible.value = false;
    };

    let  dataList = ref();

        const dataSourceColumns = [
          {
            title: '场地名称',
            dataIndex: 'name',
            key: 'name',
          },
          {
            title: '价格',
            dataIndex: 'price',
            key: 'price',
          },
          {
            title: '预约人数',
            dataIndex: 'num',
            key: 'num',
          },
          {
            title: '预约时间',
            dataIndex: 'orderDate',
            key: 'orderDate',
          }, {
            title: '预约状态',
            dataIndex: 'status',
            key: 'status',
          },
        ];


	onMounted(() => {
		querysitePage();
	})

	const querysitePage = () => {
		mysite().then((res)=>{
			console.log(res)
			dataList.value=res
			console.log(dataList)

		})
	}

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