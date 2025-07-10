<template>
  <div class="editor-toolbar">
    <!-- 历史操作组 -->
    <div class="toolbar-group">
      <button
        @click="execute('undo')"
        :disabled="!canUndo"
        class="toolbar-btn"
        title="撤销 (Ctrl+Z)"
      >
        <i class="fas fa-undo"></i>
      </button>
      <button
        @click="execute('redo')"
        :disabled="!canRedo"
        class="toolbar-btn"
        title="重做 (Ctrl+Y)"
      >
        <i class="fas fa-redo"></i>
      </button>
    </div>

    <div class="toolbar-separator"></div>

    <!-- 文本格式组 -->
    <div class="toolbar-group">
      <button
        @click="execute('toggleBold')"
        :class="{ active: isActive('bold') }"
        class="toolbar-btn"
        title="粗体 (Ctrl+B)"
      >
        <i class="fas fa-bold"></i>
      </button>
      <button
        @click="execute('toggleItalic')"
        :class="{ active: isActive('italic') }"
        class="toolbar-btn"
        title="斜体 (Ctrl+I)"
      >
        <i class="fas fa-italic"></i>
      </button>
      <button
        @click="execute('toggleUnderline')"
        :class="{ active: isActive('underline') }"
        class="toolbar-btn"
        title="下划线 (Ctrl+U)"
      >
        <i class="fas fa-underline"></i>
      </button>
      <button
        @click="execute('toggleStrike')"
        :class="{ active: isActive('strike') }"
        class="toolbar-btn"
        title="删除线"
      >
        <i class="fas fa-strikethrough"></i>
      </button>
      <button
        @click="execute('toggleHighlight')"
        :class="{ active: isActive('highlight') }"
        class="toolbar-btn"
        title="高亮"
      >
        <i class="fas fa-highlighter"></i>
      </button>
      <button
        @click="execute('toggleCode')"
        :class="{ active: isActive('code') }"
        class="toolbar-btn"
        title="行内代码"
      >
        <i class="fas fa-code"></i>
      </button>
    </div>

    <div class="toolbar-separator"></div>

    <!-- 标题和段落组 -->
    <div class="toolbar-group">
      <div class="dropdown" ref="headingDropdown">
        <button
          @click="toggleHeadingDropdown"
          class="toolbar-btn dropdown-btn"
          title="标题"
        >
          <i class="fas fa-heading"></i>
          <i class="fas fa-chevron-down dropdown-arrow"></i>
        </button>
        <div v-if="showHeadingDropdown" class="dropdown-menu">
          <button @click="setHeading(0)" class="dropdown-item" :class="{ active: isActive('paragraph') }">
            <span class="heading-preview normal">正文</span>
          </button>
          <button @click="setHeading(1)" class="dropdown-item" :class="{ active: isActive('heading', { level: 1 }) }">
            <span class="heading-preview h1">标题 1</span>
          </button>
          <button @click="setHeading(2)" class="dropdown-item" :class="{ active: isActive('heading', { level: 2 }) }">
            <span class="heading-preview h2">标题 2</span>
          </button>
          <button @click="setHeading(3)" class="dropdown-item" :class="{ active: isActive('heading', { level: 3 }) }">
            <span class="heading-preview h3">标题 3</span>
          </button>
          <button @click="setHeading(4)" class="dropdown-item" :class="{ active: isActive('heading', { level: 4 }) }">
            <span class="heading-preview h4">标题 4</span>
          </button>
          <button @click="setHeading(5)" class="dropdown-item" :class="{ active: isActive('heading', { level: 5 }) }">
            <span class="heading-preview h5">标题 5</span>
          </button>
          <button @click="setHeading(6)" class="dropdown-item" :class="{ active: isActive('heading', { level: 6 }) }">
            <span class="heading-preview h6">标题 6</span>
          </button>
        </div>
      </div>
    </div>

    <div class="toolbar-separator"></div>

    <!-- 颜色组 -->
    <div class="toolbar-group">
      <div class="dropdown" ref="colorDropdown">
        <button
          @click="toggleColorDropdown"
          class="toolbar-btn dropdown-btn"
          title="文字颜色"
        >
          <i class="fas fa-palette"></i>
          <i class="fas fa-chevron-down dropdown-arrow"></i>
        </button>
        <div v-if="showColorDropdown" class="dropdown-menu color-menu">
          <div class="color-grid">
            <button
              v-for="color in textColors"
              :key="color.value"
              @click="setTextColor(color.value)"
              class="color-btn"
              :style="{ backgroundColor: color.value }"
              :title="color.name"
            ></button>
          </div>
          <div class="color-actions">
            <button @click="setTextColor('')" class="color-action-btn">
              <i class="fas fa-times"></i>
              清除颜色
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="toolbar-separator"></div>

    <!-- 对齐组 -->
    <div class="toolbar-group">
      <button
        @click="execute('setTextAlign', { alignment: 'left' })"
        :class="{ active: isActive({ textAlign: 'left' }) }"
        class="toolbar-btn"
        title="左对齐"
      >
        <i class="fas fa-align-left"></i>
      </button>
      <button
        @click="execute('setTextAlign', { alignment: 'center' })"
        :class="{ active: isActive({ textAlign: 'center' }) }"
        class="toolbar-btn"
        title="居中对齐"
      >
        <i class="fas fa-align-center"></i>
      </button>
      <button
        @click="execute('setTextAlign', { alignment: 'right' })"
        :class="{ active: isActive({ textAlign: 'right' }) }"
        class="toolbar-btn"
        title="右对齐"
      >
        <i class="fas fa-align-right"></i>
      </button>
      <button
        @click="execute('setTextAlign', { alignment: 'justify' })"
        :class="{ active: isActive({ textAlign: 'justify' }) }"
        class="toolbar-btn"
        title="两端对齐"
      >
        <i class="fas fa-align-justify"></i>
      </button>
    </div>

    <div class="toolbar-separator"></div>

    <!-- 列表组 -->
    <div class="toolbar-group">
      <button
        @click="execute('toggleBulletList')"
        :class="{ active: isActive('bulletList') }"
        class="toolbar-btn"
        title="无序列表"
      >
        <i class="fas fa-list-ul"></i>
      </button>
      <button
        @click="execute('toggleOrderedList')"
        :class="{ active: isActive('orderedList') }"
        class="toolbar-btn"
        title="有序列表"
      >
        <i class="fas fa-list-ol"></i>
      </button>
      <button
        @click="execute('toggleTaskList')"
        :class="{ active: isActive('taskList') }"
        class="toolbar-btn"
        title="任务列表"
      >
        <i class="fas fa-tasks"></i>
      </button>
      <button
        @click="execute('toggleBlockquote')"
        :class="{ active: isActive('blockquote') }"
        class="toolbar-btn"
        title="引用"
      >
        <i class="fas fa-quote-left"></i>
      </button>
    </div>

    <div class="toolbar-separator"></div>

    <!-- 插入组 -->
    <div class="toolbar-group">
      <button
        @click="handleInsertLink"
        :class="{ active: isActive('link') }"
        class="toolbar-btn"
        title="插入链接"
      >
        <i class="fas fa-link"></i>
      </button>
      <button
        @click="$emit('upload-image')"
        class="toolbar-btn"
        title="插入图片"
      >
        <i class="fas fa-image"></i>
      </button>
      <button
        @click="$emit('insert-table')"
        class="toolbar-btn"
        title="插入表格"
      >
        <i class="fas fa-table"></i>
      </button>
      <button
        @click="execute('setHorizontalRule')"
        class="toolbar-btn"
        title="分割线"
      >
        <i class="fas fa-minus"></i>
      </button>
      <button
        @click="execute('toggleCodeBlock')"
        :class="{ active: isActive('codeBlock') }"
        class="toolbar-btn"
        title="代码块"
      >
        <i class="fas fa-code"></i>
      </button>
    </div>

    <div class="toolbar-separator"></div>

    <!-- 工具组 -->
    <div class="toolbar-group">
      <button
        @click="clearFormat"
        class="toolbar-btn"
        title="清除格式"
      >
        <i class="fas fa-eraser"></i>
      </button>
      <button
        @click="toggleFullscreen"
        class="toolbar-btn"
        title="全屏模式"
      >
        <i class="fas fa-expand"></i>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'

const props = defineProps({
  editor: {
    type: Object,
    default: null
  }
})

const emit = defineEmits(['upload-image', 'insert-link', 'insert-table'])

// 响应式数据
const headingDropdown = ref(null)
const colorDropdown = ref(null)
const showHeadingDropdown = ref(false)
const showColorDropdown = ref(false)

// 文字颜色选项
const textColors = [
  { name: '黑色', value: '#000000' },
  { name: '深灰', value: '#374151' },
  { name: '灰色', value: '#6b7280' },
  { name: '浅灰', value: '#9ca3af' },
  { name: '红色', value: '#ef4444' },
  { name: '橙色', value: '#f97316' },
  { name: '黄色', value: '#eab308' },
  { name: '绿色', value: '#22c55e' },
  { name: '青色', value: '#06b6d4' },
  { name: '蓝色', value: '#3b82f6' },
  { name: '紫色', value: '#8b5cf6' },
  { name: '粉色', value: '#ec4899' }
]

// 计算属性
const canUndo = computed(() => props.editor?.can().undo() || false)
const canRedo = computed(() => props.editor?.can().redo() || false)

// 方法
const isActive = (name, attributes = {}) => {
  if (!props.editor) return false
  return props.editor.isActive(name, attributes)
}

const execute = (command, params) => {
  if (props.editor?.commands[command]) {
    props.editor.commands[command](params)
    props.editor.view.focus()
  }
}

const setHeading = (level) => {
  if (level === 0) {
    execute('setParagraph')
  } else {
    execute('toggleHeading', { level })
  }
  showHeadingDropdown.value = false
}

const setTextColor = (color) => {
  execute('setColor', color)
  showColorDropdown.value = false
}

const handleInsertLink = () => {
  if (props.editor?.isActive('link')) {
    props.editor.commands.unsetLink()
  } else {
    emit('insert-link')
  }
}

const clearFormat = () => {
  execute('clearNodes')
  execute('unsetAllMarks')
}

const toggleFullscreen = () => {
  // 全屏功能实现
  const element = document.querySelector('.rich-text-editor')
  if (document.fullscreenElement) {
    document.exitFullscreen()
  } else {
    element?.requestFullscreen()
  }
}

const toggleHeadingDropdown = () => {
  showHeadingDropdown.value = !showHeadingDropdown.value
  showColorDropdown.value = false
}

const toggleColorDropdown = () => {
  showColorDropdown.value = !showColorDropdown.value
  showHeadingDropdown.value = false
}

const handleClickOutside = (event) => {
  if (headingDropdown.value && !headingDropdown.value.contains(event.target)) {
    showHeadingDropdown.value = false
  }
  if (colorDropdown.value && !colorDropdown.value.contains(event.target)) {
    showColorDropdown.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<style scoped>
.editor-toolbar {
  display: flex;
  align-items: center;
  padding: 12px 16px;
  background: #f8fafc;
  border-bottom: 1px solid #e5e7eb;
  flex-wrap: wrap;
  gap: 8px;
}

.toolbar-group {
  display: flex;
  align-items: center;
  gap: 4px;
}

.toolbar-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border: none;
  background: transparent;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  color: #6b7280;
  position: relative;
}

.toolbar-btn:hover {
  background: #e5e7eb;
  color: #374151;
}

.toolbar-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.toolbar-btn:disabled:hover {
  background: transparent;
  color: #6b7280;
}

.toolbar-btn.active {
  background: #3b82f6;
  color: #ffffff;
}

.toolbar-btn.active:hover {
  background: #2563eb;
}

.dropdown {
  position: relative;
}

.dropdown-btn {
  width: auto;
  padding: 0 12px;
  gap: 8px;
}

.dropdown-arrow {
  font-size: 12px;
  transition: transform 0.2s ease;
}

.dropdown-btn:hover .dropdown-arrow {
  transform: rotate(180deg);
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
  padding: 8px;
  z-index: 1000;
  min-width: 200px;
  margin-top: 4px;
}

.dropdown-item {
  display: flex;
  align-items: center;
  width: 100%;
  padding: 8px 12px;
  border: none;
  background: transparent;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
  text-align: left;
}

.dropdown-item:hover {
  background: #f3f4f6;
}

.dropdown-item.active {
  background: #eff6ff;
  color: #3b82f6;
}

.heading-preview {
  font-weight: 600;
}

.heading-preview.normal {
  font-size: 14px;
  font-weight: 400;
}

.heading-preview.h1 {
  font-size: 20px;
}

.heading-preview.h2 {
  font-size: 18px;
}

.heading-preview.h3 {
  font-size: 16px;
}

.heading-preview.h4 {
  font-size: 15px;
}

.heading-preview.h5 {
  font-size: 14px;
}

.heading-preview.h6 {
  font-size: 13px;
}

.color-menu {
  min-width: 240px;
}

.color-grid {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 8px;
  margin-bottom: 12px;
}

.color-btn {
  width: 28px;
  height: 28px;
  border: 2px solid #e5e7eb;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.color-btn:hover {
  transform: scale(1.1);
  border-color: #9ca3af;
}

.color-actions {
  border-top: 1px solid #e5e7eb;
  padding-top: 8px;
}

.color-action-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  padding: 8px 12px;
  border: none;
  background: transparent;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
  color: #6b7280;
  font-size: 14px;
}

.color-action-btn:hover {
  background: #f3f4f6;
  color: #374151;
}

.toolbar-separator {
  width: 1px;
  height: 24px;
  background: #d1d5db;
  margin: 0 4px;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .editor-toolbar {
    padding: 8px 12px;
    gap: 4px;
  }
  
  .toolbar-btn {
    width: 32px;
    height: 32px;
  }
  
  .toolbar-separator {
    display: none;
  }
  
  .dropdown-menu {
    min-width: 180px;
  }
}

@media (max-width: 480px) {
  .editor-toolbar {
    justify-content: center;
  }
  
  .toolbar-group {
    gap: 2px;
  }
  
  .toolbar-btn {
    width: 28px;
    height: 28px;
  }
}
</style>
