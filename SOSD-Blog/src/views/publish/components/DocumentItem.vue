<template>
  <div 
    :class="['document-item', { active: selected }]" 
    @click="selectDocument"
  >
    <div class="document-content">
      <div class="document-header">
        <h3 class="document-title">
          {{ document.title || '未命名文档' }}
        </h3>
        <div class="document-actions">
          <button 
            @click.stop="toggleFavorite" 
            :class="['action-btn', 'favorite-btn', { active: document.isFavorite }]"
            :title="document.isFavorite ? '取消收藏' : '收藏'"
          >
            <i :class="document.isFavorite ? 'fas fa-star' : 'fas fa-star-o'"></i>
          </button>
          <div class="dropdown">
            <button @click.stop="toggleDropdown" class="action-btn dropdown-btn">
              <i class="fas fa-ellipsis-v"></i>
            </button>
            <div v-if="showDropdown" class="dropdown-menu">
              <button @click.stop="duplicateDocument" class="dropdown-item">
                <i class="fas fa-copy"></i>
                复制文档
              </button>
              <button @click.stop="exportDocument" class="dropdown-item">
                <i class="fas fa-download"></i>
                导出
              </button>
              <div class="dropdown-divider"></div>
              <button @click.stop="deleteDocument" class="dropdown-item danger">
                <i class="fas fa-trash"></i>
                删除
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <div class="document-preview">
        {{ getPreviewText() }}
      </div>
      
      <div class="document-meta">
        <div class="meta-row">
          <span class="meta-item">
            <i class="fas fa-calendar-o"></i>
            {{ formatDate(document.updatedAt || document.createdAt) }}
          </span>
          <span class="meta-item">
            <i class="fas fa-file-text-o"></i>
            {{ document.wordCount || 0 }} 字
          </span>
        </div>
        
        <div v-if="document.tags && document.tags.length" class="document-tags">
          <span 
            v-for="tag in document.tags.slice(0, 3)" 
            :key="tag" 
            class="tag"
          >
            {{ tag }}
          </span>
          <span v-if="document.tags.length > 3" class="tag more">
            +{{ document.tags.length - 3 }}
          </span>
        </div>
      </div>
    </div>
    
    <div v-if="document.status" class="document-status" :class="document.status">
      <i :class="getStatusIcon()"></i>
      {{ getStatusText() }}
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  document: {
    type: Object,
    required: true
  },
  selected: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['select', 'delete', 'duplicate', 'toggle-favorite'])

const showDropdown = ref(false)

// 格式化日期
const formatDate = (dateString) => {
  if (!dateString) return ''
  const date = new Date(dateString)
  const now = new Date()
  const diff = now - date
  
  // 小于1分钟
  if (diff < 60000) {
    return '刚刚'
  }
  
  // 小于1小时
  if (diff < 3600000) {
    return `${Math.floor(diff / 60000)}分钟前`
  }
  
  // 小于1天
  if (diff < 86400000) {
    return `${Math.floor(diff / 3600000)}小时前`
  }
  
  // 小于7天
  if (diff < 604800000) {
    return `${Math.floor(diff / 86400000)}天前`
  }
  
  // 超过7天显示具体日期
  return date.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  })
}

// 获取预览文本
const getPreviewText = () => {
  if (!props.document.content) return '暂无内容'
  
  // 移除HTML标签
  const text = props.document.content.replace(/<[^>]*>/g, '')
  return text.length > 100 ? text.substring(0, 100) + '...' : text
}

// 获取状态图标
const getStatusIcon = () => {
  switch (props.document.status) {
    case 'draft': return 'fas fa-edit'
    case 'published': return 'fas fa-globe'
    case 'archived': return 'fas fa-archive'
    default: return 'fas fa-file-o'
  }
}

// 获取状态文本
const getStatusText = () => {
  switch (props.document.status) {
    case 'draft': return '草稿'
    case 'published': return '已发布'
    case 'archived': return '已归档'
    default: return ''
  }
}

// 选择文档
const selectDocument = () => {
  emit('select', props.document.id)
}

// 切换收藏状态
const toggleFavorite = () => {
  emit('toggle-favorite', props.document.id)
}

// 切换下拉菜单
const toggleDropdown = () => {
  showDropdown.value = !showDropdown.value
}

// 复制文档
const duplicateDocument = () => {
  emit('duplicate', props.document.id)
  showDropdown.value = false
}

// 导出文档
const exportDocument = () => {
  // 创建下载链接
  const content = props.document.content || ''
  const blob = new Blob([content], { type: 'text/html' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `${props.document.title || '未命名文档'}.html`
  a.click()
  URL.revokeObjectURL(url)
  showDropdown.value = false
}

// 删除文档
const deleteDocument = () => {
  if (confirm('确定要删除这个文档吗？此操作不可撤销。')) {
    emit('delete', props.document.id)
  }
  showDropdown.value = false
}

// 点击外部关闭下拉菜单
const handleClickOutside = (event) => {
  if (!event.target.closest('.dropdown')) {
    showDropdown.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<style scoped>
.document-item {
  position: relative;
  padding: 16px;
  border-radius: 8px;
  margin-bottom: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
  border: 1px solid transparent;
  background: white;
}

.document-item:hover {
  background: #f8f9fa;
  border-color: #e9ecef;
  transform: translateY(-1px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.document-item.active {
  background: #e3f2fd;
  border-color: #165DFF;
  box-shadow: 0 2px 8px rgba(22, 93, 255, 0.2);
}

.document-content {
  position: relative;
}

.document-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 8px;
}

.document-title {
  flex: 1;
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  color: #1a1a1a;
  line-height: 1.4;
  margin-right: 12px;
  word-break: break-word;
}

.document-actions {
  display: flex;
  align-items: center;
  gap: 4px;
  opacity: 0;
  transition: opacity 0.2s ease;
}

.document-item:hover .document-actions {
  opacity: 1;
}

.action-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border: none;
  background: transparent;
  border-radius: 4px;
  cursor: pointer;
  color: #6c757d;
  transition: all 0.2s ease;
}

.action-btn:hover {
  background: #e9ecef;
  color: #495057;
}

.favorite-btn.active {
  color: #ffc107;
}

.dropdown {
  position: relative;
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  right: 0;
  background: white;
  border: 1px solid #e9ecef;
  border-radius: 6px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 1000;
  min-width: 120px;
  padding: 4px 0;
}

.dropdown-item {
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  padding: 8px 12px;
  border: none;
  background: none;
  text-align: left;
  cursor: pointer;
  font-size: 14px;
  color: #495057;
  transition: background-color 0.2s ease;
}

.dropdown-item:hover {
  background: #f8f9fa;
}

.dropdown-item.danger {
  color: #dc3545;
}

.dropdown-item.danger:hover {
  background: #f8d7da;
}

.dropdown-divider {
  height: 1px;
  background: #e9ecef;
  margin: 4px 0;
}

.document-preview {
  color: #6c757d;
  font-size: 14px;
  line-height: 1.5;
  margin-bottom: 12px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.document-meta {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.meta-row {
  display: flex;
  align-items: center;
  gap: 16px;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  color: #6c757d;
}

.document-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
}

.tag {
  padding: 2px 6px;
  background: #e9ecef;
  border-radius: 10px;
  font-size: 11px;
  color: #495057;
}

.tag.more {
  background: #165DFF;
  color: white;
}

.document-status {
  position: absolute;
  top: 12px;
  right: 12px;
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 2px 6px;
  border-radius: 10px;
  font-size: 11px;
  font-weight: 500;
}

.document-status.draft {
  background: #fff3cd;
  color: #856404;
}

.document-status.published {
  background: #d1e7dd;
  color: #0f5132;
}

.document-status.archived {
  background: #f8d7da;
  color: #721c24;
}

@media (max-width: 768px) {
  .document-item {
    padding: 12px;
  }
  
  .document-title {
    font-size: 15px;
  }
  
  .meta-row {
    flex-direction: column;
    align-items: flex-start;
    gap: 4px;
  }
}
</style>