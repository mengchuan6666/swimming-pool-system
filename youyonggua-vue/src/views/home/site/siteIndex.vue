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
										<a-typography-title :level="3">{{ siteData.name }}</a-typography-title>
						    		</template>
						    	  </a-card-meta>
						      </a-col>
						    </a-row>
							<a-divider />
							<a-typography style="margin-top: 20px;">
                <div class="content">
                  <!-- 图片 -->
                    <a-image :src="siteData.pic" style="width:500px"/>

                    <!-- 文本内容 -->
                  <div style="margin-left: 20px;">
                      <div>
                        场馆状态：<span class="span-class">{{siteData.status}}</span>
                    </div>
                    <div>
                      今日已预约：<span class="span-class">{{siteData.num}}人</span>
                    </div>
                    <div >
                      场馆价格：<span class="span-class"><span style="font-size: 16px;">¥</span>{{siteData.price}} 元</span>
                    </div>
                    <div style="margin-top: 20px;">
                      场馆信息：<span>{{siteData.desc}}</span>
                    </div>
                    <div style="margin-top: 20px;">
                      场馆设备：<span>{{siteData.deviceInfo}}</span>
                    </div>
                    <div style="margin-top: 20px;">
                      预约人数：
                        <span style="float: right;">
                          <a-input style="font-size: 16px;" v-model:value="num" placeholder="选择人数"></a-input>
                        </span>
                    </div>
                    <div style="margin-top: 20px;">
                      预约日期： <a-date-picker v-model:value="orderDate" />
                    </div>
                    <div style="margin-top: 20px;">
                      预约时间：
                        <span style="float: right;">
                          <a-input style="font-size: 16px;" v-model:value="durationTime" placeholder="选择时间段"></a-input>
                        </span>
                    </div>
                    <a-button  type="primary" style="margin-top: 20px;" @click="startOrderSite">预约</a-button>
                  </div>
                  <div class="time-picker">
                    <span style="">预约时间</span>
                    <div class="hr-line"></div>
                    <div class="time-content" v-for="(item) in dateDuration" @click="durationTime=item">{{item}}</div>
                   
                  </div>
                </div>
							</a-typography>
						</a-card>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { ref,onMounted } from 'vue'
import { getsite,orderSite } from '@/api/neirong/site';
import { site } from '@/api/neirong/site/model';

import Header from '../header.vue';
import { useRoute } from 'vue-router';
import {  message } from 'ant-design-vue';

const siteData = ref<site>({});
const  orderDate= ref();
const durationTime = ref();
const num=ref();
const endTime = ref();
const dateDuration = ref([
  "8:00-10:00","10:00-12:00",
  "14:00-16:00","16:00-18:00",
  "18:00-20:00","20:00-22:00",
]);

// 初始化
onMounted (()=>{
  let route = useRoute();
  getsite(route.params.id).then((res)=>{
	  siteData.value = res;
    console.log(res);

  });
});


const StartHours = () => {
  let hours = []
      for (let i = 7; i < 18; i++) {
        hours.push(i)
      }
      
      return hours
};

const startOrderSite=()=>{
 if(orderDate.value==null){
    message.error('请选择预约日期');
    return;
  }
  if(durationTime.value==null){
    message.error('请选择预约时间段');
    return;
  }
console.log(orderDate.value)
console.log(durationTime.value)

  let data = {};
  data.orderDate=orderDate.value;
  data.orderTime=durationTime.value;
  data.siteId=siteData.value.id;
  data.num=num.value;
  orderSite(data).then((res)=>{
		message.success('预约成功，请耐心等待审核')
    setTimeout(() => {
      location.reload();
    }, 1500);
		}).catch((err)=>{
		  message.error(err.message)
		});
 
  
}
</script>

<style scoped>
.time-content{
  border: 1px solid #E0E0E0;
  width:42%;
  margin-left: 5%;
  background-color: green;
  float:left;
  color:#F8F8F8;
  font-size: 24px;
  margin-top: 10px;
}
.time-picker{
  border: 1px solid #E0E0E0; /* 设置顶部边框，颜色和宽度根据需要调整 */
  color:black;
  margin-left:30px;
  width:400px;
  height:230px;
  text-align: center;
}
.hr-line {
  border-top: 1px solid #E0E0E0; /* 设置顶部边框，颜色和宽度根据需要调整 */
  height: 0; /* 设置高度为0，这样边框就是水平的 */
  margin: 10px 0; /* 设置上下外边距，可以调整线与周围元素的间距 */
  width: 100%;
}
.content{
  display: flex;
  flex-direction:row;
}
.span-class{

  color:red;
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
.bbs-header-info-btn .btn1{
  margin-left: 20px;
  margin-top: 1px;
  margin-right: 20px;
}
.bbs-header-info-btn .btn2{
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