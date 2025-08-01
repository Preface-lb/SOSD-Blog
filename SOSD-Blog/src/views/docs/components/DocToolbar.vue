<template>
  <div class="toolbar">

    
    <div class="title-container">
      <h2 class="toolbar-title">{{ docTitle }}</h2>
      <!-- <div class="progress-bar">
        <div class="progress-fill" :style="{ width: `${progress}%` }"></div>
      </div> -->
    </div>
    
    <div class="toolbar-actions">
      <button 
        class="toolbar-btn share-btn" 
        @click="$emit('share')"
        aria-label="分享"
      >
        <i class="fas fa-share-alt" />
      </button>
      <button 
        class="toolbar-btn theme-toggle" 
        @click="$emit('toggle-dark')"
        aria-label="切换主题"
      >
        <i :class="isDark ? 'fas fa-sun' : 'fas fa-moon'" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, emit } from 'vue'

const props = defineProps({
  docTitle: {
    type: String,
    required: true
  },
  isDark: {
    type: Boolean,
    default: false
  },
  progress: {
    type: Number,
    default: 0
  }
})

const emit = defineEmits(['back', 'share', 'toggle-dark'])
</script>

<style scoped>
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

/* 响应式调整 */
@media (max-width: 768px) {
  .toolbar {
    max-width: calc(100vw - 120px);
  }
  
  .toolbar-title {
    font-size: 15px;
  }
}

@media (max-width: 480px) {
  .toolbar-title {
    display: none;
  }
  
  .progress-bar {
    display: none;
  }
}
</style>
