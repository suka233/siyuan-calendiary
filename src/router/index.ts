import {createRouter, createWebHistory,RouteRecordRaw} from 'vue-router'

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'Home',
        meta:{
            title: 'Home',
            keepAlive: true,
        },
        // @ts-ignore
        component: () => import("/src/views/home/index.vue"),
    }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
