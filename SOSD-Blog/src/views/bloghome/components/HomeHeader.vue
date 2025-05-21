<template>
  <el-header height="70px" class="header">
    <div class="header-backdrop"></div>
    <div class="header-content">
      <div class="header-left">
        <div class="logo-container">
          <div class="logo-icon">
            <div class="logo-shape"></div>
          </div>
          <h2 class="logo">Tech<span>Blog</span></h2>
        </div>
        <el-menu
          mode="horizontal"
          default-active="1"
          class="header-menu"
          background-color="transparent"
          text-color="#333"
          active-text-color="#1e40af"
        >
          <el-menu-item index="1" class="header-nav-item">
            <el-icon><home /></el-icon>
            <span>首页</span>
          </el-menu-item>
          <el-menu-item index="2" class="header-nav-item">
            <el-icon><chat-dot-round /></el-icon>
            <span>朋友圈</span>
          </el-menu-item>
          <el-menu-item index="3" class="header-nav-item publish-btn">
            <el-icon><edit /></el-icon>
            <span>我要发表</span>
          </el-menu-item>
        </el-menu>
      </div>
      
      <div class="header-right">
        <div class="search-container">
          <el-input
            placeholder="搜索文章、作者、标签..."
            prefix-icon="search"
            class="search-input"
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
            <el-avatar :size="40" class="user-avatar">
              <img src="https://placeholder.pics/svg/40x40/1E40AF-3B82F6/FFFFFF-FFFFFF/用户" alt="用户头像" />
            </el-avatar>
            <div class="user-info">
              <span class="user-name">技术达人</span>
              <el-icon class="dropdown-arrow"><arrow-down /></el-icon>
            </div>
          </div>
          <template #dropdown>
            <el-dropdown-menu class="user-dropdown-menu">
              <div class="dropdown-user-info">
                <el-avatar :size="50">
                  <img src="https://placeholder.pics/svg/50x50/1E40AF-3B82F6/FFFFFF-FFFFFF/用户" alt="用户头像" />
                </el-avatar>
                <div class="dropdown-user-details">
                  <span class="dropdown-user-name">技术达人</span>
                  <span class="dropdown-user-role">高级开发者</span>
                </div>
              </div>
              <el-dropdown-item class="dropdown-item">
                <el-icon><user /></el-icon>个人中心
              </el-dropdown-item>
              <el-dropdown-item class="dropdown-item">
                <el-icon><message /></el-icon>我的消息
                <span class="item-badge">5</span>
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
  background-color: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
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

.logo-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%);
  border-radius: 8px;
  margin-right: 12px;
  position: relative;
  overflow: hidden;
}

.logo-shape {
  width: 20px;
  height: 20px;
  background-color: white;
  clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
  transform: rotate(45deg);
}

.logo {
  margin: 0;
  font-size: 24px;
  font-weight: 800;
  background: linear-gradient(90deg, #1e40af 0%, #3b82f6 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  letter-spacing: -0.5px;
}

.logo span {
  font-weight: 400;
}

.header-menu {
  border-bottom: none;
  height: 70px;
}

.header-nav-item {
  font-size: 15px;
  font-weight: 500;
  height: 70px !important;
  line-height: 70px !important;
  padding: 0 16px !important;
  transition: all 0.3s;
}

.header-nav-item:hover {
  background-color: rgba(30, 64, 175, 0.05);
}

.publish-btn {
  margin-left: 8px;
  border-radius: 8px;
  background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%);
  color: white !important;
}

.publish-btn:hover {
  background: linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(30, 64, 175, 0.2);
}

.publish-btn .el-icon {
  color: white !important;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 20px;
}

.search-container {
  position: relative;
}

.search-input {
  width: 260px;
  transition: all 0.3s;
}

.search-input :deep(.el-input__wrapper) {
  border-radius: 20px;
  padding-left: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  transition: all 0.3s;
}

.search-input :deep(.el-input__wrapper:hover),
.search-input :deep(.el-input__wrapper.is-focus) {
  box-shadow: 0 4px 12px rgba(30, 64, 175, 0.15);
  transform: translateY(-1px);
}

.search-icon {
  font-size: 16px;
  color: #64748b;
}

.notification-bell {
  position: relative;
  cursor: pointer;
  transition: transform 0.2s;
}

.notification-bell:hover {
  transform: translateY(-2px);
}

.bell-icon {
  font-size: 22px;
  color: #64748b;
}

.notification-badge :deep(.el-badge__content) {
  background-color: #1e40af;
}

.user-dropdown {
  cursor: pointer;
}

.user-avatar-container {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 4px;
  border-radius: 24px;
  transition: all 0.3s;
}

.user-avatar-container:hover {
  background-color: rgba(30, 64, 175, 0.05);
}

.user-avatar {
  border: 2px solid #1e40af;
  box-shadow: 0 2px 8px rgba(30, 64, 175, 0.2);
}

.user-info {
  display: flex;
  align-items: center;
  gap: 4px;
}

.user-name {
  font-weight: 600;
  font-size: 14px;
}

.dropdown-arrow {
  font-size: 12px;
  color: #64748b;
}

.user-dropdown-menu {
  min-width: 240px;
  border-radius: 12px;
  overflow: hidden;
  padding: 0;
}

.dropdown-user-info {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%);
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
}

.dropdown-item:hover {
  background-color: rgba(30, 64, 175, 0.05);
  color: #1e40af;
}

.dropdown-item .el-icon {
  font-size: 16px;
  color: #1e40af;
}

.item-badge {
  margin-left: auto;
  background-color: #1e40af;
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
@media (max-width: 768px) {
  .user-info {
    display: none;
  }
  
  .header-nav-item span {
    display: none;
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
}
</style>