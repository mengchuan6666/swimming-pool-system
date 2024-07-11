<!-- 角色选择下拉框 -->
<template>
  <a-select
    allow-clear
    :value="value"
    :placeholder="placeholder"
    @update:value="updateValue"
  >
    <a-select-option
      v-for="item in data"
      :key="item.dictDataCode"
      :value="item.dictDataCode"
    >
      {{ item.dictDataName }}
    </a-select-option>
  </a-select>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import { message } from 'ant-design-vue';
  import { listDictionaryData } from '@/api/system/dictionary-data';
  import type { DictionaryData } from '@/api/system/dictionary-data/model';

  const emit = defineEmits<{
    (e: 'update:value', value: string): void;
  }>();

  withDefaults(
    defineProps<{
      value?: string;
      placeholder?: string;
    }>(),
    {
      placeholder: '请选择性别'
    }
  );

  // 字典数据
  const data = ref<DictionaryData[]>([]);

  /* 更新选中数据 */
  const updateValue = (value: string) => {
    emit('update:value', value);
  };

  /* 获取字典数据 */
  listDictionaryData({
    dictCode: 'sex'
  })
    .then((list) => {
      data.value = list;
    })
    .catch((e) => {
      message.error(e.message);
    });
</script>
