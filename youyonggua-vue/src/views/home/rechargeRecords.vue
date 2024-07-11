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
								<a-tab-pane key="ziliao" tab="充值记录">
                                    <a-button type="primary" class="editable-add-btn" @click="showModal" style="margin-bottom: 8px">充值</a-button>
                                    <a-table :dataSource="dataList" :columns="dataSourceColumns" />
                                </a-tab-pane>
							</a-tabs>
						</div>
					</div>
				</div>
				<a-modal v-model:visible="visible" title="充值" @ok="handleOk">
					<a-input style="font-size: 16px;" v-model:value="money" placeholder="输入充值金额"></a-input>
					<span style="color:red">* 请扫码支付后，再点击确定</span>
					<img src="/src/assets/image/code.png" style="width: 300px;vertical-align:middle"/>
				  </a-modal>
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
		mycharge,charge
	} from '@/api/neirong/charge';
import { message } from 'ant-design-vue';

	let  dataList = ref();
	let  money = ref();


	const visible = ref<boolean>(false);

	const showModal = () => {
	visible.value = true;
	};

	const handleOk = () => {
		if(!money.value){
			message.error("请输入充值金额");
			visible.value = true;
			return
		}

		let data={};
		data.amount=money.value
		charge(data).then((res)=>{
			console.log(res)
			dataList.value=res
			console.log(dataList)
			money.value=null
		})

		visible.value = false;
		location.reload()
	};
	
	onMounted(() => {
		querysitePage();
	})

	const querysitePage = () => {
		mycharge().then((res)=>{
			console.log(res)
			dataList.value=res
			console.log(dataList)

		})
	}

        const dataSourceColumns = [
          {
            title: '充值金额',
            dataIndex: 'amount',
            key: 'amount',
          },
          {
            title: '充值状态',
            dataIndex: 'status',
            key: 'status',
          },
          {
            title: '开始时间',
            dataIndex: 'startTime',
            key: 'startTime',
          },
          {
            title: '结束时间',
            dataIndex: 'endTime',
            key: 'endTime',
          }
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