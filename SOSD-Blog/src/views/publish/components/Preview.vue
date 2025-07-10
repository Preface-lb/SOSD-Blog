<template>
  <div class="preview-container">
    <div class="preview-header">
      <div class="preview-title">
        <i class="fa fa-eye"></i>
        预览模式
      </div>
      <div class="preview-actions">
        <button @click="toggleFullscreen" class="preview-btn" title="全屏预览">
          <i :class="isFullscreen ? 'fa fa-compress' : 'fa fa-expand'"></i>
        </button>
        <button @click="printDocument" class="preview-btn" title="打印">
          <i class="fa fa-print"></i>
        </button>
        <button @click="exportToPDF" class="preview-btn" title="导出PDF">
          <i class="fa fa-file-pdf-o"></i>
        </button>
      </div>
    </div>
    
    <div 
      ref="previewContent" 
      class="preview-content" 
      :class="{ fullscreen: isFullscreen }"
      v-html="sanitizedContent"
    ></div>
    
    <div v-if="isFullscreen" class="fullscreen-overlay" @click="toggleFullscreen"></div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import DOMPurify from 'dompurify'

const props = defineProps({
  content: {
    type: String,
    default: ''
  },
  title: {
    type: String,
    default: '文档预览'
  }
})

const previewContent = ref(null)
const isFullscreen = ref(false)

// 清理HTML内容
const sanitizedContent = computed(() => {
  return DOMPurify.sanitize(props.content, {
    ALLOWED_TAGS: [
      'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
      'p', 'br', 'strong', 'em', 'u', 's',
      'ul', 'ol', 'li',
      'blockquote', 'pre', 'code',
      'a', 'img',
      'table', 'thead', 'tbody', 'tr', 'th', 'td',
      'hr', 'mark'
    ],
    ALLOWED_ATTR: [
      'href', 'target', 'rel',
      'src', 'alt', 'width', 'height',
      'class', 'style'
    ]
  })
})

// 切换全屏
const toggleFullscreen = () => {
  isFullscreen.value = !isFullscreen.value
  
  if (isFullscreen.value) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
}

// 打印文档
const printDocument = () => {
  const printWindow = window.open('', '_blank')
  printWindow.document.write(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>${props.title}</title>
      <style>
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          line-height: 1.8;
          color: #333;
          max-width: 800px;
          margin: 0 auto;
          padding: 40px 20px;
        }
        h1, h2, h3, h4, h5, h6 {
          margin-top: 2em;
          margin-bottom: 0.5em;
          font-weight: 600;
          line-height: 1.25;
        }
        h1 { font-size: 2.5em; }
        h2 { font-size: 2em; }
        h3 { font-size: 1.5em; }
        p { margin-bottom: 1em; }
        ul, ol { margin-bottom: 1em; padding-left: 2em; }
        li { margin: 0.5em 0; }
        blockquote {
          border-left: 4px solid #165DFF;
          padding-left: 1em;
          margin: 1em 0;
          font-style: italic;
          background: #f8f9ff;
          padding: 1em;
          border-radius: 4px;
        }
        pre, code {
          background: #f5f5f5;
          border-radius: 4px;
          font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
        }
        pre {
          padding: 1em;
          margin: 1em 0;
          overflow-x: auto;
        }
        code {
          padding: 0.2em 0.4em;
        }
        img {
          max-width: 100%;
          height: auto;
          border-radius: 8px;
          margin: 1em 0;
        }
        table {
          border-collapse: collapse;
          width: 100%;
          margin: 1em 0;
        }
        td, th {
          border: 1px solid #ddd;
          padding: 8px 12px;
          text-align: left;
        }
        th {
          background-color: #f8f9fa;
          font-weight: 600;
        }
        hr {
          border: none;
          border-top: 2px solid #e9ecef;
          margin: 2em 0;
        }
        a {
          color: #165DFF;
          text-decoration: none;
        }
        mark {
          background-color: #fff3cd;
          padding: 0.1em 0.2em;
          border-radius: 2px;
        }
        @media print {
          body { padding: 20px; }
          h1 { page-break-before: always; }
          h1:first-child { page-break-before: avoid; }
          h1, h2, h3, h4, h5, h6 { page-break-after: avoid; }
          img { page-break-inside: avoid; }
          table { page-break-inside: avoid; }
        }
      </style>
    </head>
    <body>
      ${sanitizedContent.value}
    </body>
    </html>
  `)
  printWindow.document.close()
  printWindow.print()
}

// 导出PDF
const exportToPDF = async () => {
  try {
    // 使用专门的PDF生成库，如html2pdf.js
    // 首先需要安装: npm install html2pdf.js
    // 然后引入: import html2pdf from 'html2pdf.js'
    
    // 为了演示，我们使用浏览器的打印功能转换为PDF
    const printWindow = window.open('', '_blank')
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>${props.title}</title>
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.8;
            color: #333;
            max-width: 800px;
            margin: 0 auto;
            padding: 40px 20px;
          }
          h1, h2, h3, h4, h5, h6 {
            margin-top: 2em;
            margin-bottom: 0.5em;
            font-weight: 600;
            line-height: 1.25;
          }
          h1 { font-size: 2.5em; border-bottom: 2px solid #e9ecef; padding-bottom: 0.3em; }
          h2 { font-size: 2em; }
          h3 { font-size: 1.5em; }
          h4 { font-size: 1.25em; }
          h5 { font-size: 1.1em; }
          h6 { font-size: 1em; }
          p { margin-bottom: 1em; text-align: justify; }
          ul, ol { margin-bottom: 1em; padding-left: 2em; }
          li { margin: 0.5em 0; }
          blockquote {
            border-left: 4px solid #165DFF;
            padding-left: 1.5em;
            margin: 1.5em 0;
            font-style: italic;
            background: #f8f9ff;
            padding: 1.5em;
            border-radius: 8px;
          }
          pre {
            background: #f8f9fa;
            border: 1px solid #e9ecef;
            border-radius: 8px;
            padding: 1.5em;
            font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
            font-size: 14px;
            margin: 1.5em 0;
            overflow-x: auto;
            line-height: 1.5;
          }
          code {
            background: #f8f9fa;
            border: 1px solid #e9ecef;
            border-radius: 4px;
            padding: 0.2em 0.4em;
            font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
            font-size: 0.9em;
          }
          img {
            max-width: 100%;
            height: auto;
            border-radius: 8px;
            margin: 1.5em 0;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          }
          table {
            border-collapse: collapse;
            width: 100%;
            margin: 1.5em 0;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
            border-radius: 8px;
            overflow: hidden;
          }
          td, th {
            border: 1px solid #e9ecef;
            padding: 12px 16px;
            text-align: left;
          }
          th {
            background-color: #f8f9fa;
            font-weight: 600;
            color: #495057;
          }
          tr:nth-child(even) { background-color: #f8f9fa; }
          hr {
            border: none;
            border-top: 2px solid #e9ecef;
            margin: 3em 0;
          }
          a {
            color: #165DFF;
            text-decoration: none;
            border-bottom: 1px solid transparent;
          }
          a:hover { border-bottom-color: #165DFF; }
          mark {
            background-color: #fff3cd;
            padding: 0.2em 0.4em;
            border-radius: 4px;
            color: #856404;
          }
          strong { font-weight: 700; }
          em { font-style: italic; }
          
          @media print {
            body { padding: 20px; }
            h1 { page-break-before: always; }
            h1:first-child { page-break-before: avoid; }
            h1, h2, h3, h4, h5, h6 { page-break-after: avoid; }
            img { page-break-inside: avoid; }
            table { page-break-inside: avoid; }
            a { color: #333; text-decoration: underline; }
          }
        </style>
      </head>
      <body>
        ${sanitizedContent.value}

      </body>

      </html>
    `)
    printWindow.document.close()
  } catch (error) {
    console.error('导出PDF失败:', error)
    alert('导出PDF失败，请重试')
  }
}

// 键盘事件处理
const handleKeydown = (e) => {
  if (e.key === 'Escape' && isFullscreen.value) {
    toggleFullscreen()
  }
}

onMounted(() => {
  document.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown)
  if (isFullscreen.value) {
    document.body.style.overflow = ''
  }
})
</script>

<style scoped>
.preview-container {
  height: 100%;
  display: flex;
  flex-direction: column;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.preview-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  border-bottom: 1px solid #e9ecef;
  background: #f8f9fa;
  border-radius: 8px 8px 0 0;
}

.preview-title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 600;
  color: #495057;
}

.preview-actions {
  display: flex;
  gap: 4px;
}

.preview-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border: none;
  background: transparent;
  border-radius: 4px;
  cursor: pointer;
  color: #6c757d;
  transition: all 0.2s ease;
}

.preview-btn:hover {
  background: #e9ecef;
  color: #165DFF;
}

.preview-content {
  flex: 1;
  padding: 32px;
  overflow-y: auto;
  line-height: 1.8;
  font-size: 16px;
  color: #333;
}

.preview-content.fullscreen {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 9999;
  background: white;
  border-radius: 0;
  padding: 60px;
  box-shadow: none;
}

.fullscreen-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  z-index: 9998;
}

.preview-content :deep(h1) {
  font-size: 2.5em;
  font-weight: 700;
  margin: 2em 0 0.5em 0;
  color: #1a1a1a;
  border-bottom: 2px solid #e9ecef;
  padding-bottom: 0.3em;
}

.preview-content :deep(h1:first-child) {
  margin-top: 0;
}

.preview-content :deep(h2) {
  font-size: 2em;
  font-weight: 600;
  margin: 1.8em 0 0.5em 0;
  color: #1a1a1a;
}

.preview-content :deep(h3) {
  font-size: 1.5em;
  font-weight: 600;
  margin: 1.5em 0 0.5em 0;
  color: #1a1a1a;
}

.preview-content :deep(h4) {
  font-size: 1.25em;
  font-weight: 600;
  margin: 1.3em 0 0.5em 0;
  color: #1a1a1a;
}

.preview-content :deep(h5) {
  font-size: 1.1em;
  font-weight: 600;
  margin: 1.2em 0 0.5em 0;
  color: #1a1a1a;
}

.preview-content :deep(h6) {
  font-size: 1em;
  font-weight: 600;
  margin: 1.1em 0 0.5em 0;
  color: #1a1a1a;
}

.preview-content :deep(p) {
  margin: 1em 0;
  text-align: justify;
}

.preview-content :deep(ul), 
.preview-content :deep(ol) {
  padding-left: 2em;
  margin: 1em 0;
}

.preview-content :deep(li) {
  margin: 0.5em 0;
}

.preview-content :deep(blockquote) {
  border-left: 4px solid #165DFF;
  padding-left: 1.5em;
  margin: 1.5em 0;
  font-style: italic;
  background: #f8f9ff;
  padding: 1.5em;
  border-radius: 8px;
  position: relative;
}

.preview-content :deep(blockquote::before) {
  content: '"';
  font-size: 4em;
  color: #165DFF;
  position: absolute;
  top: -10px;
  left: 10px;
  opacity: 0.3;
}

.preview-content :deep(pre) {
  background: #f8f9fa;
  border: 1px solid #e9ecef;
  border-radius: 8px;
  padding: 1.5em;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  font-size: 14px;
  margin: 1.5em 0;
  overflow-x: auto;
  line-height: 1.5;
}

.preview-content :deep(code) {
  background: #f8f9fa;
  border: 1px solid #e9ecef;
  border-radius: 4px;
  padding: 0.2em 0.4em;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  font-size: 0.9em;
}

.preview-content :deep(pre code) {
  background: none;
  border: none;
  padding: 0;
}

.preview-content :deep(img) {
  max-width: 100%;
  height: auto;
  border-radius: 8px;
  margin: 1.5em 0;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  display: block;
  margin-left: auto;
  margin-right: auto;
}

.preview-content :deep(table) {
  border-collapse: collapse;
  width: 100%;
  margin: 1.5em 0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  overflow: hidden;
}

.preview-content :deep(td), 
.preview-content :deep(th) {
  border: 1px solid #e9ecef;
  padding: 12px 16px;
  text-align: left;
}

.preview-content :deep(th) {
  background-color: #f8f9fa;
  font-weight: 600;
  color: #495057;
}

.preview-content :deep(tr:nth-child(even)) {
  background-color: #f8f9fa;
}

.preview-content :deep(hr) {
  border: none;
  border-top: 2px solid #e9ecef;
  margin: 3em 0;
  position: relative;
}

.preview-content :deep(hr::after) {
  content: '***';
  position: absolute;
  top: -12px;
  left: 50%;
  transform: translateX(-50%);
  background: white;
  padding: 0 16px;
  color: #6c757d;
  font-size: 14px;
}

.preview-content :deep(a) {
  color: #165DFF;
  text-decoration: none;
  border-bottom: 1px solid transparent;
  transition: border-color 0.2s ease;
}

.preview-content :deep(a:hover) {
  border-bottom-color: #165DFF;
}

.preview-content :deep(mark) {
  background-color: #fff3cd;
  padding: 0.2em 0.4em;
  border-radius: 4px;
  color: #856404;
}

.preview-content :deep(strong) {
  font-weight: 700;
  color: #1a1a1a;
}

.preview-content :deep(em) {
  font-style: italic;
  color: #495057;
}

@media (max-width: 768px) {
  .preview-content {
    padding: 20px;
  }
  
  .preview-content.fullscreen {
    padding: 20px;
  }
  
  .preview-content :deep(h1) {
    font-size: 2em;
  }
  
  .preview-content :deep(h2) {
    font-size: 1.5em;
  }
  
  .preview-content :deep(h3) {
    font-size: 1.25em;
  }
}

@media print {
  .preview-header {
    display: none;
  }
  
  .preview-content {
    padding: 0;
    box-shadow: none;
  }
}
</style>