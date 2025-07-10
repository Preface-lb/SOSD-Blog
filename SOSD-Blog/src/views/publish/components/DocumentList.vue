<template>
  <div class="document-list">
    <div class="list-header">
      <div class="search-container">
        <div class="search-input-wrapper">
          <i class="fa fa-search search-icon"></i>
          <input 
            type="text" 
            v-model="searchQuery" 
            @input="filterDocuments" 
            placeholder="搜索文档..." 
            class="search-input"
          />
          <button 
            v-if="searchQuery" 
            @click="clearSearch" 
            class="clear-btn"
          >
            <i class="fa fa-times"></i>
          </button>
        </div>
      </div>
      
      <div class="filter-tabs">
        <button 
          v-for="tab in filterTabs" 
          :key="tab.key"
          @click="activeFilter = tab.key"
          :class="['filter-tab', { active: activeFilter === tab.key }]"
        >
          <i :class="tab.icon"></i>
          {{ tab.label }}
          <span class="count">{{ getFilterCount(tab.key) }}</span>
        </button>
      </div>
    </div>
    
    <div class="sort-controls">
      <select v-model="sortBy" @change="sortDocuments" class="sort-select">
        <option value="updatedAt">最近修改</option>
        <option value="createdAt">创建时间</option>
        <option value="title">标题</option>
        <option value="wordCount">字数</option>
      </select>
      <button @click="toggleSortOrder" class="sort-order-btn" :title="sortOrder === 'desc' ? '降序' : '升序'">
        <i :class="sortOrder === 'desc' ? 'fa fa-sort-amount-desc' : 'fa fa-sort-amount-asc'"></i>
      </button>
    </div>
    
    <div v-if="filteredDocuments.length === 0" class="empty-list">
      <div class="empty-icon">
        <i class="fa fa-file-text-o"></i>
      </div>
      <p v-if="searchQuery">未找到匹配的文档</p>
      <p v-else>暂无文档</p>
      <button v-if="!searchQuery" @click="$emit('create-document')" class="create-first-btn">
        <i class="fa fa-plus"></i>
        创建第一个文档
      </button>
    </div>
    
    <div v-else class="documents-container">
      <TransitionGroup name="document" tag="div">
        <DocumentItem 
          v-for="document in paginatedDocuments" 
          :key="document.id" 
          :document="document" 
          :selected="document.id === selectedDocumentId"
          @select="handleSelectDocument"
          @delete="handleDeleteDocument"
          @duplicate="handleDuplicateDocument"
        />
      </TransitionGroup>
      
      <div v-if="totalPages > 1" class="pagination">
        <button 
          @click="currentPage--" 
          :disabled="currentPage === 1"
          class="page-btn"
        >
          <i class="fa fa-chevron-left"></i>
        </button>
        <span class="page-info">{{ currentPage }} / {{ totalPages }}</span>
        <button 
          @click="currentPage++" 
          :disabled="currentPage === totalPages"
          class="page-btn"
        >
          <i class="fa fa-chevron-right"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import DocumentItem from './DocumentItem.vue'

const props = defineProps({
  documents: {
    type: Array,
    default: () => []
  },
  selectedDocumentId: {
    type: String,
    default: null
  }
})

const emit = defineEmits(['select-document', 'delete-document', 'duplicate-document', 'create-document'])

const searchQuery = ref('')
const activeFilter = ref('all')
const sortBy = ref('updatedAt')
const sortOrder = ref('desc')
const currentPage = ref(1)
const pageSize = 20

const filterTabs = [
  { key: 'all', label: '全部', icon: 'fa fa-files-o' },
  { key: 'recent', label: '最近', icon: 'fa fa-clock-o' },
  { key: 'favorites', label: '收藏', icon: 'fa fa-star' }
]

// 计算过滤后的文档列表
const filteredDocuments = computed(() => {
  let docs = [...props.documents]
  
  // 搜索过滤
  if (searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase()
    docs = docs.filter(doc => 
      doc.title.toLowerCase().includes(query) || 
      (doc.content && doc.content.toLowerCase().includes(query)) ||
      (doc.tags && doc.tags.some(tag => tag.toLowerCase().includes(query)))
    )
  }
  
  // 分类过滤
  switch (activeFilter.value) {
    case 'recent':
      const weekAgo = new Date()
      weekAgo.setDate(weekAgo.getDate() - 7)
      docs = docs.filter(doc => new Date(doc.updatedAt) > weekAgo)
      break
    case 'favorites':
      docs = docs.filter(doc => doc.isFavorite)
      break
  }
  
  // 排序
  docs.sort((a, b) => {
    let aValue = a[sortBy.value]
    let bValue = b[sortBy.value]
    
    if (sortBy.value === 'title') {
      aValue = aValue?.toLowerCase() || ''
      bValue = bValue?.toLowerCase() || ''
    } else if (sortBy.value === 'wordCount') {
      aValue = aValue || 0
      bValue = bValue || 0
    } else {
      aValue = new Date(aValue)
      bValue = new Date(bValue)
    }
    
    if (sortOrder.value === 'desc') {
      return bValue > aValue ? 1 : -1
    } else {
      return aValue > bValue ? 1 : -1
    }
  })
  
  return docs
})

// 分页后的文档列表
const paginatedDocuments = computed(() => {
  const start = (currentPage.value - 1) * pageSize
  const end = start + pageSize
  return filteredDocuments.value.slice(start, end)
})

// 总页数
const totalPages = computed(() => {
  return Math.ceil(filteredDocuments.value.length / pageSize)
})

// 获取过滤器数量
const getFilterCount = (filterKey) => {
  switch (filterKey) {
    case 'all':
      return props.documents.length
    case 'recent':
      const weekAgo = new Date()
      weekAgo.setDate(weekAgo.getDate() - 7)
      return props.documents.filter(doc => new Date(doc.updatedAt) > weekAgo).length
    case 'favorites':
      return props.documents.filter(doc => doc.isFavorite).length
    default:
      return 0
  }
}

// 监听文档变化，重置分页
watch(() => props.documents, () => {
  currentPage.value = 1
})

watch(searchQuery, () => {
  currentPage.value = 1
})

watch(activeFilter, () => {
  currentPage.value = 1
})

// 过滤文档
const filterDocuments = () => {
  currentPage.value = 1
}

// 清除搜索
const clearSearch = () => {
  searchQuery.value = ''
}

// 排序文档
const sortDocuments = () => {
  currentPage.value = 1
}

// 切换排序顺序
const toggleSortOrder = () => {
  sortOrder.value = sortOrder.value === 'desc' ? 'asc' : 'desc'
  currentPage.value = 1
}

// 处理文档选择
const handleSelectDocument = (documentId) => {
  emit('select-document', documentId)
}

// 处理文档删除
const handleDeleteDocument = (documentId) => {
  emit('delete-document', documentId)
}

// 处理文档复制
const handleDuplicateDocument = (documentId) => {
  emit('duplicate-document', documentId)
}
</script>

<style scoped>
.document-list {
  height: 100%;
  display: flex;
  flex-direction: column;
  background: white;
}

.list-header {
  padding: 16px;
  border-bottom: 1px solid #e9ecef;
}

.search-container {
  margin-bottom: 16px;
}

.search-input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.search-icon {
  position: absolute;
  left: 12px;
  color: #6c757d;
  z-index: 1;
}

.search-input {
  width: 100%;
  padding: 10px 12px 10px 36px;
  border: 1px solid #e9ecef;
  border-radius: 8px;
  outline: none;
  font-size: 14px;
  transition: border-color 0.2s ease;
}

.search-input:focus {
  border-color: #165DFF;
  box-shadow: 0 0 0 3px rgba(22, 93, 255, 0.1);
}

.clear-btn {
  position: absolute;
  right: 8px;
  background: none;
  border: none;
  color: #6c757d;
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  transition: background-color 0.2s ease;
}

.clear-btn:hover {
  background: #f8f9fa;
}

.filter-tabs {
  display: flex;
  gap: 4px;
}

.filter-tab {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 12px;
  border: none;
  background: transparent;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  color: #6c757d;
  transition: all 0.2s ease;
}

.filter-tab:hover {
  background: #f8f9fa;
  color: #495057;
}

.filter-tab.active {
  background: #165DFF;
  color: white;
}

.count {
  background: rgba(255, 255, 255, 0.2);
  padding: 2px 6px;
  border-radius: 10px;
  font-size: 12px;
  min-width: 18px;
  text-align: center;
}

.filter-tab.active .count {
  background: rgba(255, 255, 255, 0.3);
}

.sort-controls {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 0 16px 16px;
}

.sort-select {
  flex: 1;
  padding: 6px 8px;
  border: 1px solid #e9ecef;
  border-radius: 4px;
  background: white;
  font-size: 14px;
  cursor: pointer;
}

.sort-select:focus {
  outline: none;
  border-color: #165DFF;
}

.sort-order-btn {
  padding: 6px 8px;
  border: 1px solid #e9ecef;
  border-radius: 4px;
  background: white;
  cursor: pointer;
  color: #6c757d;
  transition: all 0.2s ease;
}

.sort-order-btn:hover {
  background: #f8f9fa;
  color: #165DFF;
}

.documents-container {
  flex: 1;
  overflow-y: auto;
  padding: 0 16px;
}

.empty-list {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 300px;
  text-align: center;
  color: #6c757d;
}

.empty-icon {
  font-size: 48px;
  margin-bottom: 16px;
  color: #dee2e6;
}

.create-first-btn {
  margin-top: 16px;
  padding: 10px 20px;
  background: #165DFF;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.2s ease;
}

.create-first-btn:hover {
  background: #0E42CC;
}

.pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 16px 0;
  border-top: 1px solid #e9ecef;
  margin-top: 16px;
}

.page-btn {
  padding: 6px 8px;
  border: 1px solid #e9ecef;
  border-radius: 4px;
  background: white;
  cursor: pointer;
  color: #6c757d;
  transition: all 0.2s ease;
}

.page-btn:hover:not(:disabled) {
  background: #f8f9fa;
  color: #165DFF;
}

.page-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.page-info {
  font-size: 14px;
  color: #6c757d;
}

/* 动画效果 */
.document-enter-active,
.document-leave-active {
  transition: all 0.3s ease;
}

.document-enter-from {
  opacity: 0;
  transform: translateX(-20px);
}

.document-leave-to {
  opacity: 0;
  transform: translateX(20px);
}

.document-move {
  transition: transform 0.3s ease;
}
</style>