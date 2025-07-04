<template>
  <div>
    <div class="content-header">
      <h1 class="page-title">关注内容</h1>
      <p class="page-subtitle">查看您关注的作者和话题的最新内容</p>
    </div>
    
    <div class="content-grid">
      <div class="featured-article">
        <div class="article-image"></div>
        <div class="article-content">
          <div class="article-category">关注推荐</div>
          <h2 class="article-title">来自您关注的作者的热门文章</h2>
          <p class="article-excerpt">这是一篇来自您关注的作者的热门文章，内容丰富且实用。本文探讨了最新的技术趋势和开发实践，帮助您保持技术领先。</p>
          <div class="article-meta">
            <div class="author">
              <div class="author-avatar"></div>
              <span>关注作者</span>
            </div>
            <div class="article-stats">
              <span><el-icon><View /></el-icon> 1.8k</span>
              <span><el-icon><chat-square /></el-icon> 36</span>
              <span><el-icon><star /></el-icon> 124</span>
            </div>
          </div>
        </div>
      </div>
      
      <div class="articles-grid">
        <div class="article-card" v-for="i in 6" :key="i">
          <div class="article-card-image"></div>
          <div class="article-card-content">
            <div class="article-card-category">关注推荐</div>
            <h3 class="article-card-title">关注作者文章 {{ i }}</h3>
            <p class="article-card-excerpt">这是一篇来自您关注的作者的文章，内容丰富且实用...</p>
            <div class="article-card-meta">
              <span class="article-card-author">关注作者 {{ i }}</span>
              <span class="article-card-date">3小时前</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>

</script>

<style scoped>
/* Content Header Styles */
.content-header {
  margin-bottom: 32px;
  text-align: center;
}

.page-title {
  font-size: 32px;
  font-weight: 800;
  margin: 0 0 8px;
  background: linear-gradient(90deg, #1e3a8a 0%, #1e40af 50%, #3b82f6 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  letter-spacing: -0.5px;
}

.page-subtitle {
  font-size: 16px;
  color: #64748b;
  margin: 0 0 20px;
}

/* Content Grid Styles */
.content-grid {
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.featured-article {
  display: flex;
  background-color: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
  transition: all 0.3s;
}

.featured-article:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
}

.article-image {
  flex: 0 0 40%;
  background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%);
  position: relative;
  overflow: hidden;
}

.article-image::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('https://placeholder.pics/svg/600x400/FFFFFF-FFFFFF/1E40AF-3B82F6/关注内容') center/cover no-repeat;
  opacity: 0.2;
}

.article-content {
  flex: 1;
  padding: 32px;
}

.article-category {
  display: inline-block;
  padding: 4px 12px;
  background-color: rgba(30, 64, 175, 0.1);
  color: #1e40af;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  margin-bottom: 16px;
}

.article-title {
  font-size: 24px;
  font-weight: 700;
  margin: 0 0 16px;
  color: #0f172a;
  line-height: 1.3;
}

.article-excerpt {
  font-size: 15px;
  line-height: 1.6;
  color: #64748b;
  margin: 0 0 24px;
}

.article-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.author {
  display: flex;
  align-items: center;
  gap: 10px;
}

.author-avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%);
}

.article-stats {
  display: flex;
  gap: 16px;
}

.article-stats span {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  color: #64748b;
}

.article-stats .el-icon {
  font-size: 16px;
}

.articles-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

.article-card {
  background-color: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  transition: all 0.3s;
}

.article-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
}

.article-card-image {
  height: 160px;
  background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%);
  position: relative;
}

.article-card-image::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('https://placeholder.pics/svg/400x200/FFFFFF-FFFFFF/1E40AF-3B82F6/关注文章') center/cover no-repeat;
  opacity: 0.2;
}

.article-card-content {
  padding: 20px;
}

.article-card-category {
  display: inline-block;
  padding: 3px 10px;
  background-color: rgba(30, 64, 175, 0.1);
  color: #1e40af;
  border-radius: 16px;
  font-size: 11px;
  font-weight: 600;
  margin-bottom: 12px;
}

.article-card-title {
  font-size: 18px;
  font-weight: 700;
  margin: 0 0 12px;
  color: #0f172a;
  line-height: 1.3;
}

.article-card-excerpt {
  font-size: 14px;
  line-height: 1.5;
  color: #64748b;
  margin: 0 0 16px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.article-card-meta {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: #94a3b8;
}

.article-card-author {
  font-weight: 500;
  color: #1e40af;
}

/* Responsive Adjustments */
@media (max-width: 1400px) {
  .articles-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 1200px) {
  .featured-article {
    flex-direction: column;
  }
  
  .article-image {
    height: 200px;
    flex: none;
  }
}

@media (max-width: 992px) {
  .articles-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 576px) {
  .page-title {
    font-size: 24px;
  }
  
  .page-subtitle {
    font-size: 14px;
  }
}
</style>