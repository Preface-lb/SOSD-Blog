<template>
  <div class="editor-toolbar">
    <button @click="execute('toggleBold')" title="粗体 (Ctrl+B)">
      <i class="fa fa-bold"></i>
    </button>
    <button @click="execute('toggleItalic')" title="斜体 (Ctrl+I)">
      <i class="fa fa-italic"></i>
    </button>
    <button @click="execute('toggleHeading', { level: 1 })" title="标题 1">
      <i class="fa fa-header"><sup>1</sup></i>
    </button>
    <button @click="execute('toggleHeading', { level: 2 })" title="标题 2">
      <i class="fa fa-header"><sup>2</sup></i>
    </button>
    <button @click="execute('toggleBulletList')" title="无序列表">
      <i class="fa fa-list-ul"></i>
    </button>
    <button @click="execute('toggleOrderedList')" title="有序列表">
      <i class="fa fa-list-ol"></i>
    </button>
    <button @click="insertLink" title="插入链接">
      <i class="fa fa-link"></i>
    </button>
    <button @click="insertImage" title="插入图片">
      <i class="fa fa-image"></i>
    </button>
  </div>
</template>

<script>
export default {
  name: 'Toolbar',
  emits: ['command'],
  setup(_, { emit }) {
    // 执行命令
    const execute = (command, params) => {
      emit('command', command, params);
    };
    
    // 插入链接
    const insertLink = () => {
      const url = prompt('请输入链接地址');
      if (url) {
        emit('command', 'setLink', { href: url });
      }
    };
    
    // 插入图片
    const insertImage = () => {
      const src = prompt('请输入图片URL');
      if (src) {
        emit('command', 'setImage', { src });
      }
    };
    
    return {
      execute,
      insertLink,
      insertImage
    };
  }
};
</script>

<style scoped>
.editor-toolbar {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 16px;
  padding-bottom: 8px;
  border-bottom: 1px solid #e9ecef;
}

.editor-toolbar button {
  padding: 6px 10px;
  border: 1px solid #e9ecef;
  border-radius: 4px;
  background-color: white;
  cursor: pointer;
  transition: background-color 0.2s;
}

.editor-toolbar button:hover {
  background-color: #f8f9fa;
}
</style>