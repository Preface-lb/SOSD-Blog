<template>
  <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.1.0/css/all.css" integrity="sha384-lKuwvrZot6UHsBSfcMvOkWwlCMgc0TaWr+30HWe3a4ltaBwTZhyTEggF5tJv8tbt" crossorigin="anonymous">
      <!-- 工具栏 -->
    <div class="editor-toolbar" v-if="!readonly">
      <EditorToolbar 
        :editor="editor" 
        @upload-image="handleImageUpload"
        @insert-link="handleInsertLink"
        @insert-table="handleInsertTable"
      />
    </div>
  <div class="rich-text-editor" :class="{ 'is-focused': isFocused, 'is-readonly': readonly }">
    <!-- 工具栏
    <div class="editor-toolbar" v-if="!readonly">
      <EditorToolbar 
        :editor="editor" 
        @upload-image="handleImageUpload"
        @insert-link="handleInsertLink"
        @insert-table="handleInsertTable"
      />
    </div> -->

    <!-- 编辑器容器 -->
    <div class="editor-container">
      <!-- 气泡菜单 -->
      <BubbleMenu
        v-if="editor"
        :editor="editor"
        :tippy-options="{ duration: 100, placement: 'top' }"
        class="bubble-menu"
      >
        <div class="bubble-menu-content">
          <button
            @click="editor.chain().focus().toggleBold().run()"
            :class="{ 'is-active': editor.isActive('bold') }"
            class="bubble-btn"
            title="粗体"
          >
            <i class="fas fa-bold"></i>
          </button>
          <button
            @click="editor.chain().focus().toggleItalic().run()"
            :class="{ 'is-active': editor.isActive('italic') }"
            class="bubble-btn"
            title="斜体"
          >
            <i class="fas fa-italic"></i>
          </button>
          <button
            @click="editor.chain().focus().toggleUnderline().run()"
            :class="{ 'is-active': editor.isActive('underline') }"
            class="bubble-btn"
            title="下划线"
          >
            <i class="fas fa-underline"></i>
          </button>
          <div class="separator"></div>
          <button
            @click="handleBubbleLink"
            :class="{ 'is-active': editor.isActive('link') }"
            class="bubble-btn"
            title="链接"
          >
            <i class="fas fa-link"></i>
          </button>
          <button
            @click="editor.chain().focus().toggleHighlight().run()"
            :class="{ 'is-active': editor.isActive('highlight') }"
            class="bubble-btn"
            title="高亮"
          >
            <i class="fas fa-highlighter"></i>
          </button>
          <button
            @click="editor.chain().focus().toggleCode().run()"
            :class="{ 'is-active': editor.isActive('code') }"
            class="bubble-btn"
            title="行内代码"
          >
            <i class="fas fa-code"></i>
          </button>
        </div>
      </BubbleMenu>

      <!-- 浮动菜单 -->
      <FloatingMenu
        v-if="editor"
        :editor="editor"
        :tippy-options="{ duration: 100, placement: 'top-start' }"
        class="floating-menu"
      >
        <div class="floating-menu-content">
          <button
            @click="editor.chain().focus().toggleHeading({ level: 1 }).run()"
            class="floating-btn"
          >
            <i class="fas fa-heading"></i>
            <span>标题 1</span>
          </button>
          <button
            @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
            class="floating-btn"
          >
            <i class="fas fa-heading"></i>
            <span>标题 2</span>
          </button>
          <button
            @click="editor.chain().focus().toggleBulletList().run()"
            class="floating-btn"
          >
            <i class="fas fa-list-ul"></i>
            <span>无序列表</span>
          </button>
          <button
            @click="editor.chain().focus().toggleOrderedList().run()"
            class="floating-btn"
          >
            <i class="fas fa-list-ol"></i>
            <span>有序列表</span>
          </button>
          <button
            @click="editor.chain().focus().toggleTaskList().run()"
            class="floating-btn"
          >
            <i class="fas fa-tasks"></i>
            <span>任务列表</span>
          </button>
          <button
            @click="editor.chain().focus().toggleBlockquote().run()"
            class="floating-btn"
          >
            <i class="fas fa-quote-left"></i>
            <span>引用</span>
          </button>
          <button
            @click="editor.chain().focus().setHorizontalRule().run()"
            class="floating-btn"
          >
            <i class="fas fa-minus"></i>
            <span>分割线</span>
          </button>
          <button
            @click="editor.chain().focus().toggleCodeBlock().run()"
            class="floating-btn"
          >
            <i class="fas fa-code"></i>
            <span>代码块</span>
          </button>
        </div>
      </FloatingMenu>

      <!-- 编辑器内容区域 -->
      <div 
        ref="editorElement" 
        class="editor-content"
        @contextmenu.prevent="showContextMenu"
      ></div>

      <!-- 右键菜单 -->
      <div
        v-if="showContext"
        class="context-menu"
        :style="{ left: contextX + 'px', top: contextY + 'px' }"
        @click.stop
      >
        <div class="context-menu-group">
          <button @click="executeCommand('toggleBold')" class="context-menu-item">
            <i class="fas fa-bold"></i>
            <span>粗体</span>
          </button>
          <button @click="executeCommand('toggleItalic')" class="context-menu-item">
            <i class="fas fa-italic"></i>
            <span>斜体</span>
          </button>
          <button @click="executeCommand('toggleUnderline')" class="context-menu-item">
            <i class="fas fa-underline"></i>
            <span>下划线</span>            
          </button>
        </div>
        <div class="context-menu-separator"></div>
        <div class="context-menu-group">
          <button @click="executeCommand('toggleHeading', { level: 1 })" class="context-menu-item">
            <i class="fas fa-heading"></i>
            <span>标题 1</span>
          </button>
          <button @click="executeCommand('toggleHeading', { level: 2 })" class="context-menu-item">
            <i class="fas fa-heading"></i>
            <span>标题 2</span>
          </button>
          <button @click="executeCommand('setParagraph')" class="context-menu-item">
            <i class="fas fa-paragraph"></i>
            <span>正文</span>
          </button>
        </div>
        <div class="context-menu-separator"></div>
        <div class="context-menu-group">
          <button @click="executeCommand('toggleBulletList')" class="context-menu-item">
            <i class="fas fa-list-ul"></i>
            <span>无序列表</span>
          </button>
          <button @click="executeCommand('toggleOrderedList')" class="context-menu-item">
            <i class="fas fa-list-ol"></i>
            <span>有序列表</span>
          </button>
          <button @click="executeCommand('toggleBlockquote')" class="context-menu-item">
            <i class="fas fa-quote-left"></i>
            <span>引用</span>
          </button>
        </div>
      </div>
    </div>

    <!-- 底部状态栏
    <div class="editor-footer" v-if="showFooter">
      <div class="status-info">
        <span class="word-count">{{ wordCount }} 词</span>
        <span class="char-count">{{ charCount }} 字符</span>
        <span v-if="maxCharacters" class="char-limit" :class="{ 'over-limit': isOverLimit }">
          {{ charCount }}/{{ maxCharacters }}
        </span>
      </div>
      <div class="editor-actions">
        <button @click="saveContent" class="save-btn" title="保存 (Ctrl+S)">
          <i class="fas fa-save"></i>
          保存
        </button>
      </div>
    </div> -->

    <!-- 隐藏的文件输入 -->
    <input
      ref="fileInput"
      type="file"
      accept="image/*"
      @change="handleFileUpload"
      style="display: none"
    />
  </div>
     <!-- 底部状态栏 -->
    <div class="editor-footer" v-if="showFooter">
      <div class="status-info">
        <span class="word-count">{{ wordCount }} 词</span>
        <span class="char-count">{{ charCount }} 字符</span>
        <span v-if="maxCharacters" class="char-limit" :class="{ 'over-limit': isOverLimit }">
          {{ charCount }}/{{ maxCharacters }}
        </span>
      </div>
      <div class="editor-actions">
        <button @click="saveContent" class="save-btn" title="保存 (Ctrl+S)">
          <i class="fas fa-save"></i>
          保存
        </button>
      </div>
    </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, watch, computed, nextTick } from 'vue'
import { Editor, BubbleMenu, FloatingMenu } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import Link from '@tiptap/extension-link'
import Image from '@tiptap/extension-image'
import Table from '@tiptap/extension-table'
import TableRow from '@tiptap/extension-table-row'
import TableHeader from '@tiptap/extension-table-header'
import TableCell from '@tiptap/extension-table-cell'
import TextAlign from '@tiptap/extension-text-align'
import Highlight from '@tiptap/extension-highlight'
import TaskList from '@tiptap/extension-task-list'
import TaskItem from '@tiptap/extension-task-item'
import Placeholder from '@tiptap/extension-placeholder'
import CharacterCount from '@tiptap/extension-character-count'
import TextStyle from '@tiptap/extension-text-style'
import Color from '@tiptap/extension-color'
import FontFamily from '@tiptap/extension-font-family'
import EditorToolbar from './Toolbar.vue'

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  readonly: {
    type: Boolean,
    default: false
  },
  placeholder: {
    type: String,
    default: '开始输入内容...'
  },
  maxCharacters: {
    type: Number,
    default: null
  },
  showFooter: {
    type: Boolean,
    default: true
  },
  autoSave: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:modelValue', 'save', 'focus', 'blur'])

// 响应式数据
const editor = ref(null)
const editorElement = ref(null)
const fileInput = ref(null)
const isFocused = ref(false)
const showContext = ref(false)
const contextX = ref(0)
const contextY = ref(0)

// 计算属性
const wordCount = computed(() => {
  if (!editor.value) return 0
  const text = editor.value.getText()
  return text.trim() ? text.trim().split(/\s+/).length : 0
})

const charCount = computed(() => {
  if (!editor.value) return 0
  return editor.value.storage.characterCount?.characters() || 0
})

const isOverLimit = computed(() => {
  return props.maxCharacters && charCount.value > props.maxCharacters
})

// 初始化编辑器
onMounted(async () => {
  await nextTick()
  
  const extensions = [
    StarterKit.configure({
      heading: {
        levels: [1, 2, 3, 4, 5, 6]
      }
    }),
    Underline,
    Link.configure({
      openOnClick: false,
      HTMLAttributes: {
        target: '_blank',
        rel: 'noopener noreferrer',
        class: 'editor-link'
      }
    }),
    Image.configure({
      HTMLAttributes: {
        class: 'editor-image'
      }
    }),
    Table.configure({
      resizable: true,
      HTMLAttributes: {
        class: 'editor-table'
      }
    }),
    TableRow,
    TableHeader,
    TableCell,
    TextAlign.configure({
      types: ['heading', 'paragraph']
    }),
    Highlight.configure({
      multicolor: true
    }),
    TaskList.configure({
      HTMLAttributes: {
        class: 'task-list'
      }
    }),
    TaskItem.configure({
      nested: true,
      HTMLAttributes: {
        class: 'task-item'
      }
    }),
    Placeholder.configure({
      placeholder: props.placeholder
    }),
    TextStyle,
    Color,
    FontFamily
  ]

  if (props.maxCharacters) {
    extensions.push(CharacterCount.configure({
      limit: props.maxCharacters
    }))
  }

  editor.value = new Editor({
    element: editorElement.value,
    extensions,
    content: props.modelValue,
    editable: !props.readonly,
    onUpdate: ({ editor }) => {
      const content = editor.getHTML()
      emit('update:modelValue', content)
      
      if (props.autoSave) {
        saveContent()
      }
    },
    onFocus: () => {
      isFocused.value = true
      emit('focus')
    },
    onBlur: () => {
      isFocused.value = false
      emit('blur')
    }
  })

  // 添加事件监听
  document.addEventListener('keydown', handleKeydown)
  document.addEventListener('click', handleDocumentClick)
})

// 监听内容变化
watch(() => props.modelValue, (newValue) => {
  if (editor.value && newValue !== editor.value.getHTML()) {
    editor.value.commands.setContent(newValue)
  }
})

// 执行命令
const executeCommand = (command, params) => {
  if (editor.value?.commands[command]) {
    editor.value.commands[command](params)
    editor.value.view.focus()
  }
  showContext.value = false
}

// 处理图片上传
const handleImageUpload = () => {
  fileInput.value?.click()
}

const handleFileUpload = (event) => {
  const file = event.target.files[0]
  if (file && file.type.startsWith('image/')) {
    const reader = new FileReader()
    reader.onload = (e) => {
      editor.value?.commands.setImage({ src: e.target.result })
    }
    reader.readAsDataURL(file)
  }
  event.target.value = ''
}

// 处理链接插入
const handleInsertLink = () => {
  const url = prompt('请输入链接地址:')
  if (url) {
    editor.value?.commands.setLink({ href: url })
  }
}

const handleBubbleLink = () => {
  if (editor.value?.isActive('link')) {
    editor.value.commands.unsetLink()
  } else {
    handleInsertLink()
  }
}

// 处理表格插入
const handleInsertTable = () => {
  editor.value?.commands.insertTable({ rows: 3, cols: 3, withHeaderRow: true })
}

// 快捷键处理
const handleKeydown = (e) => {
  if (!editor.value || !isFocused.value) return
  
  if (e.ctrlKey || e.metaKey) {
    switch (e.key) {
      case 'b':
        e.preventDefault()
        editor.value.commands.toggleBold()
        break
      case 'i':
        e.preventDefault()
        editor.value.commands.toggleItalic()
        break
      case 'u':
        e.preventDefault()
        editor.value.commands.toggleUnderline()
        break
      case 's':
        e.preventDefault()
        saveContent()
        break
    }
  }
}

// 右键菜单
const showContextMenu = (e) => {
  if (props.readonly) return
  
  e.preventDefault()
  const rect = editorElement.value.getBoundingClientRect()
  contextX.value = e.clientX - rect.left
  contextY.value = e.clientY - rect.top
  showContext.value = true
}

// 点击文档关闭菜单
const handleDocumentClick = (e) => {
  if (showContext.value && !e.target.closest('.context-menu')) {
    showContext.value = false
  }
}

// 保存内容
const saveContent = () => {
  emit('save', editor.value?.getHTML())
}

// 清理
onBeforeUnmount(() => {
  editor.value?.destroy()
  document.removeEventListener('keydown', handleKeydown)
  document.removeEventListener('click', handleDocumentClick)
})

// 暴露方法
defineExpose({
  editor,
  executeCommand,
  focus: () => editor.value?.commands.focus(),
  blur: () => editor.value?.commands.blur(),
  getHTML: () => editor.value?.getHTML(),
  getText: () => editor.value?.getText(),
  setContent: (content) => editor.value?.commands.setContent(content),
  clearContent: () => editor.value?.commands.clearContent()
})
</script>

<style scoped>
.rich-text-editor {
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  background: #ffffff;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease;
  overflow: hidden;
}

.rich-text-editor.is-focused {
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.rich-text-editor.is-readonly {
  background: #f9fafb;
  border-color: #d1d5db;
}

.editor-toolbar {
  border-bottom: 1px solid #e5e7eb;
  background: #f8fafc;
}

.editor-container {
  position: relative;
}

.editor-content {
  min-height: 815px;
  max-height: 815px;
  padding: 20px;
  outline: none;
  font-size: 16px;
  line-height: 1.6;
  color: #374151;
  overflow-y: auto;
}


/* 气泡菜单样式 */
.bubble-menu {
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
  padding: 4px;
  display: flex;
  align-items: center;
  gap: 2px;
}

.bubble-menu-content {
  display: flex;
  align-items: center;
  gap: 2px;
}

.bubble-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border: none;
  background: transparent;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
  color: #6b7280;
}

.bubble-btn:hover {
  background: #f3f4f6;
  color: #374151;
}

.bubble-btn.is-active {
  background: #3b82f6;
  color: #ffffff;
}

.separator {
  width: 1px;
  height: 20px;
  background: #e5e7eb;
  margin: 0 4px;
}

/* 浮动菜单样式 */
.floating-menu {
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
  padding: 8px;
  min-width: 200px;
}

.floating-menu-content {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.floating-btn {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 12px;
  border: none;
  background: transparent;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
  color: #374151;
  font-size: 14px;
  text-align: left;
}

.floating-btn:hover {
  background: #f3f4f6;
}

.floating-btn i {
  width: 16px;
  color: #6b7280;
}

/* 右键菜单样式 */
.context-menu {
  position: absolute;
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
  padding: 8px;
  z-index: 1000;
  min-width: 200px;
}

.context-menu-group {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.context-menu-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 12px;
  border: none;
  background: transparent;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
  color: #374151;
  font-size: 14px;
  text-align: left;
}

.context-menu-item:hover {
  background: #f3f4f6;
}

.context-menu-item i {
  width: 16px;
  color: #6b7280;
}

.context-menu-item kbd {
  margin-left: auto;
  padding: 2px 6px;
  background: #f3f4f6;
  border-radius: 4px;
  font-size: 12px;
  color: #6b7280;
}

.context-menu-separator {
  height: 1px;
  background: #e5e7eb;
  margin: 4px 0;
}

/* 底部状态栏 */
.editor-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 20px;
  border-top: 1px solid #e5e7eb;
  background: #f8fafc;
  font-size: 14px;
}

.status-info {
  display: flex;
  gap: 16px;
  color: #6b7280;
}

.char-limit.over-limit {
  color: #ef4444;
  font-weight: 500;
}

.save-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 12px;
  border: 1px solid #d1d5db;
  background: #ffffff;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
  color: #374151;
  font-size: 14px;
}

.save-btn:hover {
  background: #f9fafb;
  border-color: #9ca3af;
}

/* 编辑器内容样式 */
:deep(.ProseMirror) {
  outline: none;
}

:deep(.ProseMirror h1) {
  font-size: 2em;
  font-weight: 700;
  margin: 1em 0 0.5em;
  color: #111827;
}

:deep(.ProseMirror h2) {
  font-size: 1.5em;
  font-weight: 600;
  margin: 0.8em 0 0.4em;
  color: #111827;
}

:deep(.ProseMirror h3) {
  font-size: 1.25em;
  font-weight: 600;
  margin: 0.6em 0 0.3em;
  color: #111827;
}

:deep(.ProseMirror p) {
  margin: 0.5em 0;
}

:deep(.ProseMirror ul, .ProseMirror ol) {
  padding-left: 1.5em;
  margin: 0.5em 0;
}

:deep(.ProseMirror li) {
  margin: 0.25em 0;
}

:deep(.ProseMirror blockquote) {
  border-left: 4px solid #e5e7eb;
  padding-left: 1em;
  margin: 1em 0;
  color: #6b7280;
  font-style: italic;
}

:deep(.ProseMirror code) {
  background: #f3f4f6;
  padding: 2px 4px;
  border-radius: 4px;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  font-size: 0.9em;
}

:deep(.ProseMirror pre) {
  background: #1f2937;
  color: #f9fafb;
  padding: 1em;
  border-radius: 8px;
  margin: 1em 0;
  overflow-x: auto;
}

:deep(.ProseMirror pre code) {
  background: transparent;
  padding: 0;
  color: inherit;
}

:deep(.ProseMirror .editor-image) {
  max-width: 100%;
  height: auto;
  border-radius: 8px;
  margin: 1em 0;
}

:deep(.ProseMirror .editor-link) {
  color: #3b82f6;
  text-decoration: underline;
}

:deep(.ProseMirror .editor-link:hover) {
  color: #1d4ed8;
}

:deep(.ProseMirror .editor-table) {
  border-collapse: collapse;
  margin: 1em 0;
  width: 100%;
}

:deep(.ProseMirror .editor-table td, .ProseMirror .editor-table th) {
  border: 1px solid #e5e7eb;
  padding: 8px 12px;
  text-align: left;
}

:deep(.ProseMirror .editor-table th) {
  background: #f9fafb;
  font-weight: 600;
}

:deep(.ProseMirror .task-list) {
  list-style: none;
  padding-left: 0;
}

:deep(.ProseMirror .task-item) {
  display: flex;
  align-items: flex-start;
  gap: 8px;
}

:deep(.ProseMirror .task-item input[type="checkbox"]) {
  margin-top: 4px;
}

:deep(.ProseMirror hr) {
  border: none;
  border-top: 2px solid #e5e7eb;
  margin: 2em 0;
}

:deep(.ProseMirror mark) {
  background: #fef3c7;
  padding: 2px 4px;
  border-radius: 4px;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .editor-content {
    padding: 16px;
    font-size: 16px;
  }
  
  .editor-footer {
    padding: 8px 16px;
    flex-direction: column;
    gap: 8px;
    align-items: stretch;
  }
  
  .status-info {
    justify-content: center;
  }
}
</style>
