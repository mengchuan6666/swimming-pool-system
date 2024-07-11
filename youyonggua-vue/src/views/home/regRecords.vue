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
                                <a-tab-pane key="ziliao" tab="报名记录">
                                    <a-table :dataSource="dataList" :columns="dataSourceColumns" />
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
	} from 'vue';
	import PasswordModal from './password-modal.vue';
	import Header from './header.vue';
	import {
		useUserStore
	} from '@/store/modules/user';
	import userInfo from './userInfo/user-edit.vue';
	import type { User } from '@/api/system/user/model';
	import {
		useRouter
	} from "vue-router";
	import {
		mycourse
	} from '@/api/neirong/course';

	let  dataList = ref();
	
	onMounted(() => {
		querysitePage();
	})

	const querysitePage = () => {
		mycourse().then((res)=>{
			console.log(res)
			dataList.value=res
			console.log(dataList)

		})
	}

        const dataSourceColumns = [
          {
            title: '课程名称',
            dataIndex: 'courseName',
            key: 'courseName',
          },
          {
            title: '课程价格',
            dataIndex: 'price',
            key: 'price',
          },
          {
            title: '教练名称',
            dataIndex: 'coachName',
            key: 'coachName',
          },
          {
            title: '最大人数',
            dataIndex: 'maxNum',
            key: 'maxNum',
          }, 
          {
            title: '报名状态',
            dataIndex: 'status',
            key: 'status',
          },
        ];
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
	
	const reload = () => {
		router.go(0);
	}


</script>

<style scoped>


</style>