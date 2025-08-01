<template>
  <div 
    class="markdown-renderer" 
    v-html="renderedContent"
    @scroll="handleScroll"
    ref="markdownContainer"
  />
</template>

<script setup lang="ts">
import { ref, watch, defineProps, defineEmits } from 'vue'
import { marked } from 'marked'
import hljs from 'highlight.js'
import 'highlight.js/styles/github-dark-dimmed.css'

// 配置 marked 的代码高亮
marked.setOptions({
  highlight: function(code, lang) {
    if (lang && hljs.getLanguage(lang)) {
      return hljs.highlight(code, { language: lang }).value
    }
    return hljs.highlightAuto(code).value
  },
  breaks: true,
  gfm: true
})

const props = defineProps({
  content: {
    type: String,
    required: true,
    default: ''
  }
})

const emit = defineEmits(['heading-visible', 'scroll-progress'])

const renderedContent = ref('')
const markdownContainer = ref<HTMLElement | null>(null)

// 渲染 Markdown 内容（直接使用 marked 处理）
const renderMarkdown = (content: string) => {
  return marked(content)
}

// 监听内容变化重新渲染
watch(() => props.content, (newContent) => {
  try {
    renderedContent.value = renderMarkdown(newContent)
  } catch (error) {
    console.error('Error rendering markdown:', error)
    renderedContent.value = `<div class="error-message">无法渲染文档内容: ${error}</div>`
  }
}, { immediate: true })

// 处理滚动事件
const handleScroll = () => {
  if (!markdownContainer.value) return

  const container = markdownContainer.value
  const scrollTop = container.scrollTop
  const scrollHeight = container.scrollHeight
  const clientHeight = container.clientHeight

  const progress = ((scrollTop + clientHeight) / scrollHeight) * 100
  emit('scroll-progress', Math.min(100, Math.max(0, progress)))

  // 检查哪些标题在视口中（仍然支持，但标题不再有 id）
  const headings = container.querySelectorAll('h1, h2, h3, h4, h5, h6')
  const visibleHeadings: string[] = []

  headings.forEach(heading => {
    const rect = heading.getBoundingClientRect()
    if (rect.top >= 0 && rect.top <= window.innerHeight * 0.3) {
      visibleHeadings.push(heading.textContent || '')
    }
  })

  if (visibleHeadings.length > 0) {
    emit('heading-visible', visibleHeadings)
  }
}

// 滚动方法（保留接口，供父组件调用）
const scrollToTop = () => {
  if (markdownContainer.value) {
    markdownContainer.value.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

defineExpose({
  scrollToTop
})
</script>


<style scoped>
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

/* 响应式调整 */
@media (max-width: 768px) {
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
}
</style>
