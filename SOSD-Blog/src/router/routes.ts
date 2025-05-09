//src/router/routes.ts

import type { RouteRecordRaw } from 'vue-router';

// 定义 home 路由配置
export const homeRoute: RouteRecordRaw[] = [
    {
        name: 'Home',
        path: '',
        component: () => import('../components/HelloWorld.vue'),
    },
];
    