/**
 * axios实例
 */
import axios from 'axios';
import type { AxiosResponse } from 'axios';
import { unref } from 'vue';
import router from '@/router';
import { Modal } from 'ant-design-vue';
import { TOKEN_HEADER_NAME } from '@/config/setting';
import { getToken, setToken, removeToken } from './token-util';
import type { ApiResult } from '@/api';

const service = axios.create({
  baseURL: import.meta.env.VITE_API_URL as string
});

// 添加请求拦截器
service.interceptors.request.use(
  (config) => {
    // 添加token到header
    const token = getToken();
    if (token && config.headers) {
      config.headers.common[TOKEN_HEADER_NAME] = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 添加响应拦截器
service.interceptors.response.use(
  (res: AxiosResponse<ApiResult<unknown>>) => {
    // 登录过期处理
    if (res.data?.code === 401) {
      const currentPath = unref(router.currentRoute).path;
      if (currentPath == '/') {
        goLogin();
      } else {
        Modal.destroyAll();
        Modal.info({
          title: '系统提示',
          content: '登录状态已过期, 请退出重新登录!',
          okText: '重新登录',
          onOk: () => {
            goLogin(currentPath);
          }
        });
      }
      return Promise.reject(new Error(res.data.message));
    }
    // token自动续期
    const token = res.headers[TOKEN_HEADER_NAME.toLowerCase()];
    if (token) {
      setToken(token);
    }
    return res;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 跳转到登录页面
const goLogin = function (from?: string) {
  removeToken();
  router.push({
    path: '/login',
    query: from ? { from } : undefined
  });
};

export default service;
