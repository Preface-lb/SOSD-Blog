<template>
  <el-header height="70px" class="header">
    <div class="header-backdrop"></div>
    <div class="header-content">
      <div class="header-left">
        <div class="logo-container">
          <img src="../../../assets/logotext.png" alt="SOSDBLOG" class="logo-image" />
        </div>
        
        <!-- 导航菜单 - 所有项目直接展示 -->
        <div class="nav-buttons">
          <router-link to="/bloghome" class="nav-button">
            <el-icon><House /></el-icon>
            <span>首页</span>
          </router-link>
          <router-link to="/friends" class="nav-button">
            <el-icon><chat-dot-round /></el-icon>
            <span>朋友圈</span>
          </router-link>
          <router-link to="/publish" class="nav-button publish">
            <el-icon><edit /></el-icon>
            <span>我要发表</span>
          </router-link>
        </div>
      </div>
      
      <div class="header-right">
        <div class="search-container">
          <el-input
            placeholder="搜索文章、作者、标签..."
            class="search-input"
            clearable
          >
            <template #prefix>
              <el-icon class="search-icon"><search /></el-icon>
            </template>
          </el-input>
        </div>
        
        <!-- Notification Bell -->
        <div class="notification-bell">
          <el-badge :value="3" class="notification-badge">
            <el-icon class="bell-icon"><bell /></el-icon>
          </el-badge>
        </div>
        
        <el-dropdown trigger="click" class="user-dropdown">
          <div class="user-avatar-container">
            <!-- 使用后端传来的头像 -->
            <el-avatar :size="40" class="user-avatar" :src="userAvatar" />
            <div class="user-info">
              <span class="user-name">{{ userName }}</span>
              <el-icon class="dropdown-arrow"><arrow-down /></el-icon>
            </div>
          </div>
          <template #dropdown>
            <el-dropdown-menu class="user-dropdown-menu">
              <div class="dropdown-user-info">
                <el-avatar :size="50" :src="userAvatar" />
                <div class="dropdown-user-details">
                  <span class="dropdown-user-name">{{ userName }}</span>
                  <span class="dropdown-user-role">{{ userRole }}</span>
                </div>
              </div>
              <el-dropdown-item class="dropdown-item">
                <el-icon><user /></el-icon>个人中心
              </el-dropdown-item>
              <el-dropdown-item class="dropdown-item">
                <el-icon><document /></el-icon>我的文章
              </el-dropdown-item>
              <el-dropdown-item class="dropdown-item">
                <el-icon><star /></el-icon>我的收藏
              </el-dropdown-item>
              <el-dropdown-item class="dropdown-item">
                <el-icon><setting /></el-icon>设置
              </el-dropdown-item>
              <el-dropdown-item divided class="dropdown-item logout">
                <el-icon><switch-button /></el-icon>退出登录
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
  </el-header>
</template>

<script setup>
import { House } from '@element-plus/icons-vue';
import { ref } from 'vue';

// 用户信息，实际应用中可能从 store 或 API 获取
const userAvatar = ref('/api/user/avatar'); // 从后端获取头像
const userName = ref('技术达人');
const userRole = ref('高级开发者');
</script>

<style scoped>
/* Header Styles */
.header {
  position: relative;
  padding: 0;
  z-index: 100;
}

.header-backdrop {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #f8fafc;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  z-index: -1;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  padding: 0 24px;
}

.header-left {
  display: flex;
  align-items: center;
}

.logo-container {
  display: flex;
  align-items: center;
  margin-right: 24px;
}

.logo-image {
  height: 55px;
  width: auto;
}

/* 导航按钮样式 - 卡通简约风格 */
.nav-buttons {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.nav-button {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 1.125rem;
  font-weight: 600;
  font-size: 0.9375rem;
  text-decoration: none;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  background-color: rgba(170, 188, 236, 0.8);
  color: #1e293b;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  backdrop-filter: blur(4px);
}

.nav-button:hover {
  color: #f8fafc;
  background-color: #4f46e5;
  transform: translateY(-2px) scale(1.02);
  box-shadow: 0 6px 12px rgba(79, 70, 229, 0.25),
              0 0 0 1px rgba(79, 70, 229, 0.1);
}

.nav-button:active {
  transform: translateY(0) scale(0.99);
  box-shadow: 0 2px 4px rgba(79, 70, 229, 0.2),
              0 0 0 1px rgba(79, 70, 229, 0.1);
}

.nav-button .el-icon {
  font-size: 1.125rem;
  transition: all 0.3s ease;
}

.nav-button:hover .el-icon {
  transform: rotate(5deg) scale(1.1);
}

.nav-button.publish {
  background-color: rgba(170, 188, 236, 0.9);
  color: #1e293b;
  position: relative;
  overflow: hidden;
}

.nav-button.publish::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: all 0.6s ease;
}

.nav-button.publish:hover {
  color:#f8fafc;
  background-color: #4338ca;
  box-shadow: 0 8px 24px rgba(67, 56, 202, 0.3),
              0 0 0 1px rgba(67, 56, 202, 0.1);
}

.nav-button.publish:hover::before {
  left: 100%;
}    

.header-right {
  display: flex;
  align-items: center;
  gap: 20px;
}

/* 搜索框样式 - 卡通简约风格 */
.search-container {
  position: relative;
}

.search-input {
  width: 240px;
}

.search-input :deep(.el-input__wrapper) {
  border-radius: 20px;
  background-color: #f1f5f9;
  box-shadow: none;
  border: 2px solid transparent;
  transition: all 0.3s;
}

.search-input :deep(.el-input__wrapper:hover),
.search-input :deep(.el-input__wrapper.is-focus) {
  border-color: #4338ca;
  box-shadow: 0 2px 8px rgba(67, 56, 202, 0.2);
}

.search-icon {
  font-size: 16px;
  color: #000000;
}

/* 通知铃铛样式 - 卡通简约风格 */
.notification-bell {
  position: relative;
  cursor: pointer;
  background-color: #f1f5f9;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.notification-bell:hover {
  background-color: #e2e8f0;
  transform: translateY(-2px) rotate(5deg);
}

.bell-icon {
  font-size: 20px;
  color: #000000;
}

.notification-badge :deep(.el-badge__content) {
  background-color: #4338ca;
}

/* 用户头像样式 - 卡通简约风格 */
.user-dropdown {
  cursor: pointer;
}

.user-avatar-container {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 4px 12px 4px 4px;
  border-radius: 24px;
  background-color: #f1f5f9;
  transition: all 0.3s ease;
}

.user-avatar-container:hover {
  background-color: #e2e8f0;
  transform: translateY(-2px);
}

.user-avatar {
  border: 3px solid white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.user-info {
  display: flex;
  align-items: center;
  gap: 4px;
}

.user-name {
  font-weight: 600;
  font-size: 14px;
  color: #000000;
}

.dropdown-arrow {
  font-size: 12px;
  color: #000000;
}

/* 下拉菜单样式 - 卡通简约风格 */
.user-dropdown-menu {
  min-width: 240px;
  border-radius: 16px;
  overflow: hidden;
  padding: 0;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  border: none;
}

.dropdown-user-info {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  background: linear-gradient(135deg, #4338ca 0%, #6366f1 100%);
  color: white;
}

.dropdown-user-details {
  display: flex;
  flex-direction: column;
}

.dropdown-user-name {
  font-weight: 600;
  font-size: 16px;
}

.dropdown-user-role {
  font-size: 12px;
  opacity: 0.8;
}

.dropdown-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 16px;
  font-size: 14px;
  transition: all 0.2s ease;
}

.dropdown-item:hover {
  background-color: #f1f5f9;
  color: #4338ca;
}

.dropdown-item .el-icon {
  font-size: 18px;
  color: #4338ca;
}

.item-badge {
  margin-left: auto;
  background-color: #4338ca;
  color: white;
  font-size: 11px;
  padding: 2px 6px;
  border-radius: 10px;
}

.logout {
  color: #ef4444;
}

.logout .el-icon {
  color: #ef4444;
}

/* Responsive Adjustments */
@media (max-width: 992px) {
  .search-input {
    width: 180px;
  }
}

@media (max-width: 768px) {
  .user-info {
    display: none;
  }
  
  .nav-button span {
    display: none;
  }
  
  .nav-button {
    padding: 8px;
  }
  
  .search-input {
    width: 160px;
  }
}

@media (max-width: 576px) {
  .search-input {
    display: none;
  }
  
  .header-content {
    padding: 0 16px;
  }
  
  .logo-image {
    height: 30px;
  }
}
</style>
