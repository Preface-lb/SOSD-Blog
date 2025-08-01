<template>
  <div class="doc-viewer-container" :class="{ 'dark-mode': isDarkMode }">
    <!-- 阅读进度条 -->
    <div 
      class="reading-progress" 
      :style="{ width: `${readingProgress}%` }"
    />
    
    <!-- 顶部导航栏 -->
    <header class="doc-header">
      <div class="header-content">
        <div class="logo">
          <i class="fas fa-book-open" />
          <span class="logo-text">文档中心</span>
        </div>
        <DocToolbar 
          :doc-title="docTitle" 
          @back="handleBack"
          @share="handleShare"
          @toggle-dark="toggleDarkMode"
          :is-dark="isDarkMode"
          :progress="readingProgress"
        />
      </div>
    </header>

    <!-- 主要内容区 -->
    <div class="doc-container">
      <!-- 目录组件 -->
      <aside 
        class="doc-toc-container" 
        :class="{ 'show-toc': showToc, 'hidden-toc': !showToc && isMobile }"
        :style="{ maxHeight: `calc(100vh - ${headerHeight}px)` }"
      >
        <DocToc 
          :toc="toc" 
          :active-id="activeTocId"
          @scroll-to="scrollToAnchor"
        />
      </aside>

      <!-- 移动端目录切换按钮 -->
      <button 
        class="toc-toggle" 
        @click="toggleToc"
        v-if="isMobile"
        :aria-label="showToc ? '隐藏目录' : '显示目录'"
        :class="{ 'toc-open': showToc }"
      >
        <i :class="showToc ? 'fas fa-times' : 'fas fa-list'" />
      </button>

      <!-- 文档内容区 -->
      <main class="doc-content-wrapper">
        <div class="doc-content">
          <div class="content-header">
            <h1 class="doc-title">{{ docTitle }}</h1>
            <div class="doc-meta">
              <span class="last-updated">
                <i class="far fa-clock" />
                最后更新: {{ formatTime(lastUpdated) }}
              </span>
              <span class="reading-time">
                <i class="far fa-hourglass-half" />
                阅读时间: {{ readingTime }} 分钟
              </span>
            </div>
          </div>
          
          <!-- Markdown渲染组件 -->
          <MarkdownRenderer 
            :content="markdownContent" 
            @heading-visible="handleHeadingVisible"
            @scroll-progress="updateReadingProgress"
            ref="markdownRenderer"
          />
        </div>
      </main>
    </div>

    <!-- 回到顶部按钮
    <button 
      class="back-to-top" 
      @click="scrollToTop"
      :class="{ visible: showBackToTop }"
      aria-label="回到顶部"
    >
      <i class="fas fa-arrow-up" />
    </button> -->
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch, getCurrentInstance } from 'vue'
import { marked } from 'marked'
import DocToolbar from './components/DocToolbar.vue'
import DocToc from './components/DocToc.vue'
import MarkdownRenderer from './components/MarkdownRenderer.vue'

// 文档数据
const docTitle = ref('VuePress Plume 主题配置')
const lastUpdated = ref('2023-10-15T10:30:00Z')
const isDarkMode = ref(false)
const headerHeight = ref(64) // 头部高度，用于计算目录最大高度

// 阅读进度相关
const readingProgress = ref(0)
const showBackToTop = ref(false)
const markdownRenderer = ref<any>(null)

// 计算阅读时间（按每分钟200字估算）
const readingTime = computed(() => {
  const wordCount = markdownContent.value.trim().split(/\s+/).length
  return Math.ceil(wordCount / 200)
})

// 模拟Markdown内容
const markdownContent = ref(`# VuePress Plume 主题配置

欢迎使用 VuePress Plume 主题！本指南将详细介绍如何配置和使用这个主题，帮助你快速搭建专业的文档网站。

## 开始使用

首先，你需要安装 VuePress 和 Plume 主题。请确保你的 Node.js 版本 >= 16.14，推荐使用最新的 LTS 版本。

\`\`\`bash
# 使用 npm 安装
npm install vuepress@next @vuepress/plume@next

# 或者使用 yarn 安装
yarn add vuepress@next @vuepress/plume@next

# 或者使用 pnpm 安装
pnpm add vuepress@next @vuepress/plume@next
\`\`\`

## 基本配置

在你的 VuePress 配置文件中 (通常是 docs/.vuepress/config.ts) 配置主题：

\`\`\`ts
import { defineUserConfig } from 'vuepress'
import { plumeTheme } from '@vuepress/plume'

export default defineUserConfig({
  // 站点配置
  title: '我的文档',
  description: '这是一个使用 VuePress Plume 主题的文档站点',
  
  // 主题配置
  theme: plumeTheme({
    // 导航栏配置
    navbar: [
      { text: '首页', link: '/' },
      { text: '指南', link: '/guide/' },
      { text: '配置', link: '/config/' }
    ]
  }),
})
\`\`\`

## 主题特性

Plume 主题提供了以下丰富特性：

- 优雅的默认样式
- 全响应式设计
- 内置代码高亮
- 支持浅色/深色模式
`)

// 生成目录
const toc = ref<any[]>([])
const activeTocId = ref('')

const generateToc = (content: string) => {
  const tokens = marked.lexer(content)
  const headings = tokens.filter(token => token.type === 'heading')
  
  return headings.map((heading: any, index: number) => ({
    id: `heading-${index}-${heading.text.toLowerCase().replace(/\s+/g, '-')}`,
    text: heading.text,
    level: heading.depth
  }))
}

// 初始化目录
toc.value = generateToc(markdownContent.value)

// 处理标题可见性变化
const handleHeadingVisible = (visibleHeadings: string[]) => {
  if (visibleHeadings.length > 0) {
    activeTocId.value = visibleHeadings[0]
  }
}

// 更新阅读进度
const updateReadingProgress = (progress: number) => {
  readingProgress.value = progress
  showBackToTop.value = progress > 5 // 进度超过5%时显示回到顶部按钮
}

// 滚动到指定锚点
const scrollToAnchor = (id: string) => {
  if (markdownRenderer.value) {
    markdownRenderer.value.scrollToAnchor(id)
    
    // 在移动设备上滚动时自动隐藏目录
    if (isMobile.value) {
      showToc.value = false
    }
  }
}

// 回到顶部
const scrollToTop = () => {
  if (markdownRenderer.value) {
    markdownRenderer.value.scrollToTop()
  }
}

// 工具栏按钮处理函数
const handleBack = () => {
  console.log('返回上一级')
}

const handleShare = () => {
  if (navigator.share) {
    navigator.share({
      title: docTitle.value,
      text: '查看这篇文档',
      url: window.location.href
    }).catch(err => {
      console.error('分享失败:', err)
      copyToClipboard()
    })
  } else {
    copyToClipboard()
  }
}

// 复制链接到剪贴板
const copyToClipboard = () => {
  navigator.clipboard.writeText(window.location.href)
    .then(() => {
      alert('链接已复制到剪贴板')
    })
    .catch(err => {
      console.error('无法复制链接:', err)
      alert('复制失败，请手动复制链接')
    })
}

// 切换暗黑模式
const toggleDarkMode = () => {
  isDarkMode.value = !isDarkMode.value
  localStorage.setItem('darkMode', isDarkMode.value ? 'true' : 'false')
}

// 响应式相关
const isMobile = ref(window.innerWidth < 768)
const showToc = ref(!isMobile.value)

// 切换目录显示
const toggleToc = () => {
  showToc.value = !showToc.value
  document.body.style.overflow = showToc.value && isMobile.value ? 'hidden' : ''
}

// 格式化时间
const formatTime = (time: string) => {
  const date = new Date(time)
  return date.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

// 监听窗口大小变化
const handleResize = () => {
  const wasMobile = isMobile.value
  isMobile.value = window.innerWidth < 768
  
  if (!isMobile.value && wasMobile) {
    showToc.value = true
    document.body.style.overflow = ''
  }
}

onMounted(() => {
  window.addEventListener('resize', handleResize)
  
  // 从本地存储读取主题偏好
  const savedDarkMode = localStorage.getItem('darkMode')
  if (savedDarkMode !== null) {
    isDarkMode.value = savedDarkMode === 'true'
  } else {
    // 检查系统暗色模式偏好
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    isDarkMode.value = prefersDark
  }
  
  // 获取头部实际高度
  const header = document.querySelector('.doc-header')
  if (header) {
    headerHeight.value = (header as HTMLElement).offsetHeight
  }
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
  document.body.style.overflow = ''
})

// 监听内容变化重新生成目录
watch(markdownContent, (newContent) => {
  toc.value = generateToc(newContent)
})
</script>

<style scoped>
/* 基础样式 */
.doc-viewer-container {
  min-height: 100vh;
  background-color: #f8fafc;
  color: #334155;
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
  transition: background-color 0.3s ease, color 0.3s ease;
  overflow-x: hidden;
  max-width: 100vw;
}

/* 阅读进度条 */
.reading-progress {
  position: fixed;
  top: 0;
  left: 0;
  height: 3px;
  background-color: #3b82f6;
  z-index: 1000;
  transition: width 0.2s ease;
}

/* 暗黑模式 */
.doc-viewer-container.dark-mode {
  background-color: #0f172a;
  color: #e2e8f0;
}

.dark-mode .reading-progress {
  background-color: #60a5fa;
}

/* 头部样式 */
.doc-header {
  background-color: #ffffff;
  border-bottom: 1px solid #e2e8f0;
  position: sticky;
  top: 0;
  z-index: 100;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
}

.dark-mode .doc-header {
  background-color: #1e293b;
  border-bottom-color: #334155;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.15);
}

.header-content {
  max-width: 100vw;
  margin: 0 auto;
  padding: 0 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 64px;
}

.logo {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 0;
  transition: transform 0.2s ease;
}

.logo:hover {
  transform: translateY(-1px);
}

.logo i {
  font-size: 24px;
  color: #3b82f6;
}

.dark-mode .logo i {
  color: #60a5fa;
}

.logo-text {
  font-size: 18px;
  font-weight: 600;
  color: #1e293b;
}

.dark-mode .logo-text {
  color: #e2e8f0;
}

/* 工具栏样式 */
.toolbar {
  display: flex;
  align-items: center;
  gap: 16px;
  width: 100%;
  max-width: calc(100vw - 240px);
}

.toolbar-btn {
  background: none;
  border: none;
  width: 36px;
  height: 36px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #64748b;
  transition: all 0.2s ease;
}

.toolbar-btn:hover {
  background-color: #f1f5f9;
  color: #1e40af;
}

.dark-mode .toolbar-btn:hover {
  background-color: #334155;
  color: #93c5fd;
}

.toolbar-btn i {
  font-size: 18px;
}

.title-container {
  flex: 1;
  min-width: 0;
  padding: 0 8px;
}

.toolbar-title {
  margin: 0;
  font-size: 16px;
  font-weight: 500;
  color: #1e293b;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.dark-mode .toolbar-title {
  color: #e2e8f0;
}

.progress-bar {
  height: 4px;
  background-color: #e2e8f0;
  border-radius: 2px;
  margin-top: 6px;
  overflow: hidden;
}

.dark-mode .progress-bar {
  background-color: #334155;
}

.progress-fill {
  height: 100%;
  background-color: #3b82f6;
  border-radius: 2px;
  transition: width 0.3s ease;
}

.dark-mode .progress-fill {
  background-color: #60a5fa;
}

.toolbar-actions {
  display: flex;
  gap: 8px;
}

/* 主要内容区 */
.doc-container {
  display: flex;
  width: 100%;
  max-width: 100vw;
  margin: 0 auto;
  padding: 20px 0;
}

/* 目录容器样式 - 放大版 */
.doc-toc-container {
  flex: 0 0 420px; /* 宽度从260px增加到320px */
  padding: 0 20px; /* 内边距增加 */
  position: sticky;
  top: 74px;
  align-self: flex-start;
  overflow-y: auto;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.toc {
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  padding: 16px;
  transition: all 0.3s ease;
}

.dark-mode .toc {
  background-color: #1e293b;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.toc-header {
  margin-bottom: 16px;
}

.toc-header h3 {
  margin: 0 0 12px 0; /* 增加底部间距 */
  font-size: 22px; /* 标题字体放大 */
  font-weight: 600;
  color: #1e293b;
  display: flex;
  align-items: center;
  gap: 8px;
}

.toc-header h3::before {
  content: '';
  display: block;
  width: 4px;
  height: 16px;
  background-color: #3b82f6;
  border-radius: 2px;
}

.dark-mode .toc-header h3 {
  color: #e2e8f0;
}

.toc-divider {
  height: 1px;
  background-color: #e2e8f0;
}

.dark-mode .toc-divider {
  background-color: #334155;
}

.toc-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.toc-item {
  margin-bottom: 8px; /* 增加项之间的间距 */
}

.toc-link {
  display: flex;
  align-items: center;
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  padding: 10px 12px; /* 增加内边距，放大点击区域 */
  border-radius: 6px;
  cursor: pointer;
  color: #64748b;
  font-size: 16px; /* 字体放大 */
  transition: all 0.2s ease;
  position: relative;
  overflow: hidden;
}

.toc-link:hover {
  background-color: #f1f5f9;
  color: #1e40af;
}

.dark-mode .toc-link {
  color: #94a3b8;
}

.dark-mode .toc-link:hover {
  background-color: #334155;
  color: #93c5fd;
}

.toc-item.active .toc-link {
  color: #3b82f6;
  font-weight: 500;
  background-color: rgba(59, 130, 246, 0.05);
}

.dark-mode .toc-item.active .toc-link {
  color: #60a5fa;
  background-color: rgba(96, 165, 250, 0.1);
}

.toc-text {
  flex: 1;
  transition: all 0.2s ease;
}

.toc-indicator {
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 2px;
  background-color: #3b82f6;
  border-radius: 1px;
}

.dark-mode .toc-indicator {
  background-color: #60a5fa;
}

/* 目录层级缩进调整（配合宽度增加） */
.toc-item.level-2 .toc-link {
  padding-left: 24px; /* 增加缩进 */
}

.toc-item.level-3 .toc-link {
  padding-left: 48px; /* 增加缩进 */
}

.toc-item.level-4 .toc-link {
  padding-left: 72px; /* 增加缩进 */
}

/* 移动端目录样式 */
.doc-toc-container.hidden-toc {
  transform: translateX(100%);
}

.doc-toc-container.show-toc {
  transform: translateX(0);
}

/* 文档内容区 */
.doc-content-wrapper {
  flex: 1;
  padding: 0 20px;
  max-width: calc(100% - 320px); /* 配合目录宽度调整 */
}

.doc-content {
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  padding: 32px 40px;
  transition: all 0.3s ease;
  max-width: 1200px;
  margin: 0 auto;
}

.dark-mode .doc-content {
  background-color: #1e293b;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
}

.content-header {
  margin-bottom: 32px;
  padding-bottom: 20px;
  border-bottom: 1px solid #e2e8f0;
}

.dark-mode .content-header {
  border-bottom-color: #334155;
}

.doc-title {
  color: #1e293b;
  margin: 0 0 16px 0;
  font-size: 2.2rem;
  line-height: 1.3;
  position: relative;
  padding-bottom: 12px;
}

.doc-title::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: 0;
  width: 60px;
  height: 4px;
  background-color: #3b82f6;
  border-radius: 2px;
}

.dark-mode .doc-title {
  color: #e2e8f0;
}

.dark-mode .doc-title::after {
  background-color: #60a5fa;
}

.doc-meta {
  display: flex;
  gap: 20px;
  color: #64748b;
  font-size: 14px;
}

.dark-mode .doc-meta {
  color: #94a3b8;
}

.doc-meta i {
  margin-right: 6px;
}

/* Markdown渲染样式 */
.markdown-renderer {
  line-height: 1.8;
  font-size: 16px;
  max-height: calc(100vh - 64px - 320px);
  overflow-y: auto;
  scroll-behavior: smooth;
  padding-right: 8px;
}

.markdown-renderer h2,
.markdown-renderer h3,
.markdown-renderer h4 {
  color: #1e293b;
  margin-top: 2.5rem;
  margin-bottom: 1rem;
  font-weight: 600;
}

.dark-mode .markdown-renderer h2,
.dark-mode .markdown-renderer h3,
.dark-mode .markdown-renderer h4 {
  color: #e2e8f0;
}

.markdown-renderer h2 {
  font-size: 1.75rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #e2e8f0;
}

.dark-mode .markdown-renderer h2 {
  border-bottom-color: #334155;
}

.markdown-renderer h3 {
  font-size: 1.5rem;
}

.markdown-renderer h4 {
  font-size: 1.25rem;
}

.markdown-renderer p {
  margin-bottom: 1.25rem;
}

.markdown-renderer a {
  color: #3b82f6;
  text-decoration: none;
  transition: all 0.2s ease;
}

.markdown-renderer a:hover {
  color: #1d4ed8;
  text-decoration: underline;
}

.dark-mode .markdown-renderer a {
  color: #60a5fa;
}

.dark-mode .markdown-renderer a:hover {
  color: #93c5fd;
}

.markdown-renderer ul,
.markdown-renderer ol {
  margin-bottom: 1.25rem;
  padding-left: 1.5rem;
}

.markdown-renderer ul {
  list-style-type: disc;
}

.markdown-renderer ol {
  list-style-type: decimal;
}

.markdown-renderer li {
  margin-bottom: 0.5rem;
}

.markdown-renderer li p {
  margin-bottom: 0.5rem;
}

/* 代码块样式 */
.markdown-code {
  margin: 1.5rem 0;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.dark-mode .markdown-code {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.markdown-code code {
  font-family: 'Fira Code', monospace;
  font-size: 14px;
  display: block;
  padding: 1rem;
  overflow-x: auto;
  line-height: 1.6;
}

/* 表格样式 */
.markdown-table-container {
  overflow-x: auto;
  margin: 1.5rem 0;
}

.markdown-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 1rem;
}

.markdown-table th,
.markdown-table td {
  padding: 0.75rem 1rem;
  text-align: left;
  border-bottom: 1px solid #e2e8f0;
}

.dark-mode .markdown-table th,
.dark-mode .markdown-table td {
  border-bottom-color: #334155;
}

.markdown-table th {
  font-weight: 600;
  background-color: #f8fafc;
}

.dark-mode .markdown-table th {
  background-color: #0f172a;
}

.markdown-table tr:last-child td {
  border-bottom: none;
}

.markdown-table tr:hover td {
  background-color: #f1f5f9;
}

.dark-mode .markdown-table tr:hover td {
  background-color: #334155;
}

/* 移动端目录切换按钮 */
.toc-toggle {
  position: fixed;
  bottom: 24px;
  right: 24px;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background-color: #3b82f6;
  color: white;
  border: none;
  box-shadow: 0 4px 16px rgba(59, 130, 246, 0.4);
  cursor: pointer;
  z-index: 90;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.toc-toggle:hover {
  background-color: #2563eb;
  transform: translateY(-3px);
  box-shadow: 0 6px 20px rgba(59, 130, 246, 0.5);
}

.toc-toggle.toc-open {
  background-color: #ef4444;
  box-shadow: 0 4px 16px rgba(239, 68, 68, 0.4);
}

.toc-toggle.toc-open:hover {
  background-color: #dc2626;
}

.toc-toggle i {
  font-size: 20px;
}

/* 回到顶部按钮 */
.back-to-top {
  position: fixed;
  bottom: 24px;
  right: 96px;
  width: 52px;
  height: 52px;
  border-radius: 50%;
  background-color: #ffffff;
  color: #3b82f6;
  border: 1px solid #dbeafe;
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.15);
  cursor: pointer;
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 80;
}

.back-to-top.visible {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}

.back-to-top:not(.visible) {
  transform: translateY(20px);
}

.back-to-top:hover {
  background-color: #3b82f6;
  color: white;
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(59, 130, 246, 0.3);
}

.dark-mode .back-to-top {
  background-color: #1e293b;
  color: #93c5fd;
  border-color: #334155;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.dark-mode .back-to-top:hover {
  background-color: #3b82f6;
  color: white;
}

.back-to-top i {
  font-size: 20px;
}

/* 错误提示样式 */
.error-message {
  color: #dc2626;
  padding: 1rem;
  background-color: #fee2e2;
  border-radius: 6px;
  margin: 1rem 0;
}

.dark-mode .error-message {
  color: #fecaca;
  background-color: #4b0d0d;
}

/* 响应式调整 */
@media (max-width: 1200px) {
  .doc-container {
    padding: 15px 0;
  }
  
  .doc-content-wrapper {
    padding: 0 15px;
  }
}

@media (max-width: 768px) {
  .doc-container {
    flex-direction: column;
    padding: 10px 0;
  }
  
  .doc-content-wrapper {
    flex: none;
    width: 100%;
    max-width: 100%;
    padding: 0 10px;
    margin-top: 10px;
  }
  
  .doc-content {
    padding: 24px 16px;
    border-radius: 8px;
  }
  
  .doc-title {
    font-size: 1.8rem;
  }
  
  .markdown-renderer {
    max-height: calc(100vh - 64px - 260px);
    font-size: 15px;
  }
  
  .markdown-renderer h2 {
    font-size: 1.5rem;
  }
  
  .markdown-renderer h3 {
    font-size: 1.25rem;
  }
  
  .toolbar {
    max-width: calc(100vw - 120px);
  }
  
  .toolbar-title {
    font-size: 15px;
  }
  
  .toc-toggle {
    display: flex;
  }
  
  .doc-toc-container {
    display: block;
    position: fixed;
    top: 64px;
    right: 0;
    bottom: 0;
    width: 300px; /* 移动端目录宽度增加 */
    background-color: #fff;
    box-shadow: -4px 0 20px rgba(0, 0, 0, 0.1);
    z-index: 95;
    padding: 20px; /* 增加内边距 */
  }
  
  .dark-mode .doc-toc-container {
    background-color: #1e293b;
    box-shadow: -4px 0 20px rgba(0, 0, 0, 0.3);
  }
  
  .back-to-top {
    right: 24px;
    bottom: 96px;
    width: 48px;
    height: 48px;
  }
}

@media (max-width: 480px) {
  .header-content {
    padding: 0 12px;
  }
  
  .logo-text {
    font-size: 16px;
  }
  
  .doc-toc-container {
    width: 240px;
  }
  
  .doc-title {
    font-size: 1.5rem;
  }
  
  .toolbar-title {
    display: none;
  }
  
  .progress-bar {
    display: none;
  }
}
</style>
