<template>
  <Header />
  <div class="ele-admin-main" style="background-color: #f1f1f1">
    <div class="ele-admin-body">
      <div class="ele-admin-content">
        <div class="ele-admin-content-view">
          <div class="ele-body" style="margin-left: 300px; margin-right: 300px">
            <!-- 首页轮播图 -->
            <a-carousel autoplay>
              <div
                ><img
                  style="width: 100%; height: 400px"
                  src="../../assets/image/banner_1.jpg"
              /></div>
              <div
                ><img
                  style="width: 100%; height: 400px"
                  src="../../assets/image/banner_2.jpg"
              /></div>
              <div
                ><img
                  style="width: 100%; height: 400px"
                  src="../../assets/image/banner_3.jpg"
              /></div>
              <div
                ><img
                  style="width: 100%; height: 400px"
                  src="../../assets/image/banner_4.jpg"
              /></div>
            </a-carousel>
            <div style="margin-top: 20px">
              <!-- 公告开始 -->
              <a-list :grid="{ gutter: 16, column: 4 }" :data-source="dataList">
                <template #renderItem="{ item }">
                  <a-list-item>
                    <a-card hoverable :title="item.title">
                      <template #extra>
                        <a @click="chakan(item)">点击查看</a>
                      </template>
                      <a-typography-paragraph
                        style="font-size: 15px; line-height: 1.75"
                        type="secondary"
                        :ellipsis="{ rows: 3 }"
                        :content="item.content?.replace(/(<([^>]+)>)/gi, '')"
                      />
                      <a-typography-text code
                        >发布时间：{{ item.createtime }}
                      </a-typography-text>
                    </a-card>
                  </a-list-item>
                </template>
              </a-list>
             <!-- 公告结束 -->

              <!--最新场地-->
              <div class="tuijian">
                <div class="name">最新场地</div>
                <a-list
                  :grid="{ column: 3 }"
                  item-layout="vertical"
                  size="large"
                  :data-source="dataList1"
                >
                  <template #renderItem="{ item }">
                    <router-link :to="'/site/' + item.id">
                      <a-card hoverable style="margin: 10px">
                        <template #cover>
                          <img
                            height="240"
                            :src="item.pic"
                            style="padding: 15px 15px 0px 15px"
                          />
                        </template>
                        <a-card-meta :title="item.name">
                          <template #description>
                            <a-typography-paragraph
                              style="font-size: 15px; line-height: 1.75"
                              type="secondary"
                              :ellipsis="{ rows: 2 }"
                              :content="
                                item.desc?.replace(/(<([^>]+)>)/gi, '')
                              "
                            />
                          </template>
                        </a-card-meta>
                      </a-card>
                    </router-link>
                  </template>
                </a-list>
              </div>
              <!--end最新场地-->

              <!-- 最新商品 -->
              <div>
                <a-tabs
                  v-model:activeKey="activeKeyWz"
                  @change="changeTabsTwo"
                  type="card"
                  :tabBarGutter="10"
                  :tabBarStyle="{
                    background: '#595959',
                    padding: '16px 16px 16px'
                  }"
                >
                  <a-tab-pane key="newWz" tab="最新发布">
                    <a-list
                      :grid="{ column: 4 }"
                      item-layout="vertical"
                      size="large"
                      :data-source="dataList2"
                      style="margin: -10px"
                    >
                      <template #renderItem="{ item }">
                        <router-link :to="'/product/' + item.id">
                          <a-card hoverable style="margin: 10px">
                            <template #cover>
                              <img
                                height="240"
                                :src="item.pic"
                                style="padding: 15px 15px 0px 15px"
                              />
                            </template>
                            <a-card-meta :title="item.name">
                              <template #description>
                                <a-typography-paragraph
                                  style="font-size: 15px; line-height: 1.75"
                                  type="secondary"
                                  :ellipsis="{ rows: 2 }"
                                  :content="
                                    item.detail.replace(
                                      /(<([^>]+)>)/gi,
                                      ''
                                    )
                                  "
                                />
                              </template>
                            </a-card-meta>
                          </a-card>
                        </router-link>
                      </template>
                    </a-list>
                  </a-tab-pane>
                  <template #rightExtra>
                    <a-button type="primary" danger class="tabs-extra-button">
                      <router-link to="/product"
                        >商品列表
                        <arrow-right-outlined />
                      </router-link>
                    </a-button>
                  </template>
                </a-tabs>
              </div>
              <!-- 最新商品 -->

              <!-- 最新课程 -->
              <div style="margin-top: 20px">
                <a-tabs
                  v-model:activeKey="activeKeyWz"
                  @change="changeTabsTwo"
                  type="card"
                  :tabBarGutter="10"
                  :tabBarStyle="{
                    background: '#595959',
                    padding: '16px 16px 16px'
                  }"
                >
                  <a-tab-pane key="newWz" tab="最新发布">
                    <a-list
                      :grid="{ column: 4 }"
                      item-layout="vertical"
                      size="large"
                      :data-source="dataList3"
                      style="margin: -10px"
                    >
                      <template #renderItem="{ item }">
                        <router-link :to="'/course/' + item.id">
                          <a-card hoverable style="margin: 10px">
                            <template #cover>
                              <img
                                height="240"
                                :src="item.pic"
                                style="padding: 15px 15px 0px 15px"
                              />
                            </template>
                            <a-card-meta :title="item.name">
                              <template #description>
                                <a-typography-paragraph
                                  style="font-size: 15px; line-height: 1.75"
                                  type="secondary"
                                  :ellipsis="{ rows: 2 }"
                                  :content="
                                    item.coachDesc?.replace(
                                      /(<([^>]+)>)/gi,
                                      ''
                                    )
                                  "
                                />
                              </template>
                            </a-card-meta>
                          </a-card>
                        </router-link>
                      </template>
                    </a-list>
                  </a-tab-pane>
                  <template #rightExtra>
                    <a-button type="primary" danger class="tabs-extra-button">
                      <router-link to="/course"
                        >课程列表
                        <arrow-right-outlined />
                      </router-link>
                    </a-button>
                  </template>
                </a-tabs>
              </div>
              <!-- 最新课程 -->

            </div>
            <router-layout />
          </div>
        </div>
      </div>
    </div>
  </div>
  <NoticeChakan v-model:visible="showEdit" :data="current" />
</template>

<script lang="ts" setup>
  import { onMounted, ref, computed } from 'vue';
  import Header from './header.vue';
  import { useRoute, useRouter } from 'vue-router';
  import NoticeChakan from './notice/notice-chakan.vue';

  import { pageNotices } from '@/api/neirong/notice';
  import type { Notice } from '@/api/neirong/notice/model';
  
  import { pageproducts } from '@/api/neirong/product';
  import type { product } from '@/api/neirong/product/model';

  import { pagesites} from '@/api/neirong/site';
  import type { site } from '@/api/neirong/site/model';
  import { pagecourses} from '@/api/neirong/course';
  import type { course } from '@/api/neirong/course/model';


  const route = useRoute();
  const router = useRouter();

  const showEdit = ref(false);
  // 当前编辑数据
  const current = ref<Notice>();

  const chakan = (row?: site) => {
    current.value = row;
    showEdit.value = true;
  };

  //点击导航
  const selectedKeys = computed(() => {
    return [route.path];
  });

  //点击导航跳转对应页面
  const toPage = ({ key }: { key: string }) => {
    router.push({
      path: key
    });
  };
  const dataList = ref<Notice[]>([]);

  const dataList1 = ref<site[]>([]);

  const dataList2 = ref<product[]>([]);

  const dataList3 = ref<course[]>([]);


  onMounted(() => {
    /* 获取字典数据 */
    pageNotices({
      page: 1,
      limit: 4,
      status: 1,
      sort: 'createTime',
      order: 'desc'
    }).then((list) => {
      console.log(list)
      dataList.value = list;
    });
    pageproducts({
      page: 1,
      limit: 8,
      status: 1,
      sort: 'createTime',
      order: 'desc'
    }).then((list) => {
      dataList2.value = list;
    });
    pagesites({
      page: 1,
      limit: 6,
      sort: 'createTime',
      order: 'desc'
    }).then((list) => {
      console.log(list)
      dataList1.value = list;
    });
    pagecourses({
      page: 1,
      limit: 6,
      sort: 'createTime',
      order: 'desc'
    }).then((list) => {
      console.log(list)
      dataList3.value = list;
    });
  });
</script>

<script lang="ts">
  import { defineComponent } from 'vue';
import { countdownValueType } from 'ant-design-vue/lib/statistic/utils';

  export default defineComponent({
    name: 'HomeIndex'
  });
</script>
<style scoped>
  .tuijian {
  }

  .tuijian .name {
    display: flex;
    align-items: center;
    margin: 10px 0;
    padding: 15px;
    height: 75px;
    font-size: 26px;
    background-color: #595959;
    color: #fed55f;
  }
</style>
