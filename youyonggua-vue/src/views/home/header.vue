<template>
	<div class="ele-admin-header" style="height: 64px;">
		<div class="ele-admin-header-nav" style="display: flex;">
			<div style="margin-left: 200px;margin-right: 250px;font-size: 20px;align-self: center;"><a
					href="/index">游泳管理系统</a></div>
			<a-menu v-model:selectedKeys="selectedKeys" mode="horizontal" theme="light"
				:style="{ lineHeight: '64px',border:0 }" @click="toPage">
				<a-menu-item key="/index">
					首页
				</a-menu-item>
				<a-menu-item key="/site">
					场地列表
				</a-menu-item>
				<a-menu-item key="/product">
					商品列表
				</a-menu-item>
				<a-menu-item key="/course">
					课程列表
				</a-menu-item>
				<a-menu-item key="/notice">
					公告查看
				</a-menu-item>
				<a-menu-item>
					<a href="http://localhost:8080/">管理员后台</a>
				</a-menu-item>
			</a-menu>
			<div style="align-self: center;margin-left: 200px;">
				<a-space>
					<a-button v-if="!loginMark" size="small" type="primary" @click="doLogin">登录</a-button>
					<a-button v-if="!loginMark" size="small" type="primary" @click="doRegiter">注册</a-button>
					<a-dropdown v-if="loginMark">
					    <a class="ant-dropdown-link" @click.prevent>
						  <a-avatar :src="loginUser.pic" />
					    </a>
					    <template #overlay>
					      <a-menu>
					        <a-menu-item>
							  <router-link to="/userInfo">
					          <a href="javascript:;">个人中心</a>
							  </router-link>
					        </a-menu-item>
							<a-menu-item>
								<router-link style="color: black;" to="/rechargeRecords">
								  <a href="javascript:;">充值/充值记录</a>
								  </router-link>
							  </a-menu-item>
							  <a-menu-item>
								  <router-link to="/appointmentRecords">
									  <a href="javascript:;">预约记录</a>
								  </router-link>
							  </a-menu-item>
							  <a-menu-item>
								<router-link to="/regRecords">
									<a href="javascript:;">报名记录</a>
								</router-link>
							</a-menu-item>
							
					        <a-menu-item>
					          <a @click="logout">退出登录</a>
					        </a-menu-item>
					      </a-menu>
					    </template>
					</a-dropdown>
				</a-space>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
	import { onMounted, ref, computed,createVNode } from 'vue';
	import { useRoute, useRouter } from "vue-router";
	import {
		useUserStore
	} from '@/store/modules/user';
	import { removeToken } from '@/utils/token-util';
	import { Modal } from 'ant-design-vue';
	import {
	  ExclamationCircleOutlined,
	} from '@ant-design/icons-vue';

	const route = useRoute();
	const router = useRouter();
	// 获取用户存储
	const userStore = useUserStore();
	// 当前用户信息
	const loginUser = computed(() => userStore.info ?? {});
	const loginMark = ref(false);
	
	onMounted(()=>{
		if(userStore.info){
			loginMark.value = true;
		}else{
			loginMark.value = false;
		}
	})

	//点击导航
	const selectedKeys = computed(() => {
		return [route.path];
	});

	//点击导航跳转对应页面
	const toPage = ({ key } : { key : string }) => {
		router.push({
			path: key
		})
	};
	
	const doLogin = () => {
		router.push({
			path: '/login'
		})
	}
	
	const doRegiter = () => {
		router.push({
			path: '/regiter'
		})
	}
	
	const logout = () => {
		// 退出登录
		Modal.confirm({
		  title: '退出登录',
		  content: '确定要退出登录吗?',
		  icon: createVNode(ExclamationCircleOutlined),
		  maskClosable: true,
		  onOk: () => {
		    removeToken();
		    location.replace('/index'); 
		  }
		});
	}
</script>

<script lang="ts">
	import { defineComponent } from 'vue';

	export default defineComponent({
		name: 'HeaderIndex'
	});
</script>