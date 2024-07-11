<!-- 角色编辑弹窗 -->
<template>
  <a-modal
    :width="1060"
    :visible="visible"
    :confirm-loading="loading"
    :title="isUpdate ? '查看公告信息' : '查看公告信息'"
    :body-style="{ paddingBottom: '8px' }"
    @update:visible="updateVisible"
    >
      <template #footer>
          <a-button style="margin-right: 8px" @click="updateVisible(false)">关闭</a-button>
      </template>
      <div>
    <span style="margin-left: 40%;font-weight: bold;font-size: 18px;">{{ props.data.name }}</span>
    <p style="margin-top: 20px;">{{ props.data.content }}</p>
    </div>
  </a-modal>
</template>

<script lang="ts" setup>
  import { ref, reactive, watch } from 'vue';
  import type { ZhaoPin } from '@/api/neirong/zhaopin/model';


  const emit = defineEmits<{
    (e: 'done'): void;
    (e: 'update:visible', visible: boolean): void;
  }>();

  const props = defineProps<{
    // 弹窗是否打开
    visible: boolean;
    // 修改回显的数据
    data?: ZhaoPin;
  }>();

  // 是否是修改
  const isUpdate = ref(false);

  // 提交状态
  const loading = ref(false);

  /* 更新visible */
  const updateVisible = (value: boolean) => {
    emit('update:visible', value);
  };

  watch(
    () => props.visible,
    (visible) => {
      if (visible) {
        if (props.data) {
          isUpdate.value = true;
        } else {
          isUpdate.value = false;
        }
      }
    }
  );
</script>
