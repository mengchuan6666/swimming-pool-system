import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import permission from './utils/permission';
import i18n from './i18n';
import './styles/index.less';
const app = createApp(App);

app.use(router);
app.use(store);
app.use(permission);
app.use(i18n);

app.mount('#app');
