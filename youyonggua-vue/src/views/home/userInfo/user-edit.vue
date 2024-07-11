<!-- 用户编辑弹窗 -->
<template>
  <ele-modal
    :width="680"
    :visible="visible"
    :confirm-loading="loading"
    :title="isUpdate ? '修改用户' : '新建用户'"
    :body-style="{ paddingBottom: '8px' }"
    @update:visible="updateVisible"
    @ok="save"
  >
    <a-form
      :label-col="{ md: { span: 4 }, sm: { span: 24 } }"
      :wrapper-col="{ md: { span: 20 }, sm: { span: 24 } }"
    >
      <a-form-item label="用户账号" v-bind="validateInfos.username">
        <a-input
          allow-clear
          :maxlength="20"
          placeholder="请输入用户账号"
          v-model:value="form.username"
          disabled
        />
      </a-form-item>
      <a-form-item label="头像" v-bind="validateInfos.avatar">
        <a-input
          allow-clear
          placeholder="请上传头像"
          v-model:value="form.avatar"
          disabled
          style="width: 348px"
        />
        <a-upload :show-upload-list="false" :customRequest="onUpload">
          <a-button type="primary" class="ele-btn-icon">
            <template #icon>
              <upload-outlined />
            </template>
            <span>上传头像</span>
          </a-button>
        </a-upload>
      </a-form-item>
      <a-form-item label="用户名" v-bind="validateInfos.nickname">
        <a-input
          allow-clear
          :maxlength="20"
          placeholder="请输入用户名"
          v-model:value="form.nickname"
        />
      </a-form-item>
      <a-form-item label="性别" v-bind="validateInfos.sex">
        <sex-select v-model:value="form.sex" />
      </a-form-item>
      <a-form-item label="邮箱" v-bind="validateInfos.email">
        <a-input
          allow-clear
          :maxlength="100"
          placeholder="请输入邮箱"
          v-model:value="form.email"
        />
      </a-form-item>
      <a-form-item label="手机号" v-bind="validateInfos.phone">
        <a-input
          allow-clear
          :maxlength="11"
          placeholder="请输入手机号"
          v-model:value="form.phone"
        />
      </a-form-item>
      <a-form-item
        v-if="!isUpdate"
        label="登录密码"
        v-bind="validateInfos.password"
      >
        <a-input-password
          :maxlength="20"
          v-model:value="form.password"
          placeholder="请输入登录密码"
        />
      </a-form-item>
    </a-form>
  </ele-modal>
</template>

<script lang="ts" setup>
  import { ref, reactive, watch } from 'vue';
  import { Form, message } from 'ant-design-vue';
  import type { RuleObject } from 'ant-design-vue/es/form';
  import { assignObject } from 'ele-admin-pro';
  import { emailReg, phoneReg } from 'ele-admin-pro';
  import SexSelect from './sex-select.vue';
  import { addUser, updateUser, checkExistence } from '@/api/system/user';
  import type { User } from '@/api/system/user/model';
  import dayjs from 'dayjs';
  import type { Dayjs } from 'dayjs';
  import { uploadFile } from '@/api/neirong/product';

  const useForm = Form.useForm;

  const emit = defineEmits<{
    (e: 'done'): void;
    (e: 'update:visible', visible: boolean): void;
  }>();

  const props = defineProps<{
    // 弹窗是否打开
    visible: boolean;
    // 修改回显的数据
    data?: User;
  }>();

  // 是否是修改
  const isUpdate = ref(false);

  // 提交状态
  const loading = ref(false);

  // 表单数据
  const form = reactive<User>({
    userId: undefined,
    username: '',
    nickname: '',
    sex: undefined,
    email: '',
    phone: '',
    password: '',
    avatar: ''
  });

  // 出生日期
  const birthday = ref<Dayjs>();

  // 表单验证规则
  const rules = reactive({
    username: [
      {
        required: true,
        type: 'string',
        trigger: 'blur',
        validator: (_rule: RuleObject, value: string) => {
          return new Promise<void>((resolve, reject) => {
            if (!value) {
              return reject('请输入用户账号');
            }
            checkExistence('username', value, props.data?.userId)
              .then(() => {
                reject('账号已经存在');
              })
              .catch(() => {
                resolve();
              });
          });
        }
      }
    ],
    nickname: [
      {
        required: true,
        message: '请输入用户名',
        type: 'string',
        trigger: 'blur'
      }
    ],
    sex: [
      {
        required: true,
        message: '请选择性别',
        type: 'string',
        trigger: 'blur'
      }
    ],
    avatar: [
      {
        required: true,
        message: '请上传头像',
        type: 'string',
        trigger: 'blur'
      }
    ],
    email: [
      {
        pattern: emailReg,
        message: '邮箱格式不正确',
        type: 'string',
        trigger: 'blur'
      }
    ],
    password: [
      {
        required: true,
        type: 'string',
        trigger: 'blur',
        validator: async (_rule: RuleObject, value: string) => {
          if (isUpdate.value || /^[\S]{5,18}$/.test(value)) {
            return Promise.resolve();
          }
          return Promise.reject('密码必须为5-18位非空白字符');
        }
      }
    ],
    phone: [
      {
        pattern: phoneReg,
        message: '手机号格式不正确',
        type: 'string',
        trigger: 'blur'
      }
    ]
  });

  /* 上传 */
  const onUpload = ({ file }) => {
    if (file.size / 1024 / 1024 > 100) {
      message.error('大小不能超过 100MB');
      return false;
    }
    uploadFile(file)
      .then((res) => {
        alert(res);
        message.success('上传成功');
        form.avatar = res;
      })
      .catch((e) => {
        message.error(e.message);
      });
    return false;
  };

  const { resetFields, validate, validateInfos } = useForm(form, rules);

  /* 保存编辑 */
  const save = () => {
    validate()
      .then(() => {
        loading.value = true;
        const data = {
          ...form
        };
        const saveOrUpdate = isUpdate.value ? updateUser : addUser;
        saveOrUpdate(data)
          .then((msg) => {
            loading.value = false;
            message.success(msg);
            updateVisible(false);
            emit('done');
          })
          .catch((e) => {
            loading.value = false;
            message.error(e.message);
          });
      })
      .catch(() => {});
  };

  /* 更新visible */
  const updateVisible = (value: boolean) => {
    emit('update:visible', value);
  };

  watch(
    () => props.visible,
    (visible) => {
      if (visible) {
        if (props.data) {
          assignObject(form, props.data);
          isUpdate.value = true;
        } else {
          isUpdate.value = false;
        }
      } else {
        resetFields();
        birthday.value = undefined;
      }
    }
  );
</script>
