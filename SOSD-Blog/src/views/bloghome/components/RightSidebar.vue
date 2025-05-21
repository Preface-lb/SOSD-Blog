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
        <p>发现今日热门技术话题，参与讨论并分享您的见解。</p>
        <el-button type="primary" class="welcome-button">开始探索</el-button>
      </div>
      
      <!-- Trending Articles -->
      <div class="sidebar-section trending-section">
        <div class="section-header">
          <h3 class="section-title">热门文章</h3>
          <el-button text class="view-all-btn">查看全部</el-button>
        </div>
        <ul class="trending-list">
          <li v-for="i in 5" :key="i" class="trending-item">
            <span class="trending-number">{{ i }}</span>
            <div class="trending-content">
              <span class="trending-title">热门技术文章标题 {{ i }}</span>
              <div class="trending-meta">
                <span class="trending-views"><el-icon><view /></el-icon> {{ 1000 + i * 200 }}</span>
                <span class="trending-comments"><el-icon><chat-square /></el-icon> {{ 20 + i * 5 }}</span>
              </div>
            </div>
          </li>
        </ul>
      </div>
      
      <!-- Recommended Authors -->
      <div class="sidebar-section authors-section">
        <div class="section-header">
          <h3 class="section-title">推荐作者</h3>
          <el-button text class="view-all-btn">更多作者</el-button>
        </div>
        <div class="author-list">
          <div v-for="i in 3" :key="i" class="author-item">
            <div class="author-avatar-large"></div>
            <div class="author-info">
              <div class="author-name">技术作者 {{ i }}</div>
              <div class="author-desc">{{ ['前端架构师', '全栈开发专家', 'AI研究员'][i-1] }}</div>
              <el-button size="small" class="follow-btn">关注</el-button>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Events Card -->
      <div class="events-card">
        <div class="events-header">
          <h3 class="events-title">近期活动</h3>
          <el-icon class="events-icon"><calendar /></el-icon>
        </div>
        <div class="event-item">
          <div class="event-date">
            <span class="event-month">五月</span>
            <span class="event-day">25</span>
          </div>
          <div class="event-details">
            <div class="event-name">前端技术分享会</div>
            <div class="event-location">
              <el-icon><location /></el-icon>
              <span>线上直播</span>
            </div>
          </div>
        </div>
        <div class="event-item">
          <div class="event-date">
            <span class="event-month">六月</span>
            <span class="event-day">10</span>
          </div>
          <div class="event-details">
            <div class="event-name">AI开发者大会</div>
            <div class="event-location">
              <el-icon><location /></el-icon>
              <span>北京国际会议中心</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </el-aside>
</template>

<script setup>
import { 
  MagicStick,
  View,
  ChatSquare,
  Calendar,
  Location
} from '@element-plus/icons-vue'
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
  padding: 24px;
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

.welcome-button {
  background-color: white;
  color: #1e40af;
  border: none;
  font-weight: 600;
  width: 100%;
  transition: all 0.3s;
}

.welcome-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  background-color: white;
  color: #1e40af;
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

.view-all-btn {
  font-size: 12px;
  color: #1e40af;
  padding: 0;
  height: auto;
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
  background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%);
  flex-shrink: 0;
}

.author-info {
  flex: 1;
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
}

.follow-btn {
  background-color: rgba(30, 64, 175, 0.1);
  color: #1e40af;
  border: none;
  font-weight: 500;
  padding: 4px 12px;
  height: 28px;
  transition: all 0.3s;
}

.follow-btn:hover {
  background-color: #1e40af;
  color: white;
}

.events-card {
  background-color: #f8fafc;
  border-radius: 16px;
  padding: 20px;
}

.events-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.events-title {
  font-size: 16px;
  font-weight: 700;
  color: #0f172a;
  margin: 0;
}

.events-icon {
  font-size: 18px;
  color: #1e40af;
}

.event-item {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 12px;
  background-color: white;
  border-radius: 12px;
  margin-bottom: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  transition: all 0.3s;
}

.event-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.08);
}

.event-date {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%);
  color: white;
  border-radius: 12px;
  flex-shrink: 0;
}

.event-month {
  font-size: 10px;
  text-transform: uppercase;
  font-weight: 500;
}

.event-day {
  font-size: 18px;
  font-weight: 700;
}

.event-details {
  flex: 1;
}

.event-name {
  font-size: 14px;
  font-weight: 600;
  color: #0f172a;
  margin-bottom: 4px;
}

.event-location {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  color: #64748b;
}

.event-location .el-icon {
  font-size: 14px;
  color: #1e40af;
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