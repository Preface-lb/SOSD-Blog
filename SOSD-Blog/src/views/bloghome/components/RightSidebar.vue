<template>
  <el-aside width="280px" class="right-sidebar">
    <div class="sidebar-inner">
      <!-- Welcome Card -->
      <div class="welcome-card">
        <div class="welcome-header">
          <div class="welcome-icon">
            <el-icon><magic-stick /></el-icon>
          </div>
          <h3>欢迎回来！</h3>
        </div>
        <p>这里是 SOSD 团队的技术博客，我们将分享关于技术、产品、创新等方面的内容。</p>
      </div>
      
      <!-- Trending Articles -->
      <div class="sidebar-section trending-section">
        <div class="section-header">
          <h3 class="section-title">本周热度前三文章</h3>
        </div>
        <ul class="trending-list">
          <li v-for="i in 3" :key="i" class="trending-item">
            <span class="trending-number">{{ i }}</span>
            <div class="trending-content">
              <span class="trending-title">热门技术文章标题 {{ i }}</span>
              <div class="trending-meta">
                <span class="trending-views"><el-icon><View /></el-icon> {{ 1000 + i * 200 }}</span>
                <span class="trending-comments"><el-icon><chat-square /></el-icon> {{ 20 + i * 5 }}</span>
              </div>
            </div>
          </li>
        </ul>
      </div>
      
      <!-- Recommended Authors -->
      <div class="sidebar-section authors-section">
        <div class="section-header">
          <h3 class="section-title">开发作者</h3>
        </div>
        <div class="author-list">
          <div v-for="author in recommendedAuthors" :key="author.id" class="author-item">
            <div class="author-avatar-large" :style="{ backgroundImage: `url(${author.avatarUrl})` }"></div>
            <div class="author-info">
              <div class="author-name">{{ author.name }}</div>
              <div class="author-desc">{{ author.description }}</div>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  </el-aside>
</template>

<script setup>
import { ref } from 'vue';
import lchAvatar from '../../../assets/bloghome/lch.png'; 
import ljkAvatar from '../../../assets/bloghome/ljk.png';
import yghAvatar from '../../../assets/bloghome/ygh.png';

const recommendedAuthors = ref([
  {
    id: 1,
    name: '李持恒',
    avatarUrl: lchAvatar, // 使用导入的图片
    description: '前端开发',
    followers: 2560
  },
  {
    id: 2,
    name: '罗景康',
    avatarUrl: ljkAvatar,
    description: '后端开发',
    followers: 1890
  },
  {
    id: 3,
    name: '应国浩',
    avatarUrl: yghAvatar,
    description: '后端开发',
    followers: 3240
  }
]);
</script>

<style scoped>
/* Right Sidebar Styles */
.right-sidebar {
  background-color: white;
  border-left: 1px solid rgba(226, 232, 240, 0.8);
  height: calc(100vh - 70px);
  overflow: hidden;
  transition: width 0.3s;
}

.sidebar-inner {
  height: 100%;
  padding: 24px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.welcome-card {
  background: linear-gradient(135deg, #1e3a8a 0%, #1e40af 100%);
  border-radius: 16px;
  padding: 10px;
  color: white;
  box-shadow: 0 8px 24px rgba(30, 64, 175, 0.2);
}

.welcome-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
}

.welcome-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 12px;
}

.welcome-icon .el-icon {
  font-size: 20px;
}

.welcome-header h3 {
  font-size: 18px;
  font-weight: 600;
  margin: 0;
}

.welcome-card p {
  margin: 0 0 20px;
  opacity: 0.9;
  font-size: 14px;
  line-height: 1.5;
}


.sidebar-section {
  background-color: #f8fafc;
  border-radius: 16px;
  padding: 20px;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.section-title {
  font-size: 16px;
  font-weight: 700;
  color: #0f172a;
  margin: 0;
}


.trending-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.trending-item {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 8px;
  border-radius: 8px;
  transition: all 0.2s;
}

.trending-item:hover {
  background-color: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.trending-number {
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 28px;
  height: 28px;
  background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%);
  color: white;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 700;
}

.trending-content {
  flex: 1;
}

.trending-title {
  font-size: 14px;
  font-weight: 500;
  color: #0f172a;
  margin-bottom: 6px;
  display: block;
  line-height: 1.4;
}

.trending-meta {
  display: flex;
  gap: 12px;
}

.trending-views,
.trending-comments {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  color: #64748b;
}

.trending-meta .el-icon {
  font-size: 14px;
}

.authors-section {
  background-color: #f8fafc;
}

.author-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.author-item {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 12px;
  border-radius: 12px;
  background-color: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  transition: all 0.3s;
}

.author-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.08);
}

.author-avatar-large {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-size: cover;
  background-position: center;
  flex-shrink: 0;
}

.author-info {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.author-name {
  font-size: 15px;
  font-weight: 600;
  color: #0f172a;
  margin-bottom: 4px;
}

.author-desc {
  font-size: 12px;
  color: #64748b;
  margin-bottom: 8px;
  line-height: 1.4;
}


/* Responsive Adjustments */
@media (max-width: 1200px) {
  .right-sidebar {
    width: 260px !important;
  }
}

@media (max-width: 992px) {
  .right-sidebar {
    display: none;
  }
}
</style>    