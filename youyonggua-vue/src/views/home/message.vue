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
            <div style="margin-top: 10px">
              <a-card title="所有留言">
                <template #extra><a @click="addMessage">新增留言</a></template>
                <a-list
                  :grid="{ gutter: 16, column: 4 }"
                  :data-source="dataList"
                  :pagination="pagination"
                >
                  <template #renderItem="{ item }">
                    <a-list-item>
                      <a-card hoverable :title="item.name">
                        <a-typography-paragraph
                          style="font-size: 15px; line-height: 1.75"
                          type="secondary"
                          :ellipsis="{ rows: 3 }"
                          :content="item.message.replace(/(<([^>]+)>)/gi, '')"
                        />
                        <a-typography-text code
                          >发布时间：{{ item.createTime }}</a-typography-text
                        >
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

  <a-modal
    v-model:visible="showMesg"
    title="新增留言"
    :maskClosable="false"
    @ok="handleOk"
  >
    <a-form :model="mesgForm" autocomplete="off">
      <a-form-item
        label="留言"
        name="message"
        :rules="[{ required: true, message: '请填写留言信息' }]"
      >
        <a-input
          v-model:value="mesgForm.message"
          placeholder="请填写留言信息"
        />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script lang="ts" setup>
  import { onMounted, ref } from 'vue';
  import Header from './header.vue';
  import { pageMesg, addMesg } from '@/api/neirong/message';
  import type { Notice } from '@/api/neirong/notice/model';
  import { useUserStore } from '@/store/modules/user';
  import { message } from 'ant-design-vue';
  const userStore = useUserStore();
  const showMesg = ref(false);
  const mesgForm = ref({
    name: userStore.info.username,
    tenant_id: 0,
    message: '',
    createTime: '',
    updateTime: ''
  });
  // 查询参数
  const queryParam = ref({
    page: 1,
    limit: 8,
    status: '1'
  });

  const dataList = ref<Notice[]>([]);

  onMounted(() => {
    queryNoticePage(queryParam.value);
  });

  const queryNoticePage = (queryParam: any) => {
    pageMesg(queryParam).then((res) => {
      dataList.value = res.list;
      pagination.value.total = res.count;
    });
  };
  //新增留言
  const addMessage = () => {
    showMesg.value = true;
  };
  const handleOk = async () => {
    if (!mesgForm.value.message) {
      return message.warning('请填写留言消息');
    }

    mesgForm.value.createTime = new Date().toJSON();
    mesgForm.value.updateTime = new Date().toJSON();

    const res = await addMesg(mesgForm.value);
    if (res) {
      showMesg.value = false;
      message.success(res);
      pageMesg({
        page: 1,
        limit: 8,
        status: '1'
      }).then((res) => {
        dataList.value = res.list;
        pagination.value.current = 1;
        pagination.value.total = res.count;

        mesgForm.value = {
          name: userStore.info.username,
          tenant_id: 0,
          message: '',
          createTime: '',
          updateTime: ''
        };
      });
    } else {
      message.warning(res);
    }
  };
  // 分页配置
  const pagination = ref({
    total: 0,
    current: 1,
    pageSize: 8,
    // 改变每页数量时更新显示
    onChange: (current: any, size: any) => {
      // 分页点击后更新
      pagination.value.current = current;
      pagination.value.pageSize = size;
      // 赋值分页参数
      queryParam.value.page = current;
      queryParam.value.limit = size;
      pageMesg(queryParam.value).then((res) => {
        dataList.value = res.list;
        pagination.value.total = res.count;
      });
    }
  });
</script>

<script lang="ts">
  import { defineComponent } from 'vue';

  export default defineComponent({
    name: 'NoticeIndex'
  });
</script>
