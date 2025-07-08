<template>
  <div class="document-list">
    <div class="search-container">
      <input 
        type="text" 
        v-model="searchQuery" 
        @input="filterDocuments" 
        placeholder="搜索文档..." 
        class="search-input"
      />
      <button @click="clearSearch" class="clear-btn">
        <i class="fa fa-times"></i>
      </button>
    </div>
    
    <div v-if="filteredDocuments.length === 0" class="empty-list">
      <p>暂无文档</p>
    </div>
    
    <div class="documents-container">
      <DocumentItem 
        v-for="document in filteredDocuments" 
        :key="document.id" 
        :document="document" 
        @select="handleSelectDocument"
      />
    </div>
  </div>
</template>

<script>
import { ref, computed, watch } from 'vue';
import { useStore } from 'vuex';
import DocumentItem from './DocumentItem.vue';

export default {
  name: 'DocumentList',
  components: {
    DocumentItem
  },
  emits: ['select-document'],
  setup(_, { emit }) {
    const store = useStore();
    const searchQuery = ref('');
    
    // 计算过滤后的文档列表
    const filteredDocuments = computed(() => {
      if (!searchQuery.value.trim()) {
        return store.state.documents;
      }
      
      const query = searchQuery.value.toLowerCase();
      return store.state.documents.filter(doc => 
        doc.title.toLowerCase().includes(query) || 
        (doc.content && doc.content.toLowerCase().includes(query))
      );
    });
    
    // 监听文档变化
    watch(() => store.state.documents, () => {
      // 文档列表更新时触发过滤
      filterDocuments();
    });
    
    // 过滤文档
    const filterDocuments = () => {
      // 触发过滤逻辑（已通过computed实现）
    };
    
    // 清除搜索
    const clearSearch = () => {
      searchQuery.value = '';
    };
    
    // 处理文档选择
    const handleSelectDocument = (documentId) => {
      emit('select-document', documentId);
    };
    
    return {
      searchQuery,
      filteredDocuments,
      filterDocuments,
      clearSearch,
      handleSelectDocument
    };
  }
};
</script>

<style scoped>
.document-list {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.search-container {
  display: flex;
  margin-bottom: 16px;
  position: relative;
}

.search-input {
  flex: 1;
  padding: 8px 12px;
  border: 1px solid #e9ecef;
  border-radius: 4px;
  outline: none;
}

.search-input:focus {
  border-color: #165DFF;
}

.clear-btn {
  position: absolute;
  right: 4px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: #6c757d;
  cursor: pointer;
}

.documents-container {
  flex: 1;
  overflow-y: auto;
}

.empty-list {
  text-align: center;
  padding: 24px;
  color: #6c757d;
}
</style>