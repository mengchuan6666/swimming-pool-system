<template>
	<Header />
	<div class="ele-admin-main" style="background-color: #f1f1f1;">
		<div class="ele-admin-body">
			<div class="ele-admin-content">
				<div class="ele-admin-content-view">
					<div class="ele-body" style="margin-left: 300px;margin-right: 300px;">
						<!-- 首页轮播图 -->
						<a-carousel autoplay>
							<div><img style="width: 100%;height: 400px;" src="../../assets/image/banner_1.jpg"></div>
							<div><img style="width: 100%;height: 400px;" src="../../assets/image/banner_2.jpg"></div>
							<div><img style="width: 100%;height: 400px;" src="../../assets/image/banner_3.jpg"></div>
							<div><img style="width: 100%;height: 400px;" src="../../assets/image/banner_4.jpg"></div>
						</a-carousel>
						<div style="margin-top: 10px;">
							<a-card title="所有公告">
								<a-list :grid="{ gutter: 16, column: 4 }" :data-source="dataList" :pagination="pagination">
									<template #renderItem="{ item }">
										<a-list-item>
											<a-card hoverable :title="item.title">
												<template #extra>
													<a @click="chakan(item)">点击查看</a>
												</template>
												<a-typography-paragraph style="font-size:15px;line-height: 1.75;"
													type="secondary" :ellipsis="{ rows: 3 }"
													:content="item.content.replace(/(<([^>]+)>)/ig, '')" />
												<a-typography-text code>发布时间：{{ item.createtime }}</a-typography-text>
											</a-card>
										</a-list-item>
									</template>
								</a-list>
							</a-card>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<NoticeChakan v-model:visible="showEdit" :data="current" />
</template>

<script lang="ts" setup>
	import {
		onMounted,
		ref,
		watch,
		reactive
	} from 'vue';
	import {
		useRoute
	} from "vue-router";
	import Header from './header.vue';
	import {
		pageNotices,getData
	} from '@/api/neirong/notice';
	import type {
		Notice
	} from '@/api/neirong/notice/model';
	import NoticeChakan from './notice/notice-chakan.vue';
	import {
		useUserStore
	} from '@/store/modules/user';
	
	// 获取用户存储
	const userStore = useUserStore();

	const route = useRoute();
	const showEdit = ref(false);


	// 当前编辑数据
	const current = ref<Notice>();

	const chakan = (row ?: Notice) => {
		current.value = row;
		showEdit.value = true;
	};

	// 查询参数
	const queryParam = ref({
		'page': 1,
		'limit': 8,
		'status': "1",
	});

	const dataList = ref<Notice[]>([]);

	onMounted(() => {
		queryNoticePage(queryParam.value);
		getData()

	})

	const queryNoticePage = (queryParam : any) => {
		pageNotices(queryParam).then((res) => {
			dataList.value = res
			pagination.value.total = res.count
		})
	}

	// 分页配置
	const pagination = ref({
		total: 0,
		current: 1,
		pageSize: 8,
		// 改变每页数量时更新显示
		onChange: (current : any, size : any) => {
			// 分页点击后更新
			pagination.value.current = current;
			pagination.value.pageSize = size;
			// 赋值分页参数
			queryParam.value.page = current;
			queryParam.value.limit = size;
			pageNotices(queryParam.value).then((res) => {
				dataList.value = res.list
				pagination.value.total = res.count
			})
		}
	});
</script>

<script lang="ts">
	import {
		defineComponent
	} from 'vue';

	export default defineComponent({
		name: 'NoticeIndex'
	});
</script>