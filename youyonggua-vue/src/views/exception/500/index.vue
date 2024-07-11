<template>
  <div style="padding-top: 80px">
    <a-result status="500" title="500" sub-title="抱歉, 服务器出错了.">
      <template #extra>
        <router-link to="/">
          <a-button type="primary">返回首页</a-button>
        </router-link>
      </template>
    </a-result>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';

  export default defineComponent({
    // eslint-disable-next-line vue/multi-word-component-names
    name: 'Exception500'
  });
</script>
