<template>
	<Header />
	<div class="ele-admin-main" style="background-color: #f1f1f1;">
		<div class="ele-admin-body">
			<div class="ele-admin-content">
				<div class="ele-admin-content-view">
					<div class="ele-body" style="margin-left: 300px;margin-right: 300px;">
						<a-card style="width: 100%;">
							<a-row type="flex" style="margin-bottom: 20px;">
								<a-col flex="auto">
									<a-card-meta>
										<template #title>
											<a-typography-title :level="3">{{ productData.name }}</a-typography-title>
										</template>
									</a-card-meta>
								</a-col>
							</a-row>
							<a-divider />
							<a-typography style="margin-top: 20px;">
								<div class="content">
									<!-- 图片 -->
									<a-image :src="productData.pic" style="width:500px" />

									<!-- 文本内容 -->
									<div style="margin-left: 20px;">

										<div>
											商品简介 <span>{{ productData.detail }}人</span>
										</div>
										<div>
											商品价格：<span class="span-class"><span
													style="font-size: 16px;">¥</span>{{ productData.price }} 元</span>
										</div>

										<div style="margin-top: 20px;">
											已售： <span>{{ productData.num }}</span>
										</div>
										<div style="margin-top: 20px;">
											总库存： <span>{{ productData.numMax }}</span>
										</div>
										<div style="margin-top: 20px;">
											上架时间： <span>{{ productData.createTime }}</span>
										</div>
										<div style="margin-top: 20px;">
											购买数量：
											  <span>
												<a-input-number id="inputNumber" v-model:value="value" :min="1" :max="productData.numMax-productData.num" />
											  </span>
										  </div>
										<a-button type="primary" style="margin-top: 20px;"
											:disabled="productData.num >= productData.numMax"
											@click="showModal">购买</a-button>


									</div>
								</div>

					
							</a-typography>
						</a-card>
					</div>
				</div>
			</div>

		</div>
		<a-modal v-model:visible="open" title="确认购买" @ok="startOrderproduct">
			<p>是否确认购买商品：{{ productData.name }},购买商品数量：{{ value }}</p>
		</a-modal>

	</div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { getproduct, orderproduct } from '@/api/neirong/product';
import { product } from '@/api/neirong/product/model';

import Header from '../header.vue';
import { useRoute } from 'vue-router';
import { message } from 'ant-design-vue';

const productData = ref<product>({});
const open = ref<boolean>(false);

// 初始化
onMounted(() => {
	let route = useRoute();
	getproduct(route.params.id).then((res) => {
		productData.value = res;
		console.log(res);

	});
});

const value=ref(1);
const showModal = () => {
	console.log(open.value)
	open.value = true;
	console.log(open.value)
}


const startOrderproduct = () => {

	let data = {};
	open.value = false;
	data.productId = productData.value.id;
	data.num = value.value;
	data.total = productData.value.price*data.num;


	orderproduct(data).then((res) => {
		message.success('预约成功')
		setTimeout(() => {
			location.reload();
		}, 1500);
	}).catch((err) => {
		message.error(err.message)
	});


}
</script>

<style scoped>
.time-content {
	border: 1px solid #E0E0E0;
	width: 42%;
	margin-left: 5%;
	background-color: green;
	float: left;
	color: #F8F8F8;
	font-size: 24px;
	margin-top: 10px;
}

.time-picker {
	border: 1px solid #E0E0E0;
	/* 设置顶部边框，颜色和宽度根据需要调整 */
	color: black;
	margin-left: 30px;
	width: 400px;
	height: 230px;
	text-align: center;
}

.hr-line {
	border-top: 1px solid #E0E0E0;
	/* 设置顶部边框，颜色和宽度根据需要调整 */
	height: 0;
	/* 设置高度为0，这样边框就是水平的 */
	margin: 10px 0;
	/* 设置上下外边距，可以调整线与周围元素的间距 */
	width: 100%;
}

.content {
	display: flex;
	flex-direction: row;
}

.span-class {

	color: red;
	font-size: 30px;
}

.header-info-avatar {
	margin-top: -90px;
	left: 30px;
	float: left;
	position: relative;
	border: 1px solid #f3f3f3;
	padding: 3px;
	background-color: #fff;
	border-radius: 4px;
}

.header-info-avatar img {
	width: 150px;
	height: 150px;
	border-radius: 4px;
}

.header-info-btn {
	margin-left: 220px;
	padding-top: 20px;
}

.header-info-btn .name {
	font-size: 22px;
	color: #333;
	float: left;
	margin-right: 5px;
}

.bbs-header-info-btn .btn1 {
	margin-left: 20px;
	margin-top: 1px;
	margin-right: 20px;
}

.bbs-header-info-btn .btn2 {
	margin-left: 20px;
	margin-top: 1px;
	margin-right: 20px;
	float: right;
}

bbs-follow-info {
	font-size: 12px;
	line-height: 30px;
	margin-left: 20px;
	float: left;
}

.bbs-follow-info span {
	margin-right: 10px;
}

.bbs-follow-info span m {
	color: #f00;
}

.header-info-desc {
	margin-left: 220px;
	float: left;
}
</style>