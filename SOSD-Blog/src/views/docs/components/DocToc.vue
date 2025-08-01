<template>
  <div class="toc">
    <div class="toc-header">
      <h3>目录</h3>
      <div class="toc-divider"></div>
    </div>
    <ul class="toc-list">
      <li 
        v-for="(item, index) in toc" 
        :key="index"
        class="toc-item"
        :class="['toc-item', { 'active': activeId === item.id }, 'level-' + item.level]"
      >
        <button 
          class="toc-link"
          @click="$emit('scroll-to', item.id)"
          :aria-current="activeId === item.id ? 'page' : undefined"
        >
          <span class="toc-text">{{ item.text }}</span>
          <span class="toc-indicator" v-if="activeId === item.id"></span>
        </button>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
  toc: {
    type: Array,
    required: true,
    default: () => []
  },
  activeId: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['scroll-to'])
</script>

<style scoped>
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
  margin: 0 0 8px 0;
  font-size: 18px;
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
  margin-bottom: 4px;
}

.toc-link {
  display: flex;
  align-items: center;
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  padding: 6px 8px;
  border-radius: 6px;
  cursor: pointer;
  color: #64748b;
  font-size: 14px;
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

/* 目录层级缩进 */
.toc-item.level-2 .toc-link {
  padding-left: 16px;
}

.toc-item.level-3 .toc-link {
  padding-left: 32px;
}

.toc-item.level-4 .toc-link {
  padding-left: 48px;
}
</style>
