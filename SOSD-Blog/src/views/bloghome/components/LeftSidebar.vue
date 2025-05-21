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
        active-text-color="#1e40af"
        @select="handleMenuSelect"
      >
        <el-menu-item index="follow" class="nav-item">
          <div class="nav-item-icon" :class="{ active: activeMenuItem === 'follow' }">
            <el-icon><star-filled /></el-icon>
          </div>
          <span>关注</span>
          <div class="nav-item-indicator"></div>
        </el-menu-item>
        <el-menu-item index="comprehensive" class="nav-item">
          <div class="nav-item-icon" :class="{ active: activeMenuItem === 'comprehensive' }">
            <el-icon><collection /></el-icon>
          </div>
          <span>综合</span>
          <div class="nav-item-indicator"></div>
        </el-menu-item>
        <el-menu-item index="backend" class="nav-item">
          <div class="nav-item-icon" :class="{ active: activeMenuItem === 'backend' }">
            <el-icon><cpu /></el-icon>
          </div>
          <span>后端</span>
          <div class="nav-item-indicator"></div>
        </el-menu-item>
        <el-menu-item index="frontend" class="nav-item">
          <div class="nav-item-icon" :class="{ active: activeMenuItem === 'frontend' }">
            <el-icon><monitor /></el-icon>
          </div>
          <span>前端</span>
          <div class="nav-item-indicator"></div>
        </el-menu-item>
        <el-menu-item index="android" class="nav-item">
          <div class="nav-item-icon" :class="{ active: activeMenuItem === 'android' }">
            <el-icon><phone /></el-icon>
          </div>
          <span>Android</span>
          <div class="nav-item-indicator"></div>
        </el-menu-item>
        <el-menu-item index="ios" class="nav-item">
          <div class="nav-item-icon" :class="{ active: activeMenuItem === 'ios' }">
            <el-icon><apple /></el-icon>
          </div>
          <span>iOS</span>
          <div class="nav-item-indicator"></div>
        </el-menu-item>
        <el-menu-item index="ai" class="nav-item">
          <div class="nav-item-icon" :class="{ active: activeMenuItem === 'ai' }">
            <el-icon><connection /></el-icon>
          </div>
          <span>人工智能</span>
          <div class="nav-item-indicator"></div>
        </el-menu-item>
        <el-menu-item index="tools" class="nav-item">
          <div class="nav-item-icon" :class="{ active: activeMenuItem === 'tools' }">
            <el-icon><tools /></el-icon>
          </div>
          <span>开发工具</span>
          <div class="nav-item-indicator"></div>
        </el-menu-item>
        <el-menu-item index="life" class="nav-item">
          <div class="nav-item-icon" :class="{ active: activeMenuItem === 'life' }">
            <el-icon><user /></el-icon>
          </div>
          <span>代码人生</span>
          <div class="nav-item-indicator"></div>
        </el-menu-item>
      </el-menu>
      
      <div class="sidebar-footer">
        <div class="theme-toggle">
          <el-icon><moon /></el-icon>
          <span>深色模式</span>
          <el-switch
            v-model="darkMode"
            inline-prompt
            class="theme-switch"
          />
        </div>
      </div>
    </div>
  </el-aside>
</template>

<script setup>
import { ref } from 'vue'
import { 
  StarFilled, 
  Collection, 
  Cpu, 
  Monitor, 
  Phone, 
  Apple, 
  Connection, 
  Tools, 
  User,
  Moon
} from '@element-plus/icons-vue'

const darkMode = ref(false)

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
/* Left Sidebar Styles */
.left-sidebar {
  background-color: white;
  border-right: 1px solid rgba(226, 232, 240, 0.8);
  height: calc(100vh - 70px);
  position: relative;
  overflow: hidden;
  transition: width 0.3s;
}

.sidebar-inner {
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 20px 0;
  overflow-y: auto;
}

.category-title {
  padding: 0 24px 16px;
  font-size: 14px;
  font-weight: 600;
  color: #64748b;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.nav-menu {
  border-right: none;
  padding: 0;
}

.nav-item {
  height: 56px;
  line-height: 56px;
  margin: 4px 16px;
  border-radius: 10px;
  padding: 0 8px;
  font-size: 15px;
  font-weight: 500;
  position: relative;
  transition: all 0.3s;
}

.nav-item:hover {
  background-color: rgba(30, 64, 175, 0.05);
}

.nav-item-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 8px;
  margin-right: 12px;
  background-color: #f1f5f9;
  transition: all 0.3s;
}

.nav-item-icon.active,
.el-menu-item.is-active .nav-item-icon {
  background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%);
  box-shadow: 0 4px 12px rgba(30, 64, 175, 0.2);
}

.nav-item-icon.active .el-icon,
.el-menu-item.is-active .nav-item-icon .el-icon {
  color: white;
}

.el-icon {
  font-size: 18px;
  transition: all 0.3s;
}

.nav-item-indicator {
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%) scaleX(0);
  width: 4px;
  height: 20px;
  border-radius: 2px;
  background: linear-gradient(180deg, #1e40af 0%, #3b82f6 100%);
  opacity: 0;
  transition: all 0.3s;
}

.el-menu-item.is-active .nav-item-indicator {
  opacity: 1;
  transform: translateY(-50%) scaleX(1);
}

.el-menu-item.is-active {
  background-color: rgba(30, 64, 175, 0.08);
  color: #1e40af;
  font-weight: 600;
}

.sidebar-footer {
  margin-top: auto;
  padding: 16px 24px;
  border-top: 1px solid rgba(226, 232, 240, 0.8);
}

.theme-toggle {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 14px;
  color: #64748b;
}

.theme-toggle .el-icon {
  font-size: 16px;
}

.theme-switch {
  margin-left: auto;
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
  .theme-toggle span {
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
  
  .theme-toggle {
    justify-content: center;
  }
}
</style>