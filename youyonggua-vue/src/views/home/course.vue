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
							<a-card title="所有课程">
								<template #extra>
								<a-space>
								  <a-input v-model:value="name" placeholder="请输入课程名称" style="width: 400px" allowClear/>
								  <a-button type="primary" @click="search">查询</a-button>
								</a-space>
							    </template>
								<a-list :grid="{ column: 3 }" item-layout="vertical" size="large" :pagination="pagination"
									:data-source="dataList" style="margin: -10px;">
									<template #renderItem="{ item }">
										<router-link :to="'/course/'+item.id">
											<a-card hoverable style="margin: 10px;">
												<template #cover>
													<img height="240" :src="item.pic"
														style="padding: 15px 15px 0px 15px;" />
												</template>
												<a-card-meta :title="item.name" >
								                    <template #description>
													    <a-typography-paragraph style="font-size:15px;line-height: 1.75;"
													    	type="secondary" :ellipsis="{ rows: 2 }"
													    	:content="item.coachName?.replace(/(<([^>]+)>)/ig, '')" />
													    </template>
												</a-card-meta>
											</a-card>
										</router-link>
									</template>
								</a-list>
							</a-card>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>

</template>

<script lang="ts" setup>
	import {
			message
	} from 'ant-design-vue';
	import { getUserInfo } from '@/api/layout';
	import {
		onMounted,
		ref,
		watch
	} from 'vue';
	import {
		useRoute
	} from "vue-router";
	import Header from './header.vue';
	import {
		pagecourses
	} from '@/api/neirong/course';
	import type {
		course
	} from '@/api/neirong/course/model';

	const route = useRoute();
	
	const name = ref<string>('');
	
	// 查询参数
	const queryParam = ref({
		'page': 1,
		'limit': 8,
		'sort': 'createTime',
		'order': 'desc',
	});

	const dataList = ref<course[]>([]);

	onMounted(() => {
		querycoursePage(queryParam.value);
	})
	
	const querycoursePage = (queryParam : any) => {
		pagecourses(queryParam).then((res)=>{
			console.log(res)
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
		onChange: (current:any, size:any) => {
			// 分页点击后更新
			pagination.value.current = current;
			pagination.value.pageSize = size;
			// 赋值分页参数
			queryParam.value.page = current;
			queryParam.value.limit = size;
			pagecourses(queryParam.value).then((res)=>{
				dataList.value = res.list
				pagination.value.total = res.count
			})
		}
	});
	
	const search = () =>{
		queryParam.value.name = name.value;
		pagecourses(queryParam.value).then((res)=>{
			dataList.value = res
			pagination.value.total = res.count
		})
	}
</script>

<script lang="ts">
	import {
		defineComponent
	} from 'vue';

	export default defineComponent({
		name: 'courseIndex'
	});
</script>
