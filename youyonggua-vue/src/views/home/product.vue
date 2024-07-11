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
						<div>
							<a-card title="商品列表">
								<a-list item-layout="vertical" size="large" :pagination="pagination"
									:data-source="dataList">
									<template #renderItem="{ item }">
										<a-list-item key="item.name">
											<template #actions>
												<a-tag color="pink">发布时间：{{ item.createTime }}</a-tag>
												<a-tag color="red">价格：{{ item.price }}</a-tag>
												<a-tag color="green">已售：{{ item.num }}</a-tag>
												<a-tag color="green">总库存：{{ item.numMax }}</a-tag>
											</template>
											<template #extra>
												<a-image :width="272" style="margin-top: 30px;"
													:src="item.pic" />
											</template>
											<router-link :to="'/product/'+item.id" style="color: black;">
												<a-typography-title :level="3">{{ item.name }}</a-typography-title>
												<a-typography-paragraph style="font-size:15px;line-height: 1.75;"
										 		type="secondary" :ellipsis="{ rows: 5 }"
													:content="item.detail?.replace(/(<([^>]+)>)/ig, '')" />
											</router-link>
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
    <!-- 编辑弹窗 -->
    <productEdit v-model:visible="showEdit" />

</template>

<script lang="ts" setup>
	import {
		onMounted,
		ref,
		computed
	} from 'vue';
	import {
		useRoute
	} from "vue-router";
	import Header from './header.vue';
	import {
		pageproducts
	} from '@/api/neirong/product';
	import type {
		product
	} from '@/api/neirong/product/model';


	const route = useRoute();
	
	const showEdit = ref(false);
	
	
	const addproduct = () =>{
		showEdit.value = true;
	}
	
	// 查询参数
	const queryParam = ref({
		'page': 1,
		'limit': 8,
		'status': 1,
	});

	const dataList = ref<product[]>([]);

	onMounted(() => {
		queryproductPage(queryParam.value);
	})
	
	const queryproductPage = (queryParam : any) => {
		pageproducts(queryParam).then((res)=>{
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
			pageproducts(queryParam.value).then((res)=>{
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
		name: 'productIndex'
	});
</script>
