<!-- markdown编辑器 -->
<template>
  <div ref="rootRef" class="ele-bytemd-wrap"></div>
</template>

<script lang="ts" setup>
  import { onMounted, ref, watch } from 'vue';
  import * as bytemd from 'bytemd';
  import type { Editor, BytemdPlugin, BytemdLocale, ViewerProps } from 'bytemd';
  import type { EditorConfiguration } from 'codemirror';
  import type { Schema } from 'hast-util-sanitize';
  import type { Image } from 'mdast';
  import 'bytemd/dist/index.min.css';

  const props = withDefaults(
    defineProps<{
      value: string;
      plugins?: BytemdPlugin[];
      sanitize?: (schema: Schema) => Schema;
      mode?: 'split' | 'tab' | 'auto';
      previewDebounce?: number;
      placeholder?: string;
      editorConfig?: Omit<EditorConfiguration, 'value' | 'placeholder'>;
      locale?: Partial<BytemdLocale>;
      uploadImages?: (
        files: File[]
      ) => Promise<Pick<Image, 'url' | 'alt' | 'title'>[]>;
      overridePreview?(el: HTMLElement, props: ViewerProps): void;
      maxLength?: number;
      height?: string;
      fullZIndex?: number;
    }>(),
    {
      fullZIndex: 999
    }
  );

  const emit = defineEmits<{
    (e: 'update:value', value?: string): void;
    (e: 'change', value?: string): void;
  }>();

  const rootRef = ref<HTMLElement>();
  const editor = ref<Editor>();

  onMounted(() => {
    editor.value = new bytemd.Editor({
      target: rootRef.value,
      props
    });
    editor.value.$on('change', (e: any) => {
      emit('update:value', e.detail.value);
      emit('change', e.detail.value);
    });
  });

  watch(
    [
      () => props.value,
      () => props.plugins,
      () => props.sanitize,
      () => props.mode,
      () => props.previewDebounce,
      () => props.placeholder,
      () => props.editorConfig,
      () => props.locale,
      () => props.uploadImages,
      () => props.maxLength
    ],
    () => {
      const option = { ...props };
      for (let key in option) {
        if (typeof option[key] === 'undefined') {
          delete option[key];
        }
      }
      editor.value?.$set(option);
    }
  );
</script>

<style scoped>
  .ele-bytemd-wrap :deep(.bytemd) {
    height: v-bind(height);
  }

  .ele-bytemd-wrap :deep(.bytemd-fullscreen.bytemd) {
    z-index: v-bind(fullZIndex);
  }
</style>
