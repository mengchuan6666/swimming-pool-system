<!-- 富文本编辑器 -->
<template>
  <editor
    :init="config"
    :disabled="disabled"
    :model-value="value"
    @update:model-value="updateValue"
  />
</template>

<script lang="ts" setup>
  import { watch, onMounted } from 'vue';
  import { useThemeStore } from '@/store/modules/theme';
  import { storeToRefs } from 'pinia';
  import Editor from '@tinymce/tinymce-vue';
  import tinymce from 'tinymce/tinymce';
  import type { RawEditorSettings } from 'tinymce/tinymce';
  import 'tinymce/icons/default';
  import 'tinymce/themes/silver';
  import 'tinymce/plugins/code';
  import 'tinymce/plugins/print';
  import 'tinymce/plugins/preview';
  import 'tinymce/plugins/fullscreen';
  import 'tinymce/plugins/paste';
  import 'tinymce/plugins/searchreplace';
  import 'tinymce/plugins/save';
  import 'tinymce/plugins/autosave';
  import 'tinymce/plugins/link';
  import 'tinymce/plugins/autolink';
  import 'tinymce/plugins/image';
  //import 'tinymce/plugins/imagetools';
  import 'tinymce/plugins/media';
  import 'tinymce/plugins/table';
  import 'tinymce/plugins/codesample';
  import 'tinymce/plugins/lists';
  import 'tinymce/plugins/advlist';
  import 'tinymce/plugins/hr';
  import 'tinymce/plugins/charmap';
  import 'tinymce/plugins/emoticons';
  import 'tinymce/plugins/anchor';
  import 'tinymce/plugins/directionality';
  import 'tinymce/plugins/pagebreak';
  import 'tinymce/plugins/quickbars';
  import 'tinymce/plugins/nonbreaking';
  import 'tinymce/plugins/visualblocks';
  import 'tinymce/plugins/visualchars';
  import 'tinymce/plugins/wordcount';
  import 'tinymce/plugins/emoticons/js/emojis';
  import {
  	uploadFile
  } from '@/api/neirong/site';

  const props = withDefaults(
    defineProps<{
      // 值(v-model)
      value?: string;
      // 编辑器配置
      init?: RawEditorSettings;
      // 是否禁用
      disabled?: boolean;
      // 是否跟随框架主题
      autoTheme?: boolean;
      // 是否使用暗黑主题
      darkTheme?: boolean;
    }>(),
    {
      autoTheme: true
    }
  );

  const emit = defineEmits<{
    (e: 'update:value', value: string): void;
  }>();

  const themeStore = useThemeStore();
  const { darkMode } = storeToRefs(themeStore);

  const BASE_URL = import.meta.env.BASE_URL;

  // 编辑器默认配置
  const DEFAULT_CONFIG = {
    height: 300,
    branding: false,
    skin_url: BASE_URL + 'tinymce/skins/ui/oxide',
    content_css: BASE_URL + 'tinymce/skins/content/default/content.min.css',
    language_url: BASE_URL + 'tinymce/langs/zh_CN.js',
    language: 'zh_CN',
    plugins: [
      'code',
      'print',
      'preview',
      'fullscreen',
      'paste',
      'searchreplace',
      'save',
      'autosave',
      'link',
      'autolink',
      'image',
      //'imagetools',
      'media',
      'table',
      'codesample',
      'lists',
      'advlist',
      'hr',
      'charmap',
      'emoticons',
      'anchor',
      'directionality',
      'pagebreak',
      'quickbars',
      'nonbreaking',
      'visualblocks',
      'visualchars',
      'wordcount'
    ].join(' '),
    toolbar: [
      'fullscreen',
      'preview',
      'code',
      '|',
      'undo',
      'redo',
      '|',
      'forecolor',
      'backcolor',
      '|',
      'bold',
      'italic',
      'underline',
      'strikethrough',
      '|',
      'alignleft',
      'aligncenter',
      'alignright',
      'alignjustify',
      '|',
      'outdent',
      'indent',
      '|',
      'numlist',
      'bullist',
      '|',
      'formatselect',
      'fontselect',
      'fontsizeselect',
      '|',
      'link',
      'image',
      'media',
      'emoticons',
      'charmap',
      'anchor',
      'pagebreak',
      'codesample',
      '|',
      'ltr',
      'rtl'
    ].join(' '),
    draggable_modal: true,
    toolbar_mode: 'sliding',
    images_upload_handler: (blobInfo: any, success: any, failure: any) => {
	  if (blobInfo.blob().size / 1024 / 1024 > 2) {
		failure("上传失败，图片大小请控制在 2M 以内");
	  } else {
		uploadFile(blobInfo.blob()).then((res) => {
				success(res);
			})
			.catch((e) => {
				failure(e.message);
			});  
	  }
      
    },
    file_picker_types: 'media',
    file_picker_callback: () => {}
  };

  // 暗黑主题默认配置
  const DARK_CONFIG = {
    skin_url: BASE_URL + 'tinymce/skins/ui/oxide-dark',
    content_css: BASE_URL + 'tinymce/skins/content/dark/content.min.css'
  };

  /**
   * 切换编辑器主题
   * @param dark 是否是暗黑主题
   */
  function changeEditorTheme(dark: boolean) {
    [].forEach.call(
      document.head.querySelectorAll('[id^="mce-"]'),
      (elem: HTMLElement) => {
        let href = elem.getAttribute('href');
        if (href?.includes('/oxide-dark/')) {
          if (!dark) {
            href = href.replace('/oxide-dark/', '/oxide/');
            elem.setAttribute('href', href);
          }
        } else if (dark && href) {
          href = href.replace('/oxide/', '/oxide-dark/');
          elem.setAttribute('href', href);
        }
      }
    );

    // 切换编辑器内容区的主题
    [].forEach.call(
      document.body.querySelectorAll('iframe[id^="tiny-vue_"]'),
      (frame: HTMLIFrameElement) => {
        const win = frame.contentWindow;
        if (win) {
          const doc = win.document;
          if (doc) {
            [].forEach.call(
              doc.head.querySelectorAll('[id^="mce-"]'),
              (elem: HTMLElement) => {
                let href = elem.getAttribute('href');
                if (href?.includes('/skins/ui/')) {
                  if (href.includes('/oxide-dark/')) {
                    if (!dark) {
                      href = href.replace('/oxide-dark/', '/oxide/');
                      elem.setAttribute('href', href);
                    }
                  } else if (dark) {
                    href = href.replace('/oxide/', '/oxide-dark/');
                    elem.setAttribute('href', href);
                  }
                } else if (href?.includes('/skins/content/')) {
                  if (href.includes('/dark/')) {
                    if (!dark) {
                      href = href.replace('/dark/', '/default/');
                      elem.setAttribute('href', href);
                    }
                  } else if (dark) {
                    href = href.replace('/default/', '/dark/');
                    elem.setAttribute('href', href);
                  }
                }
              }
            );
          }
        }
      }
    );
  }

  // 编辑器配置
  const config = Object.assign(
    {},
    DEFAULT_CONFIG,
    (props.autoTheme ? darkMode.value : props.darkTheme) ? DARK_CONFIG : {},
    props.init
  );

  /* 更新value */
  const updateValue = (value: string) => {
    emit('update:value', value);
  };

  /* 跟随框架换主题 */
  watch(darkMode, (value) => {
    if (props.autoTheme) {
      changeEditorTheme(value);
    }
  });

  // 渲染编辑器
  onMounted(() => {
    tinymce.init({});
  });
</script>

<style>
  body .tox-tinymce-aux {
    z-index: 19892000;
  }
</style>
