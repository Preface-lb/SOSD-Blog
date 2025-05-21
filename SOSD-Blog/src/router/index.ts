//src/router/index.ts

import { homeRoute } from './routes';

import { loginRoute } from './routes';
import { registerRoute } from './routes';
import { aboutRoute } from './routes';

import { bloghomeRoute } from './routes';

import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';

export const routes: RouteRecordRaw[] = [
    {
        path: '/',
        children: homeRoute
    },
    {
        path: '/login',
        children: loginRoute
    },
    
    {
        path: '/register',
        children: registerRoute
    },
    {
        path: '/about',
        children: aboutRoute
    },
    {
        path: '/bloghome',
        children: bloghomeRoute
    },
    {
        path: '/403',
        name: 'Forbidden',
        component: () => import('../components/Forbidden.vue'),
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