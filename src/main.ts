import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import store from './store';
import 'ant-design-vue/dist/antd.css';
import {
    Button,
    Calendar,
    ConfigProvider,
    Popover,
    Drawer,
    Tag,
} from 'ant-design-vue';
import 'virtual:windi.css';
createApp(App)
    .use(store)
    .use(Button)
    .use(Calendar)
    .use(ConfigProvider)
    .use(Popover)
    .use(Drawer)
    .use(Tag)
    .mount('#app');
