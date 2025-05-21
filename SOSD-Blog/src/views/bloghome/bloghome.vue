<template>
  <div class="tech-blog-layout">
    <!-- Header Navigation Bar -->
    <AppHeader />

    <el-container class="main-container">
      <!-- Left Sidebar -->
      <LeftSidebar @menu-select="handleMenuSelect" :active-menu-item="activeMenuItem" />

      <!-- Main Content Area with Dynamic Component Loading -->
      <el-main class="main-content">
        <!-- Dynamically load component based on activeMenuItem -->
        <component :is="currentComponent" />
      </el-main>

      <!-- Right Sidebar -->
      <RightSidebar />
    </el-container>
  </div>
</template>

<script setup>
import { ref, computed, markRaw, defineAsyncComponent } from 'vue'
import AppHeader from './components/HomeHeader.vue'
import LeftSidebar from './components/LeftSidebar.vue'
import RightSidebar from './components/RightSidebar.vue'

const activeMenuItem = ref('follow') // Default active menu item

// Define components for each menu item using async components
const components = {
  follow: markRaw(defineAsyncComponent(() => import('./components/content/FollowFeed.vue'))),
  comprehensive: markRaw(defineAsyncComponent(() => import('./components/content/ComprehensiveFeed.vue'))),
  backend: markRaw(defineAsyncComponent(() => import('./components/content/BackendFeed.vue'))),
  frontend: markRaw(defineAsyncComponent(() => import('./components/content/FrontendFeed.vue'))),
  android: markRaw(defineAsyncComponent(() => import('./components/content/AndroidFeed.vue'))),
  ios: markRaw(defineAsyncComponent(() => import('./components/content/IosFeed.vue'))),
  ai: markRaw(defineAsyncComponent(() => import('./components/content/AiFeed.vue'))),
  tools: markRaw(defineAsyncComponent(() => import('./components/content/ToolsFeed.vue'))),
  life: markRaw(defineAsyncComponent(() => import('./components/content/LifeFeed.vue')))
}

// Handle menu item selection
const handleMenuSelect = (index) => {
  activeMenuItem.value = index
}

// Compute the current component based on activeMenuItem
const currentComponent = computed(() => {
  return components[activeMenuItem.value] || components.follow
})
</script>

<style scoped>
/* Base Styles */
.tech-blog-layout {
  display: flex;
  flex-direction: column;
  height: 100vh;
  font-family: 'PingFang SC', 'Helvetica Neue', Helvetica, 'Hiragino Sans GB', 'Microsoft YaHei', Arial, sans-serif;
  background-color: #f8fafc;
  color: #334155;
  overflow: hidden;
}

/* Main Container Styles */
.main-container {
  flex: 1;
  overflow: hidden;
}

/* Main Content Styles */
.main-content {
  background-color: #f8fafc;
  padding: 32px;
  overflow-y: auto;
  height: calc(100vh - 70px);
}

/* Responsive Adjustments */
@media (max-width: 576px) {
  .main-content {
    padding: 20px 16px;
  }
}
</style>