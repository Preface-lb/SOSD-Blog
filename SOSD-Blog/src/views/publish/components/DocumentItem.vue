<template>
  <div 
    :class="['document-item', { active: document.id === selectedDocumentId }]" 
    @click="selectDocument"
  >
    <div class="document-title">
      {{ document.title || '未命名文档' }}
    </div>
    <div class="document-meta">
      <span class="document-date">
        <i class="fa fa-calendar-o"></i> 
        {{ formatDate(document.updatedAt || document.createdAt) }}
      </span>
    </div>
  </div>
</template>

<script>
import { ref, computed, watch } from 'vue';
import { useRoute } from 'vue-router';

export default {
  name: 'DocumentItem',
  props: {
    document: {
      type: Object,
      required: true
    }
  },
  emits: ['select'],
  setup(props, { emit }) {
    const route = useRoute();
    
    // 当前选中的文档ID
    const selectedDocumentId = computed(() => {
      return route.params.id;
    });
    
    // 格式化日期
    const formatDate = (dateString) => {
      if (!dateString) return '';
      const date = new Date(dateString);
      return date.toLocaleString('zh-CN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
      });
    };
    
    // 选择文档
    const selectDocument = () => {
      emit('select', props.document.id);
    };
    
    return {
      selectedDocumentId,
      formatDate,
      selectDocument
    };
  }
};
</script>

<style scoped>
.document-item {
  padding: 12px;
  border-radius: 4px;
  margin-bottom: 8px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.document-item:hover {
  background-color: #e9ecef;
}

.document-item.active {
  background-color: #d1e7dd;
  border-left: 3px solid #198754;
}

.document-title {
  font-weight: 500;
  margin-bottom: 4px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.document-meta {
  font-size: 12px;
  color: #6c757d;
}

.document-date {
  display: flex;
  align-items: center;
}

.document-date i {
  margin-right: 4px;
}
</style>