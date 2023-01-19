import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import store from './store'
import router from './router'
import 'ant-design-vue/dist/antd.css';
import {Button,Calendar} from 'ant-design-vue'
createApp(App).use(store).use(router).use(Button).use(Calendar).mount('#app')

