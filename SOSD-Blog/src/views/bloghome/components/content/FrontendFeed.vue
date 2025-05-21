<template>
  <div>
    <div class="content-header">
      <h1 class="page-title">前端开发</h1>
      <p class="page-subtitle">探索用户界面设计、前端框架和Web开发最新趋势</p>
      
      <div class="featured-tags">
        <div class="tag" v-for="tag in ['JavaScript', 'React', 'Vue', 'CSS', 'TypeScript', 'Next.js']" :key="tag">
          {{ tag }}
        </div>
      </div>
    </div>
    
    <div class="content-grid">
      <div class="featured-article">
        <div class="article-image"></div>
        <div class="article-content">
          <div class="article-category">前端开发</div>
          <h2 class="article-title">2025年前端开发趋势：新框架与技术展望</h2>
          <p class="article-excerpt">随着Web技术的不断发展，前端开发领域正在经历前所未有的变革。本文将深入探讨2025年前端开发的关键趋势，包括新兴框架、性能优化技术和开发工具链的演进。</p>
          <div class="article-meta">
            <div class="author">
              <div class="author-avatar"></div>
              <span>张前端</span>
            </div>
            <div class="article-stats">
              <span><el-icon><view /></el-icon> 2.4k</span>
              <span><el-icon><chat-square /></el-icon> 48</span>
              <span><el-icon><star /></el-icon> 156</span>
            </div>
          </div>
        </div>
      </div>
      
      <div class="articles-grid">
        <div class="article-card" v-for="i in 6" :key="i">
          <div class="article-card-image"></div>
          <div class="article-card-content">
            <div class="article-card-category">前端开发</div>
            <h3 class="article-card-title">前端技术文章 {{ i }}</h3>
            <p class="article-card-excerpt">这是一篇关于前端开发的文章，内容丰富且实用...</p>
            <div class="article-card-meta">
              <span class="article-card-author">前端开发者 {{ i }}</span>
              <span class="article-card-date">2小时前</span>
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

.featured-tags {
  display: flex;
  justify-content: center;
  gap: 12px;
  flex-wrap: wrap;
}

.tag {
  padding: 6px 14px;
  background-color: white;
  border-radius: 20px;
  font-size: 13px;
  font-weight: 500;
  color: #1e40af;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
  transition: all 0.3s;
  cursor: pointer;
}

.tag:hover {
  background-color: #1e40af;
  color: white;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(30, 64, 175, 0.2);
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
  background: url('https://placeholder.pics/svg/600x400/FFFFFF-FFFFFF/1E40AF-3B82F6/前端开发') center/cover no-repeat;
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
  background: url('https://placeholder.pics/svg/400x200/FFFFFF-FFFFFF/1E40AF-3B82F6/前端文章') center/cover no-repeat;
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