<template>
  <div class="editor-wrapper">
    <Toolbar @command="executeCommand" />
    <div ref="editorContent" class="editor-content"></div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, watch } from 'vue';
import { Editor } from '@tiptap/vue-3';
import StarterKit from '@tiptap/starter-kit';
import Bold from '@tiptap/extension-bold';
import Italic from '@tiptap/extension-italic';
import Heading from '@tiptap/extension-heading';
import BulletList from '@tiptap/extension-bullet-list';
import OrderedList from '@tiptap/extension-ordered-list';
import Link from '@tiptap/extension-link';

const props = defineProps({
  content: {
    type: String,
    default: ''
  }
});

const emit = defineEmits(['content-change']);
const editorContent = ref(null);
const editor = ref(null);

// 初始化编辑器
onMounted(() => {
  editor.value = new Editor({
    element: editorContent.value,
    extensions: [
      StarterKit,
      Bold,
      Italic,
      Heading.configure({ levels: [1, 2, 3] }),
      BulletList,
      OrderedList,
      Link.configure({
        openOnClick: false
      })
    ],
    content: props.content,
    onUpdate: () => {
      const content = editor.value.getHTML();
      emit('content-change', content);
    }
  });
});

// 监听内容变化
watch(() => props.content, (newContent) => {
  if (editor.value && newContent !== editor.value.getHTML()) {
    editor.value.commands.setContent(newContent);
  }
});

// 执行工具栏命令
const executeCommand = (command, params) => {
  if (editor.value && editor.value.commands[command]) {
    editor.value.commands[command](params);
  }
};

// 销毁编辑器
onBeforeUnmount(() => {
  if (editor.value) {
    editor.value.destroy();
  }
});

// 移除这行！在<script setup>中不需要return
// return {
//   editorContent,
//   executeCommand
// };
</script>

<style scoped>
.editor-wrapper {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.editor-content {
  flex: 1;
  border: 1px solid #e9ecef;
  border-radius: 4px;
  padding: 16px;
  min-height: 500px;
  outline: none;
}
</style>