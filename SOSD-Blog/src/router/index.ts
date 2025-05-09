//src/router/index.ts

import { homeRoute } from './routes';
import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';

export const routes: RouteRecordRaw[] = [
    {
        path: '/',
        children: homeRoute
    },
    {
        path: '/403',
        name: 'Forbidden',
        component: () => import('../components/HelloWorld.vue'),
        meta: {
            permissionKey: null
        }
    }
];

let router;
try {
    router = createRouter({ history: createWebHistory(), routes });
} catch (error) {
    console.error('路由创建失败:', error);
}

export default router;