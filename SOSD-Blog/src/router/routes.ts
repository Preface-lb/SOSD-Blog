//src/router/routes.ts

import type { RouteRecordRaw } from 'vue-router';

// 定义 home 路由配置
export const homeRoute: RouteRecordRaw[] = [
    {
        name: 'Home',
        path: '',
        component: () => import('../views/home.vue'),
    },
];

export const loginRoute: RouteRecordRaw[] = [
    {
        name: 'Login',  
        path: '/login',
        component: () => import('../views/login/login.vue'),
    },
];

export const registerRoute: RouteRecordRaw[] = [
    {
        name: 'Register',
        path: '/register',
        component: () => import('../views/login/register.vue'),
    },
];

export const aboutRoute: RouteRecordRaw[] = [
    {
        name: 'About',
        path: '/about',
        component: () => import('../views/login/about.vue'),
    },
];

export const bloghomeRoute: RouteRecordRaw[] = [
    {
        name: 'BlogHome',
        path: '/bloghome',
        component: () => import('../views/bloghome/bloghome.vue'),
    },
];

export const friendsRoute: RouteRecordRaw[] = [
    {
        name: 'Friends',
        path: '/friends',
        component: () => import('../views/friends/friends.vue'),
    },
];
    
export const publishRoute: RouteRecordRaw[] = [
    {
        name: 'Publish',
        path: '/publish',
        component: () => import('../views/publish/publish.vue'),
    },
];
    