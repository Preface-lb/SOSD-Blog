<template>
  <div class="publish-container">
    <!-- 移动端菜单按钮 -->
    <button 
      v-if="isMobile" 
      @click="toggleMobileSidebar" 
      class="mobile-menu-btn"
      :class="{ active: showMobileSidebar }"
    >
      <i class="fa fa-bars"></i>
    </button>

    <!-- 侧边栏导航 -->
    <aside 
      class="sidebar" 
      :class="{ 
        collapsed: sidebarCollapsed && !isMobile,
        'mobile-show': showMobileSidebar && isMobile
      }"
    >
      <div class="sidebar-header">
        <div class="logo">
          <i class="fa fa-file-text"></i>
          <span v-if="!sidebarCollapsed || isMobile">文档编辑器</span>
        </div>
        <button 
          v-if="!isMobile"
          @click="toggleSidebar" 
          class="collapse-btn"
          :title="sidebarCollapsed ? '展开侧边栏' : '收起侧边栏'"
        >
          <i :class="sidebarCollapsed ? 'fa fa-chevron-right' : 'fa fa-chevron-left'"></i>
        </button>
        <button 
          v-if="isMobile"
          @click="toggleMobileSidebar" 
          class="close-btn"
        >
          <i class="fa fa-times"></i>
        </button>
      </div>
      
      <div class="sidebar-content">
        <div class="sidebar-actions">
          <button @click="createNewDocument" class="create-btn">
            <i class="fa fa-plus"></i>
            <span v-if="!sidebarCollapsed || isMobile">新建文档</span>
          </button>
          <button @click="importDocument" class="import-btn">
            <i class="fa fa-upload"></i>
            <span v-if="!sidebarCollapsed || isMobile">导入文档</span>
          </button>
        </div>
        
        <!-- 文档统计 -->
        <div v-if="!sidebarCollapsed || isMobile" class="document-stats">
          <div class="stat-item">
            <i class="fa fa-file-o"></i>
            <span>{{ documents.length }} 个文档</span>
          </div>
          <div class="stat-item">
            <i class="fa fa-star"></i>
            <span>{{ favoriteCount }} 个收藏</span>
          </div>
        </div>
        
        <DocumentList 
          :documents="documents"
          :selected-document-id="selectedDocument?.id"
          @select-document="selectDocument"
          @delete-document="confirmDeleteDocument"
          @duplicate-document="duplicateDocument"
          @toggle-favorite="toggleFavorite"
          @create-document="createNewDocument"
        />
      </div>
    </aside>
    
    <!-- 移动端遮罩 -->
    <div 
      v-if="isMobile && showMobileSidebar" 
      class="mobile-overlay"
      @click="toggleMobileSidebar"
    ></div>
    
    <!-- 主内容区 -->
    <main class="main-content">
      <!-- 空状态 -->
      <div v-if="!selectedDocument" class="empty-state">
        <div class="empty-illustration">
          <div class="illustration-bg">
            <i class="fa fa-file-text-o"></i>
          </div>
        </div>
        <h2>开始创作您的文档</h2>
        <p>选择左侧的文档进行编辑，或创建一个新文档开始写作</p>
        <div class="empty-actions">
          <button @click="createNewDocument" class="primary-btn">
            <i class="fa fa-plus"></i>
            创建新文档
          </button>
          <button @click="importDocument" class="secondary-btn">
            <i class="fa fa-upload"></i>
            导入文档
          </button>
        </div>
        
        <!-- 快速入门提示 -->
        <div class="quick-tips">
          <h3>快速入门</h3>
          <div class="tips-grid">
            <div class="tip-item">
              <i class="fa fa-keyboard-o"></i>
              <span>使用 Ctrl+N 快速新建</span>
            </div>
            <div class="tip-item">
              <i class="fa fa-save"></i>
              <span>Ctrl+S 保存文档</span>
            </div>
          </div>
        </div>
      </div>
      
      <!-- 文档编辑区 -->
      <div v-else class="document-workspace">
        <!-- 文档标题栏 -->
        <header class="document-header">
          <div class="title-section">
            <input 
              v-model="documentTitle" 
              @blur="updateDocumentTitle"
              @keydown.enter="$event.target.blur()"
              @focus="titleEditing = true"
              placeholder="输入文档标题" 
              class="document-title-input"
              :class="{ 'title-editing': titleEditing }"
            />
            <div class="document-meta">
              <div class="document-status-badge" :class="selectedDocument.status || 'draft'">
                <i :class="getStatusIcon()"></i>
                {{ getStatusText() }}
              </div>
              <div class="last-modified">
                <i class="fa fa-clock-o"></i>
                {{ getRelativeTime(selectedDocument.updatedAt) }}
              </div>
              <div class="document-size-info">
                <i class="fa fa-file-text-o"></i>
                <span>{{ getFileSize(selectedDocument.content) }}</span>
                <div class="size-progress-bar">
                  <div class="progress-bar-fill" :style="{ width: getSizePercentage() }"></div>
                </div>
              </div>
            </div>
          </div>
          
          <div class="header-actions">
            <!-- 操作按钮 -->
            <div class="action-buttons">
              <button 
                @click="saveDocument" 
                class="save-btn" 
                :disabled="isSaving"
                :title="isSaving ? '保存中...' : '保存文档 (Ctrl+S)'"
              >
                <i :class="isSaving ? 'fa fa-spinner fa-spin' : 'fa fa-save'"></i>
                <span v-if="!isMobile">{{ isSaving ? '保存中' : '保存' }}</span>
              </button>
              
              <button @click="shareDocument" class="share-btn" title="分享文档">
                <i class="fa fa-share-alt"></i>
                <span v-if="!isMobile">分享</span>
              </button>
              
              <!-- 更多操作下拉菜单 -->
              <div class="dropdown">
                <button @click="toggleMoreActions" class="more-btn" title="更多操作">
                  <i class="fa fa-ellipsis-v"></i>
                </button>
                <div v-if="showMoreActions" class="dropdown-menu">
                  <button @click="exportDocument" class="dropdown-item">
                    <i class="fa fa-download"></i>
                    导出文档
                  </button>
                  <button @click="duplicateDocument(selectedDocument.id)" class="dropdown-item">
                    <i class="fa fa-copy"></i>
                    复制文档
                  </button>
                  <button @click="toggleFavorite(selectedDocument.id)" class="dropdown-item">
                    <i :class="selectedDocument.isFavorite ? 'fa fa-star' : 'fa fa-star-o'"></i>
                    {{ selectedDocument.isFavorite ? '取消收藏' : '收藏文档' }}
                  </button>
                  <button @click="showDocumentInfo = true" class="dropdown-item">
                    <i class="fa fa-info-circle"></i>
                    文档信息
                  </button>
                  <div class="dropdown-divider"></div>
                  <button @click="confirmDeleteDocument(selectedDocument.id)" class="dropdown-item danger">
                    <i class="fa fa-trash"></i>
                    删除文档
                  </button>
                </div>
              </div>
            </div>
          </div>
        </header>
        
        <!-- 编辑器 -->
        <div class="editor-container">
          <div class="editor-panel">
            <Editor 
              :content="selectedDocument.content" 
              @content-change="handleContentChange"
              @save="saveDocument"
              :readonly="false"
            />
          </div>
        </div>
      </div>
    </main>
    
    <!-- 对话框组件 -->
    <ShareDialog 
      v-if="showShareDialog"
      :document="selectedDocument"
      @close="showShareDialog = false"
    />
    
    <DocumentInfoDialog
      v-if="showDocumentInfo"
      :document="selectedDocument"
      @close="showDocumentInfo = false"
      @update="updateDocumentInfo"
    />
    
    <ConfirmDialog
      v-if="showConfirmDialog"
      :title="confirmDialog.title"
      :message="confirmDialog.message"
      :type="confirmDialog.type"
      @confirm="confirmDialog.onConfirm"
      @cancel="showConfirmDialog = false"
    />
    
    <!-- 通知组件 -->
    <NotificationContainer :notifications="notifications" @remove="removeNotification" />
    
    <!-- 导入文件输入 -->
    <input 
      ref="fileInput" 
      type="file" 
      accept=".txt,.md,.html,.docx"
      @change="handleFileImport" 
      style="display: none"
    >
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch, nextTick } from 'vue'
import DocumentList from './components/DocumentList.vue'
import Editor from './components/Editor.vue'
import ShareDialog from './components/ShareDialog.vue'
import DocumentInfoDialog from './components/DocumentInfoDialog.vue'
import ConfirmDialog from './components/ConfirmDialog.vue'
import NotificationContainer from './components/NotificationContainer.vue'

// 响应式数据
const documents = ref([])
const selectedDocument = ref(null)
const documentTitle = ref('')
const titleEditing = ref(false)
const sidebarCollapsed = ref(false)
const showMobileSidebar = ref(false)
const isMobile = ref(false)
const isSaving = ref(false)
const showMoreActions = ref(false)
const showShareDialog = ref(false)
const showDocumentInfo = ref(false)
const showConfirmDialog = ref(false)
const confirmDialog = ref({})
const notifications = ref([])
const fileInput = ref(null)

// 编辑器大小限制（1MB）
const MAX_FILE_SIZE = 1024 * 1024;

// 生命周期
onMounted(() => {
  loadDocuments()
  checkMobile()
  setupEventListeners()
})

onUnmounted(() => {
  cleanupEventListeners()
})

// 监听选中文档变化
watch(selectedDocument, (newDoc) => {
  if (newDoc) {
    documentTitle.value = newDoc.title || ''
  }
})

// 计算属性
const favoriteCount = computed(() => {
  return documents.value.filter(doc => doc.isFavorite).length
})

const getWordCount = () => {
  if (!selectedDocument.value?.content) return 0
  const text = selectedDocument.value.content.replace(/<[^>]*>/g, '')
  return text.trim() ? text.trim().split(/\s+/).length : 0
}

const getReadingTime = () => {
  const wordCount = getWordCount()
  return Math.ceil(wordCount / 200)
}

// 方法实现
const checkMobile = () => {
  isMobile.value = window.innerWidth <= 768
}

const setupEventListeners = () => {
  document.addEventListener('click', handleClickOutside)
  document.addEventListener('keydown', handleKeyboardShortcuts)
  window.addEventListener('beforeunload', handleBeforeUnload)
}

const cleanupEventListeners = () => {
  document.removeEventListener('click', handleClickOutside)
  document.removeEventListener('keydown', handleKeyboardShortcuts)
  window.removeEventListener('beforeunload', handleBeforeUnload)
}

const loadDocuments = async () => {
  try {
    const mockDocuments = [
      {
        id: '1',
        title: '项目需求文档',
        content: '<h1>项目需求文档</h1><p>这是一个示例文档，包含了项目的详细需求说明...</p>',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        status: 'draft',
        isFavorite: false,
        tags: ['项目', '需求'],
        wordCount: 150
      }
    ]
    documents.value = mockDocuments
    showNotification('文档加载完成', 'success')
  } catch (error) {
    console.error('加载文档失败:', error)
    showNotification('加载文档失败，请重试', 'error')
  }
}

const selectDocument = async (documentId) => {
  try {
    const doc = documents.value.find(d => d.id === documentId)
    if (doc) {
      selectedDocument.value = { ...doc }
      documentTitle.value = doc.title || ''
      
      if (isMobile.value) {
        showMobileSidebar.value = false
      }
    }
  } catch (error) {
    console.error('选择文档失败:', error)
    showNotification('加载文档失败，请重试', 'error')
  }
}

const createNewDocument = async () => {
  try {
    const title = prompt('请输入文档标题:') || '未命名文档'
    
    const newDoc = {
      id: Date.now().toString(),
      title,
      content: '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      status: 'draft',
      isFavorite: false,
      tags: [],
      wordCount: 0
    }
    
    documents.value.unshift(newDoc)
    selectDocument(newDoc.id)
    showNotification('新文档创建成功', 'success')
    
    await nextTick()
    const titleInput = document.querySelector('.document-title-input')
    if (titleInput) {
      titleInput.focus()
      titleInput.select()
    }
  } catch (error) {
    console.error('创建文档失败:', error)
    showNotification('创建文档失败，请重试', 'error')
  }
}

const saveDocument = async () => {
  if (!selectedDocument.value) return
  
  isSaving.value = true
  
  try {
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    const updatedDoc = {
      ...selectedDocument.value,
      title: documentTitle.value,
      updatedAt: new Date().toISOString(),
      wordCount: getWordCount()
    }
    
    const index = documents.value.findIndex(d => d.id === selectedDocument.value.id)
    if (index !== -1) {
      documents.value[index] = updatedDoc
    }
    
    selectedDocument.value = updatedDoc
    showNotification('文档保存成功', 'success')
  } catch (error) {
    console.error('保存失败:', error)
    showNotification('保存失败，请重试', 'error')
  } finally {
    isSaving.value = false
  }
}

const confirmDeleteDocument = (documentId) => {
  const doc = documents.value.find(d => d.id === documentId)
  if (!doc) return
  
  confirmDialog.value = {
    title: '删除文档',
    message: `确定要删除文档"${doc.title}"吗？此操作不可撤销。`,
    type: 'danger',
    onConfirm: () => {
      deleteDocument(documentId)
      showConfirmDialog.value = false
    }
  }
  showConfirmDialog.value = true
}

const deleteDocument = async (documentId) => {
  try {
    documents.value = documents.value.filter(d => d.id !== documentId)
    if (selectedDocument.value?.id === documentId) {
      selectedDocument.value = null
      documentTitle.value = ''
    }
    showNotification('文档删除成功', 'success')
  } catch (error) {
    console.error('删除失败:', error)
    showNotification('删除失败，请重试', 'error')
  }
}

const duplicateDocument = async (documentId) => {
  try {
    const doc = documents.value.find(d => d.id === documentId)
    if (!doc) return
    
    const newDoc = {
      ...doc,
      id: Date.now().toString(),
      title: `${doc.title} (副本)`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    
    documents.value.unshift(newDoc)
    selectDocument(newDoc.id)
    showNotification('文档复制成功', 'success')
  } catch (error) {
    console.error('复制失败:', error)
    showNotification('复制失败，请重试', 'error')
  }
}

const toggleFavorite = (documentId) => {
  const doc = documents.value.find(d => d.id === documentId)
  if (doc) {
    doc.isFavorite = !doc.isFavorite
    if (selectedDocument.value?.id === documentId) {
      selectedDocument.value.isFavorite = doc.isFavorite
    }
    showNotification(
      doc.isFavorite ? '已添加到收藏' : '已取消收藏', 
      'success'
    )
  }
}

const handleContentChange = (content) => {
  if (selectedDocument.value) {
    // 检查内容大小是否超过限制
    const size = new Blob([content]).size;
    if (size > MAX_FILE_SIZE) {
      showNotification('文档大小已超过限制，无法继续添加内容', 'warning');
      return;
    }
    
    // 更新选中文档的内容
    selectedDocument.value.content = content;
    
    // 同时更新文档列表中的原始文档
    const index = documents.value.findIndex(d => d.id === selectedDocument.value.id);
    if (index !== -1) {
      documents.value[index].content = content;
      documents.value[index].wordCount = getWordCount();
    }
  }
}

const updateDocumentTitle = () => {
  titleEditing.value = false
  if (selectedDocument.value && documentTitle.value !== selectedDocument.value.title) {
    selectedDocument.value.title = documentTitle.value
    
    // 同时更新文档列表中的标题
    const index = documents.value.findIndex(d => d.id === selectedDocument.value.id);
    if (index !== -1) {
      documents.value[index].title = documentTitle.value;
    }
  }
}

const updateDocumentInfo = (info) => {
  if (selectedDocument.value) {
    Object.assign(selectedDocument.value, info)
    const index = documents.value.findIndex(d => d.id === selectedDocument.value.id)
    if (index !== -1) {
      Object.assign(documents.value[index], info)
    }
    showNotification('文档信息更新成功', 'success')
  }
}

const toggleSidebar = () => {
  sidebarCollapsed.value = !sidebarCollapsed.value
}

const toggleMobileSidebar = () => {
  showMobileSidebar.value = !showMobileSidebar.value
}

const toggleMoreActions = () => {
  showMoreActions.value = !showMoreActions.value
}

const shareDocument = () => {
  if (!selectedDocument.value) return
  showShareDialog.value = true
}

const exportDocument = () => {
  if (!selectedDocument.value) return
  
  const content = selectedDocument.value.content || ''
  const blob = new Blob([content], { type: 'text/html' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `${selectedDocument.value.title || '未命名文档'}.html`
  a.click()
  URL.revokeObjectURL(url)
  showNotification('文档导出成功', 'success')
}

const importDocument = () => {
  fileInput.value?.click()
}

const handleFileImport = async (event) => {
  const file = event.target.files[0]
  if (!file) return
  
  try {
    // 检查文件大小
    if (file.size > MAX_FILE_SIZE) {
      showNotification('导入的文件太大，超过限制', 'error');
      return;
    }
    
    const content = await file.text()
    const newDoc = {
      id: Date.now().toString(),
      title: file.name.replace(/\.[^/.]+$/, ''),
      content,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      status: 'draft',
      isFavorite: false,
      tags: [],
      wordCount: content.replace(/<[^>]*>/g, '').trim().split(/\s+/).length
    }
    
    documents.value.unshift(newDoc)
    selectDocument(newDoc.id)
    showNotification('文档导入成功', 'success')
  } catch (error) {
    console.error('导入失败:', error)
    showNotification('导入失败，请重试', 'error')
  }
  
  event.target.value = ''
}

const formatDate = (dateString) => {
  if (!dateString) return ''
  return new Date(dateString).toLocaleString('zh-CN')
}

const getRelativeTime = (dateString) => {
  if (!dateString) return ''
  const date = new Date(dateString)
  const now = new Date()
  const diff = now - date
  
  if (diff < 60000) return '刚刚'
  if (diff < 3600000) return `${Math.floor(diff / 60000)}分钟前`
  if (diff < 86400000) return `${Math.floor(diff / 3600000)}小时前`
  if (diff < 604800000) return `${Math.floor(diff / 86400000)}天前`
  
  return date.toLocaleDateString('zh-CN')
}

const getStatusIcon = () => {
  switch (selectedDocument.value?.status) {
    case 'draft': return 'fa fa-edit'
    case 'published': return 'fa fa-globe'
    case 'archived': return 'fa fa-archive'
    default: return 'fa fa-file-o'
  }
}

const getStatusText = () => {
  switch (selectedDocument.value?.status) {
    case 'draft': return '草稿'
    case 'published': return '已发布'
    case 'archived': return '已归档'
    default: return '草稿'
  }
}

// 获取文档大小
const getFileSize = (content) => {
  if (!content) return '0 B';
  
  const size = new Blob([content]).size;
  
  if (size < 1024) {
    return `${size} B`;
  } else if (size < 1024 * 1024) {
    return `${(size / 1024).toFixed(2)} KB`;
  } else {
    return `${(size / (1024 * 1024)).toFixed(2)} MB`;
  }
}

// 获取文档大小百分比
const getSizePercentage = () => {
  if (!selectedDocument.value?.content) return '0%';
  
  const size = new Blob([selectedDocument.value.content]).size;
  const percentage = Math.min((size / MAX_FILE_SIZE) * 100, 100);
  return `${percentage}%`;
}

const showNotification = (message, type = 'info', duration = 3000) => {
  const notification = {
    id: Date.now(),
    message,
    type,
    duration
  }
  notifications.value.push(notification)
  
  if (duration > 0) {
    setTimeout(() => {
      removeNotification(notification.id)
    }, duration)
  }
}

const removeNotification = (id) => {
  const index = notifications.value.findIndex(n => n.id === id)
  if (index > -1) {
    notifications.value.splice(index, 1)
  }
}

const handleClickOutside = (event) => {
  if (!event.target.closest('.dropdown')) {
    showMoreActions.value = false
  }
}

const handleKeyboardShortcuts = (event) => {
  if (event.ctrlKey || event.metaKey) {
    switch (event.key) {
      case 's':
        event.preventDefault()
        saveDocument()
        break
      case 'n':
        event.preventDefault()
        createNewDocument()
        break
      case 'b':
        if (!isMobile.value) {
          event.preventDefault()
          toggleSidebar()
        }
        break
    }
  }
  
  if (event.key === 'Escape') {
    showShareDialog.value = false
    showDocumentInfo.value = false
    showConfirmDialog.value = false
    showMoreActions.value = false
    if (isMobile.value) {
      showMobileSidebar.value = false
    }
  }
}

const handleBeforeUnload = (event) => {
  if (isSaving.value) {
    event.preventDefault()
    event.returnValue = '文档正在保存中，确定要离开吗？'
  }
}
</script>

<style scoped>
.publish-container {
  display: flex;
  height: 100vh;
  background: #f5f7fa;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  position: relative;
}

.mobile-menu-btn {
  display: none;
  position: fixed;
  top: 16px;
  left: 16px;
  z-index: 1001;
  width: 44px;
  height: 44px;
  background: white;
  border: 1px solid #e9ecef;
  border-radius: 8px;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease;
}

.mobile-menu-btn:hover {
  background: #f8f9fa;
}

.mobile-menu-btn.active {
  background: #165DFF;
  color: white;
  border-color: #165DFF;
}

.sidebar {
  width: 320px;
  background: white;
  border-right: 1px solid #e9ecef;
  display: flex;
  flex-direction: column;
  transition: all 0.3s ease;
  box-shadow: 2px 0 8px rgba(0, 0, 0, 0.05);
  z-index: 100;
}

.sidebar.collapsed {
  width: 60px;
}

.sidebar-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  border-bottom: 1px solid #e9ecef;
  background: #f8f9fa;
  min-height: 60px;
}

.logo {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 18px;
  font-weight: 700;
  color: #165DFF;
  transition: all 0.3s ease;
}

.logo i {
  font-size: 24px;
  min-width: 24px;
}

.collapse-btn, .close-btn {
  padding: 8px;
  border: none;
  background: transparent;
  border-radius: 4px;
  cursor: pointer;
  color: #6c757d;
  transition: all 0.2s ease;
  min-width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.collapse-btn:hover, .close-btn:hover {
  background: #e9ecef;
  color: #165DFF;
}

.sidebar-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.sidebar-actions {
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.create-btn, .import-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.2s ease;
  justify-content: center;
  white-space: nowrap;
}

.create-btn {
  background: #165DFF;
  color: white;
}

.create-btn:hover {
  background: #0E42CC;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(22, 93, 255, 0.3);
}

.import-btn {
  background: #f8f9fa;
  color: #495057;
  border: 1px solid #e9ecef;
}

.import-btn:hover {
  background: #e9ecef;
  transform: translateY(-1px);
}

.sidebar.collapsed .create-btn span,
.sidebar.collapsed .import-btn span {
  display: none;
}

.document-stats {
  padding: 16px;
  border-bottom: 1px solid #e9ecef;
  background: #f8f9fa;
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: #6c757d;
  margin-bottom: 8px;
}

.stat-item:last-child {
  margin-bottom: 0;
}

.stat-item i {
  width: 16px;
  text-align: center;
}

.mobile-overlay {
  display: none;
}

.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  min-width: 0;
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  text-align: center;
  padding: 40px;
  max-width: 600px;
  margin: 0 auto;
}

.empty-illustration {
  margin-bottom: 32px;
}

.illustration-bg {
  width: 120px;
  height: 120px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  box-shadow: 0 8px 32px rgba(102, 126, 234, 0.3);
}

.illustration-bg i {
  font-size: 48px;
  color: white;
}

.empty-state h2 {
  font-size: 28px;
  font-weight: 600;
  color: #1a1a1a;
  margin-bottom: 16px;
}

.empty-state p {
  font-size: 16px;
  color: #6c757d;
  margin-bottom: 32px;
  line-height: 1.6;
}

.empty-actions {
  display: flex;
  gap: 16px;
  margin-bottom: 48px;
}

.primary-btn, .secondary-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.primary-btn {
  background: #165DFF;
  color: white;
  border: none;
}

.primary-btn:hover {
  background: #0E42CC;
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(22, 93, 255, 0.3);
}

.secondary-btn {
  background: white;
  color: #495057;
  border: 1px solid #e9ecef;
}

.secondary-btn:hover {
  background: #f8f9fa;
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
}

.quick-tips {
  width: 100%;
  max-width: 500px;
}

.quick-tips h3 {
  font-size: 18px;
  font-weight: 600;
  color: #495057;
  margin-bottom: 16px;
}

.tips-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 12px;
}

.tip-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px;
  background: white;
  border: 1px solid #e9ecef;
  border-radius: 6px;
  font-size: 14px;
  color: #6c757d;
}

.tip-item i {
  color: #165DFF;
  width: 16px;
  text-align: center;
}

.document-workspace {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.document-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 24px;
  background: white;
  border-bottom: 1px solid #e9ecef;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  min-height: 80px;
}

.title-section {
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1;
  min-width: 0;
}

.document-title-input {
  font-size: 24px;
  font-weight: 600;
  border: none;
  outline: none;
  background: transparent;
  color: #1a1a1a;
  padding: 8px 0;
  border-radius: 4px;
  transition: all 0.2s ease;
}

.document-title-input:focus,
.document-title-input.title-editing {
  background: #f8f9fa;
  padding: 8px 12px;
  box-shadow: 0 0 0 2px rgba(22, 93, 255, 0.2);
}

.document-meta {
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
}

.document-status-badge {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
}

.document-status-badge.draft {
  background: #fff3cd;
  color: #856404;
}

.document-status-badge.published {
  background: #d1e7dd;
  color: #0f5132;
}

.document-status-badge.archived {
  background: #f8d7da;
  color: #721c24;
}

.last-modified {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  color: #6c757d;
}

.document-size-info {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  color: #6c757d;
  min-width: 150px;
}

.document-size-info i {
  width: 16px;
  text-align: center;
}

.size-progress-bar {
  flex: 1;
  height: 6px;
  background: #e9ecef;
  border-radius: 3px;
  overflow: hidden;
}

.progress-bar-fill {
  height: 100%;
  transition: width 0.3s ease;
}

/* 根据百分比显示不同颜色 */
.progress-bar-fill {
  background: linear-gradient(90deg, #28a745 0%, #ffc107 50%, #dc3545 100%);
  background-size: 200% 100%;
  background-position: 0% 0%;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 16px;
}

.action-buttons {
  display: flex;
  align-items: center;
  gap: 8px;
}

.save-btn, .share-btn, .more-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
}

.save-btn {
  background: #28a745;
  color: white;
  border: none;
}

.save-btn:hover:not(:disabled) {
  background: #218838;
  transform: translateY(-1px);
}

.save-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.share-btn {
  background: #17a2b8;
  color: white;
  border: none;
}

.share-btn:hover {
  background: #138496;
  transform: translateY(-1px);
}

.more-btn {
  background: #f8f9fa;
  color: #6c757d;
  border: 1px solid #e9ecef;
  padding: 8px 12px;
}

.more-btn:hover {
  background: #e9ecef;
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
  border-radius: 8px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  z-index: 1000;
  min-width: 180px;
  padding: 8px 0;
  margin-top: 4px;
}

.dropdown-item {
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  padding: 10px 16px;
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
  margin: 8px 0;
}

.editor-container {
  flex: 1;
  display: flex;
  overflow: hidden;
}

.editor-panel {
  display: flex;
  flex-direction: column;
  min-width: 0;
  width: 100%;
}

/* 移动端适配 */
@media (max-width: 768px) {
  .mobile-menu-btn {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .sidebar {
    position: fixed;
    left: 0;
    top: 0;
    height: 100vh;
    z-index: 1000;
    transform: translateX(-100%);
    transition: transform 0.3s ease;
    width: 280px;
  }
  
  .sidebar.mobile-show {
    transform: translateX(0);
  }
  
  .mobile-overlay {
    display: block;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 999;
  }
  
  .main-content {
    width: 100%;
    padding-top: 60px;
  }
  
  .document-header {
    flex-direction: column;
    gap: 16px;
    align-items: stretch;
    padding: 16px;
    min-height: auto;
  }
  
  .title-section {
    order: 1;
  }
  
  .header-actions {
    order: 2;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 12px;
  }
  
  .action-buttons {
    justify-content: center;
    flex-wrap: wrap;
  }
  
  .save-btn span,
  .share-btn span {
    display: none;
  }
  
  .empty-state {
    padding: 20px;
  }
  
  .empty-actions {
    flex-direction: column;
    width: 100%;
    max-width: 300px;
  }
  
  .tips-grid {
    grid-template-columns: 1fr;
  }
  
  .document-meta {
    gap: 12px;
  }
  
  .document-size-info {
    min-width: 120px;
  }
}

@media (max-width: 480px) {
  .document-title-input {
    font-size: 20px;
  }
  
  .empty-state h2 {
    font-size: 24px;
  }
  
  .illustration-bg {
    width: 80px;
    height: 80px;
  }
  
  .illustration-bg i {
    font-size: 32px;
  }
}

/* 动画效果 */
@keyframes slideInRight {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.document-workspace {
  animation: fadeIn 0.3s ease;
}

.dropdown-menu {
  animation: slideInRight 0.2s ease;
}

/* 滚动条样式 */
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 3px;
}

::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}
</style>