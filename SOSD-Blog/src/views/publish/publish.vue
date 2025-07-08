<template>
  <div class="publish-container">
    <!-- 侧边栏导航 -->
    <aside class="sidebar">
      <div class="sidebar-header">
        <h1>文档管理</h1>
        <button @click="createNewDocument" class="create-btn">
          <i class="fa fa-plus"></i> 新建文档
        </button>
      </div>
      <DocumentList @select-document="selectDocument" />
    </aside>
    
    <!-- 主内容区 -->
    <main class="main-content">
      <div v-if="!selectedDocument" class="empty-state">
        <div class="empty-icon">
          <i class="fa fa-file-text-o"></i>
        </div>
        <h3>选择或创建一个文档开始编辑</h3>
        <p>点击左侧新建文档按钮或选择已有文档</p>
      </div>
      
      <div v-else class="document-editor">
        <!-- 文档标题栏 -->
        <div class="document-header">
          <input 
            v-model="documentTitle" 
            @blur="updateDocumentTitle" 
            placeholder="输入文档标题" 
            class="document-title"
          />
          <div class="document-actions">
            <button @click="togglePreview" class="action-btn">
              <i class="fa fa-eye"></i> 预览
            </button>
            <button @click="saveDocument" class="action-btn">
              <i class="fa fa-save"></i> 保存
            </button>
            <button @click="deleteDocument" class="action-btn danger">
              <i class="fa fa-trash"></i> 删除
            </button>
          </div>
        </div>
        
        <!-- 编辑器/预览区 -->
        <div v-if="isPreview" class="preview-mode">
          <Preview :content="selectedDocument.content" />
        </div>
        <div v-else>
          <Editor 
            :content="selectedDocument.content" 
            @content-change="handleContentChange"
          />
        </div>
        
        <!-- 文档信息 -->
        <div class="document-info">
          <span class="info-item">
            <i class="fa fa-calendar"></i> 
            创建于: {{ formatDate(selectedDocument.createdAt) }}
          </span>
          <span class="info-item">
            <i class="fa fa-calendar-check-o"></i> 
            最后更新: {{ formatDate(selectedDocument.updatedAt) }}
          </span>
          <span class="info-item">
            <i class="fa fa-file-text-o"></i> 
            字数: {{ selectedDocument.wordCount || 0 }}
          </span>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useStore } from 'vuex';
import DocumentList from './components/DocumentList.vue';
import Editor from './components/Editor.vue';
import Preview from './components/Preview.vue';
import { 
  fetchDocuments, 
  createDocument, 
  updateDocument, 
  deleteDocument 
} from '@/views/publish/services/documentService';

export default {
  name: 'Publish',
  components: {
    DocumentList,
    Editor,
    Preview
  },
  setup() {
    const store = useStore();
    const selectedDocument = ref(null);
    const documentTitle = ref('');
    const isPreview = ref(false);
    
    // 加载文档列表
    onMounted(() => {
      loadDocuments();
    });
    
    // 加载文档列表
    const loadDocuments = async () => {
      try {
        const documents = await fetchDocuments();
        store.commit('setDocuments', documents);
      } catch (error) {
        console.error('加载文档失败', error);
        alert('加载文档失败，请重试');
      }
    };
    
    // 选择文档
    const selectDocument = async (documentId) => {
      try {
        // 从store中查找文档
        const documents = store.state.documents;
        const doc = documents.find(doc => doc.id === documentId);
        
        if (doc) {
          selectedDocument.value = { ...doc };
          documentTitle.value = doc.title || '';
        } else {
          // 如果找不到，从API获取
          const newDoc = await fetchDocument(documentId);
          selectedDocument.value = newDoc;
          documentTitle.value = newDoc.title || '';
        }
      } catch (error) {
        console.error('选择文档失败', error);
        alert('加载文档失败，请重试');
      }
    };
    
    // 创建新文档
    const createNewDocument = async () => {
      try {
        const title = prompt('请输入文档标题');
        if (!title) return;
        
        const newDoc = await createDocument({ title, content: '' });
        store.commit('addDocument', newDoc);
        selectDocument(newDoc.id);
      } catch (error) {
        console.error('创建文档失败', error);
        alert('创建文档失败，请重试');
      }
    };
    
    // 保存文档
    const saveDocument = async () => {
      if (!selectedDocument.value) return;
      
      try {
        const updatedDoc = {
          ...selectedDocument.value,
          title: documentTitle.value
        };
        
        await updateDocument(updatedDoc.id, updatedDoc);
        store.commit('updateDocument', updatedDoc);
        
        // 更新本地状态
        selectedDocument.value = updatedDoc;
        
        alert('保存成功');
      } catch (error) {
        console.error('保存文档失败', error);
        alert('保存失败，请重试');
      }
    };
    
    // 删除文档
    const deleteDocument = async () => {
      if (!selectedDocument.value) return;
      
      const confirmDelete = confirm('确定要删除此文档吗？此操作不可撤销。');
      if (!confirmDelete) return;
      
      try {
        await deleteDocument(selectedDocument.value.id);
        store.commit('removeDocument', selectedDocument.value.id);
        selectedDocument.value = null;
        documentTitle.value = '';
        alert('文档已删除');
      } catch (error) {
        console.error('删除文档失败', error);
        alert('删除失败，请重试');
      }
    };
    
    // 处理内容变化
    const handleContentChange = (content) => {
      if (selectedDocument.value) {
        selectedDocument.value.content = content;
        
        // 计算字数
        const wordCount = content ? content.trim().split(/\s+/).length : 0;
        selectedDocument.value.wordCount = wordCount;
      }
    };
    
    // 更新文档标题
    const updateDocumentTitle = () => {
      if (selectedDocument.value) {
        selectedDocument.value.title = documentTitle.value;
      }
    };
    
    // 切换预览模式
    const togglePreview = () => {
      isPreview.value = !isPreview.value;
    };
    
    // 格式化日期
    const formatDate = (dateString) => {
      if (!dateString) return '';
      const date = new Date(dateString);
      return date.toLocaleString();
    };
    
    return {
      selectedDocument,
      documentTitle,
      isPreview,
      selectDocument,
      createNewDocument,
      saveDocument,
      deleteDocument,
      handleContentChange,
      updateDocumentTitle,
      togglePreview,
      formatDate
    };
  }
};
</script>

<style scoped>
.publish-container {
  display: flex;
  height: 100vh;
  overflow: hidden;
}

.sidebar {
  width: 280px;
  background-color: #f8f9fa;
  border-right: 1px solid #e9ecef;
  overflow-y: auto;
  padding: 16px;
}

.sidebar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.create-btn {
  background-color: #165DFF;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 6px 12px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.create-btn:hover {
  background-color: #0E42CC;
}

.main-content {
  flex: 1;
  overflow-y: auto;
  padding: 24px;
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  text-align: center;
  color: #6c757d;
}

.empty-icon {
  font-size: 64px;
  margin-bottom: 24px;
  color: #dee2e6;
}

.document-editor {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.document-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  border-bottom: 1px solid #e9ecef;
  padding-bottom: 12px;
}

.document-title {
  font-size: 24px;
  font-weight: 600;
  border: none;
  outline: none;
  width: 100%;
  margin-right: 16px;
}

.document-actions {
  display: flex;
  gap: 8px;
}

.action-btn {
  background-color: #f8f9fa;
  border: 1px solid #e9ecef;
  border-radius: 4px;
  padding: 6px 12px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.action-btn:hover {
  background-color: #e9ecef;
}

.danger {
  color: #dc3545;
}

.preview-mode {
  padding: 16px;
  border: 1px solid #e9ecef;
  border-radius: 4px;
  min-height: 500px;
  background-color: #f8f9fa;
}

.document-info {
  display: flex;
  gap: 24px;
  margin-top: 16px;
  color: #6c757d;
  font-size: 14px;
}

.info-item {
  display: flex;
  align-items: center;
}

.info-item i {
  margin-right: 4px;
}
</style>