<template>
  <div style="padding-top: 80px">
    <a-result status="404" title="404" sub-title="抱歉, 你访问的页面不存在.">
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
    name: 'Exception404'
  });
</script>
