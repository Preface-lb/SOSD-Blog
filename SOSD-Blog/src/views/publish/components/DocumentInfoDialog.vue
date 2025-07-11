<template>
  <div class="info-overlay" @click="closeDialog">
    <div class="info-dialog" @click.stop>
      <div class="dialog-header">
        <h3>文档信息</h3>
        <button @click="closeDialog" class="close-btn">
          <i class="fas fa-times"></i>
        </button>
      </div>
      
      <div class="dialog-content">
        <form @submit.prevent="handleSubmit">
          <div class="form-section">
            <h4>基本信息</h4>
            <div class="form-group">
              <label for="title">标题</label>
              <input
                id="title"
                v-model="formData.title"
                type="text"
                class="form-input"
                placeholder="输入文档标题"
                required
              />
            </div>
            
            <div class="form-group">
              <label for="description">描述</label>
              <textarea
                id="description"
                v-model="formData.description"
                class="form-textarea"
                placeholder="输入文档描述（可选）"
                rows="3"
              ></textarea>
            </div>
            
            <div class="form-row">
              <div class="form-group">
                <label for="status">状态</label>
                <select id="status" v-model="formData.status" class="form-select">
                  <option value="draft">草稿</option>
                  <option value="published">已发布</option>
                  <option value="archived">已归档</option>
                </select>
              </div>
              
              <div class="form-group">
                <label for="category">分类</label>
                <select id="category" v-model="formData.category" class="form-select">
                  <option value="">选择分类</option>
                  <option value="work">工作</option>
                  <option value="personal">个人</option>
                  <option value="project">项目</option>
                  <option value="meeting">会议</option>
                  <option value="other">其他</option>
                </select>
              </div>
            </div>
          </div>
          
          <div class="form-section">
            <h4>标签</h4>
            <div class="tags-input-container">
              <div class="tags-display">
                <span
                  v-for="(tag, index) in formData.tags"
                  :key="index"
                  class="tag"
                >
                  {{ tag }}
                  <button
                    type="button"
                    @click="removeTag(index)"
                    class="tag-remove"
                  >
                    <i class="fas fa-times"></i>
                  </button>
                </span>
              </div>
              <div class="tag-input-wrapper">
                <input
                  v-model="newTag"
                  @keydown.enter.prevent="addTag"
                  @keydown.comma.prevent="addTag"
                  type="text"
                  class="tag-input"
                  placeholder="输入标签后按回车添加"
                />
                <button type="button" @click="addTag" class="add-tag-btn">
                  <i class="fas fa-plus"></i>
                </button>
              </div>
            </div>
          </div>
          
          <div class="form-section">
            <h4>统计信息</h4>
            <div class="stats-grid">
              <div class="stat-item">
                <div class="stat-label">创建时间</div>
                <div class="stat-value">{{ formatDate(document.createdAt) }}</div>
              </div>
              <div class="stat-item">
                <div class="stat-label">最后修改</div>
                <div class="stat-value">{{ formatDate(document.updatedAt) }}</div>
              </div>
              <div class="stat-item">
                <div class="stat-label">字数统计</div>
                <div class="stat-value">{{ document.wordCount || 0 }} 字</div>
              </div>
              <div class="stat-item">
                <div class="stat-label">阅读时间</div>
                <div class="stat-value">{{ getReadingTime() }} 分钟</div>
              </div>
            </div>
          </div>
          
          <div class="form-section">
            <h4>高级设置</h4>
            <div class="form-group">
              <label class="checkbox-label">
                <input
                  type="checkbox"
                  v-model="formData.isFavorite"
                  class="checkbox-input"
                />
                <span class="checkbox-text">收藏此文档</span>
              </label>
            </div>
            
            <div class="form-group">
              <label class="checkbox-label">
                <input
                  type="checkbox"
                  v-model="formData.isPublic"
                  class="checkbox-input"
                />
                <span class="checkbox-text">公开文档（允许他人查看）</span>
              </label>
            </div>
            
            <div class="form-group">
              <label class="checkbox-label">
                <input
                  type="checkbox"
                  v-model="formData.allowComments"
                  class="checkbox-input"
                />
                <span class="checkbox-text">允许评论</span>
              </label>
            </div>
          </div>
        </form>
      </div>
      
      <div class="dialog-actions">
        <button @click="closeDialog" class="cancel-btn">
          取消
        </button>
        <button @click="handleSubmit" class="save-btn">
          保存更改
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'

const props = defineProps({
  document: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['close', 'update'])

const formData = reactive({
  title: '',
  description: '',
  status: 'draft',
  category: '',
  tags: [],
  isFavorite: false,
  isPublic: false,
  allowComments: false
})

const newTag = ref('')

onMounted(() => {
  // 初始化表单数据
  Object.assign(formData, {
    title: props.document.title || '',
    description: props.document.description || '',
    status: props.document.status || 'draft',
    category: props.document.category || '',
    tags: [...(props.document.tags || [])],
    isFavorite: props.document.isFavorite || false,
    isPublic: props.document.isPublic || false,
    allowComments: props.document.allowComments || false
  })
})

const closeDialog = () => {
  emit('close')
}

const handleSubmit = () => {
  // 验证必填字段
  if (!formData.title.trim()) {
    alert('请输入文档标题')
    return
  }
  
  // 提交更新
  emit('update', {
    ...formData,
    title: formData.title.trim(),
    description: formData.description.trim(),
    updatedAt: new Date().toISOString()
  })
  
  closeDialog()
}

const addTag = () => {
  const tag = newTag.value.trim()
  if (tag && !formData.tags.includes(tag)) {
    formData.tags.push(tag)
    newTag.value = ''
  }
}

const removeTag = (index) => {
  formData.tags.splice(index, 1)
}

const formatDate = (dateString) => {
  if (!dateString) return ''
  return new Date(dateString).toLocaleString('zh-CN')
}

const getReadingTime = () => {
  const wordCount = props.document.wordCount || 0
  return Math.ceil(wordCount / 200)
}
</script>

<style scoped>
.info-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10000;
  padding: 20px;
}

.info-dialog {
  background: white;
  border-radius: 12px;
  width: 100%;
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
}

.dialog-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px 24px 0;
  border-bottom: 1px solid #e9ecef;
  margin-bottom: 24px;
}

.dialog-header h3 {
  margin: 0;
  font-size: 20px;
  font-weight: 600;
  color: #1a1a1a;
}

.close-btn {
  padding: 8px;
  border: none;
  background: transparent;
  border-radius: 4px;
  cursor: pointer;
  color: #6c757d;
  transition: all 0.2s ease;
}

.close-btn:hover {
  background: #f8f9fa;
  color: #495057;
}

.dialog-content {
  padding: 0 24px 24px;
}

.form-section {
  margin-bottom: 32px;
}

.form-section:last-child {
  margin-bottom: 0;
}

.form-section h4 {
  margin: 0 0 16px 0;
  font-size: 16px;
  font-weight: 600;
  color: #495057;
  border-bottom: 1px solid #e9ecef;
  padding-bottom: 8px;
}

.form-group {
  margin-bottom: 16px;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.form-group label {
  display: block;
  margin-bottom: 6px;
  font-size: 14px;
  font-weight: 500;
  color: #495057;
}

.form-input,
.form-textarea,
.form-select {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #e9ecef;
  border-radius: 6px;
  font-size: 14px;
  transition: border-color 0.2s ease;
}

.form-input:focus,
.form-textarea:focus,
.form-select:focus {
  outline: none;
  border-color: #165DFF;
  box-shadow: 0 0 0 3px rgba(22, 93, 255, 0.1);
}

.form-textarea {
  resize: vertical;
  min-height: 80px;
}

.tags-input-container {
  border: 1px solid #e9ecef;
  border-radius: 6px;
  padding: 8px;
  min-height: 80px;
}

.tags-display {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-bottom: 8px;
}

.tag {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 4px 8px;
  background: #165DFF;
  color: white;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
}

.tag-remove {
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  padding: 0;
  width: 14px;
  height: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: background-color 0.2s ease;
}

.tag-remove:hover {
  background: rgba(255, 255, 255, 0.2);
}

.tag-input-wrapper {
  display: flex;
  gap: 8px;
}

.tag-input {
  flex: 1;
  padding: 6px 8px;
  border: 1px solid #e9ecef;
  border-radius: 4px;
  font-size: 14px;
}

.tag-input:focus {
  outline: none;
  border-color: #165DFF;
}

.add-tag-btn {
  padding: 6px 12px;
  background: #165DFF;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
  transition: background-color 0.2s ease;
}

.add-tag-btn:hover {
  background: #0E42CC;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 16px;
}

.stat-item {
  padding: 12px;
  background: #f8f9fa;
  border-radius: 6px;
  text-align: center;
}

.stat-label {
  font-size: 12px;
  color: #6c757d;
  margin-bottom: 4px;
}

.stat-value {
  font-size: 16px;
  font-weight: 600;
  color: #1a1a1a;
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  font-size: 14px;
  color: #495057;
}

.checkbox-input {
  width: 16px;
  height: 16px;
  accent-color: #165DFF;
}

.checkbox-text {
  user-select: none;
}

.dialog-actions {
  display: flex;
  gap: 12px;
  padding: 24px;
  border-top: 1px solid #e9ecef;
  justify-content: flex-end;
}

.cancel-btn,
.save-btn {
  padding: 10px 20px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.cancel-btn {
  background: #f8f9fa;
  color: #6c757d;
  border: 1px solid #e9ecef;
}

.cancel-btn:hover {
  background: #e9ecef;
  color: #495057;
}

.save-btn {
  background: #165DFF;
  color: white;
  border: none;
}

.save-btn:hover {
  background: #0E42CC;
}

@media (max-width: 768px) {
  .info-dialog {
    width: 95%;
    max-height: 95vh;
  }
  
  .dialog-header,
  .dialog-content,
  .dialog-actions {
    padding-left: 16px;
    padding-right: 16px;
  }
  
  .form-row {
    grid-template-columns: 1fr;
  }
  
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .dialog-actions {
    flex-direction: column-reverse;
  }
  
  .cancel-btn,
  .save-btn {
    width: 100%;
    padding: 12px;
  }
}
</style>