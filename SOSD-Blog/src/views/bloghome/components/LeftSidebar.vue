<template>
  <el-aside width="240px" class="left-sidebar">
    <div class="sidebar-inner">
      <div class="category-title">
        <span>内容分类</span>
      </div>
      <el-menu
        :default-active="activeMenuItem"
        class="nav-menu"
        background-color="transparent"
        text-color="#333"
        active-text-color="#4338ca"
        @select="handleMenuSelect"
      >
        <el-menu-item index="follow" class="nav-item">
          <div class="nav-item-icon" :class="{ active: activeMenuItem === 'follow' }">
            <el-icon><star-filled /></el-icon>
          </div>
          <span>关注</span>
        </el-menu-item>
        <el-menu-item index="comprehensive" class="nav-item">
          <div class="nav-item-icon" :class="{ active: activeMenuItem === 'comprehensive' }">
            <el-icon><collection /></el-icon>
          </div>
          <span>综合</span>
        </el-menu-item>
        <el-menu-item index="backend" class="nav-item">
          <div class="nav-item-icon" :class="{ active: activeMenuItem === 'backend' }">
            <el-icon><cpu /></el-icon>
          </div>
          <span>后端</span>
        </el-menu-item>
        <el-menu-item index="frontend" class="nav-item">
          <div class="nav-item-icon" :class="{ active: activeMenuItem === 'frontend' }">
            <el-icon><monitor /></el-icon>
          </div>
          <span>前端</span>
        </el-menu-item>
        <el-menu-item index="android" class="nav-item">
          <div class="nav-item-icon" :class="{ active: activeMenuItem === 'android' }">
            <el-icon><Cellphone /></el-icon>
          </div>
          <span>Android</span>
        </el-menu-item>
        <el-menu-item index="ios" class="nav-item">
          <div class="nav-item-icon" :class="{ active: activeMenuItem === 'ios' }">
            <el-icon><Iphone /></el-icon>
          </div>
          <span>iOS</span>
        </el-menu-item>
        <el-menu-item index="ai" class="nav-item">
          <div class="nav-item-icon" :class="{ active: activeMenuItem === 'ai' }">
            <el-icon><connection /></el-icon>
          </div>
          <span>人工智能</span>
        </el-menu-item>
        <el-menu-item index="tools" class="nav-item">
          <div class="nav-item-icon" :class="{ active: activeMenuItem === 'tools' }">
            <el-icon><tools /></el-icon>
          </div>
          <span>开发工具</span>
        </el-menu-item>
        <el-menu-item index="life" class="nav-item">
          <div class="nav-item-icon" :class="{ active: activeMenuItem === 'life' }">
            <el-icon><user /></el-icon>
          </div>
          <span>代码人生</span>
        </el-menu-item>
      </el-menu>
    </div>
  </el-aside>
</template>

<script setup>
import { ref } from 'vue'

// Props
const props = defineProps({
  activeMenuItem: {
    type: String,
    default: 'follow'
  }
})

// Emits
const emit = defineEmits(['menu-select'])

// Handle menu item selection
const handleMenuSelect = (index) => {
  emit('menu-select', index)
}
</script>

<style scoped>
/* Left Sidebar Styles - 卡通风格 */
.left-sidebar {
  background-color: #f8fafc;
  border-right: 2px solid #e2e8f0;
  height: calc(100vh - 70px);
  position: relative;
  overflow: hidden;
  transition: width 0.3s;
}

.sidebar-inner {
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 24px 0;
  overflow-y: auto;
}

.category-title {
  padding: 0 24px 16px;
  font-size: 20px;
  font-weight: 700;
  color: #4338ca;
  letter-spacing: 0.5px;
  position: relative;
  display: inline-block;
  margin-left: 24px;
}

.category-title::after {
  content: '';
  position: absolute;
  bottom: 8px;
  left: 0;
  width: 100%;
  height: 6px;
  background-color: #c7d2fe;
  z-index: -1;
  border-radius: 4px;
}

.nav-menu {
  border-right: none;
  padding: 0;
}

.nav-item {
  height: 56px;
  line-height: 56px;
  margin: 14px 16px;
  border-radius: 16px;
  padding: 0 12px;
  font-size: 15px;
  font-weight: 600;
  position: relative;
  transition: all 0.3s;
  overflow: hidden;
}

.nav-item::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 0;
  height: 100%;
  background-color: #e0e7ff;
  z-index: -1;
  transition: width 0.3s ease;
  border-radius: 16px;
}

.nav-item:hover::before {
  width: 100%;
}

.nav-item-icon {
  box-sizing: border-box; /* 使内边距包含在总尺寸内 */
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 12px;
  margin-right: 10px;
  padding-left: 5px;
  padding-top: 3px;
  background-color: #e2e8f0;
  transition: all 0.3s;
  box-shadow: 0 2px 0 rgba(0, 0, 0, 0.1);
}

.nav-item-icon.active,
.el-menu-item.is-active .nav-item-icon {
  background-color: #4338ca;
  transform: translateY(-2px);
  box-shadow: 0 4px 0 rgba(67, 56, 202, 0.3);
}

.nav-item-icon.active .el-icon,
.el-menu-item.is-active .nav-item-icon .el-icon {
  color: white;
}

.el-icon {
  font-size: 20px;
  transition: all 0.3s;
}

.el-menu-item.is-active {
  background-color: transparent;
  color: #4338ca;
  font-weight: 700;
}

.el-menu-item.is-active::before {
  width: 100%;
}



/* Responsive Adjustments */
@media (max-width: 1200px) {
  .left-sidebar {
    width: 220px !important;
  }
}

@media (max-width: 992px) {
  .left-sidebar {
    width: 200px !important;
  }
}

@media (max-width: 768px) {
  .left-sidebar {
    width: 70px !important;
  }
  
  .nav-item span, 
  .category-title,
  .help-link span {
    display: none;
  }
  
  .nav-item {
    display: flex;
    justify-content: center;
    padding: 0;
  }
  
  .nav-item-icon {
    margin-right: 0;
  }
  
  .help-link {
    justify-content: center;
  }
}
</style>
