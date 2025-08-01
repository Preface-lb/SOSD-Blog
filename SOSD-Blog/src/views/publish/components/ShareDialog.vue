<template>
  <div class="share-dialog-overlay" @click="$emit('close')">
    <div class="share-dialog" @click.stop>
      <div class="dialog-header">
        <h3>分享文档</h3>
        <button @click="$emit('close')" class="close-btn">
          <i class="fas fa-times"></i>
        </button>
      </div>
      
      <div class="dialog-content">
        <!-- 分享链接生成 -->
        <div class="share-link-section">
          <label>分享链接</label>
          <div class="link-input-group">
            <input 
              :value="shareLink" 
              readonly 
              ref="linkInput"
              @click="selectLink"
              :class="{ 'has-content': shareLink }"
            />
            <button @click="copyLink" class="copy-btn" :disabled="!shareLink">
              <i class="fas fa-copy"></i>
              复制
            </button>
          </div>
          <p class="link-hint" v-if="shareLink">链接已生成，可直接分享给他人</p>
        </div>
        
        <!-- 权限设置 -->
        <div class="permission-section">
          <label>权限设置</label>
          <div class="permission-options">
            <label class="permission-option" :class="{ active: permission === 'readonly' }">
              <input 
                type="radio" 
                v-model="permission" 
                value="readonly"
              />
              <span>只读</span>
              <small>其他人只能查看文档</small>
            </label>
            <label class="permission-option" :class="{ active: permission === 'editable' }">
              <input 
                type="radio" 
                v-model="permission" 
                value="editable"
              />
              <span>可编辑</span>
              <small>其他人可以编辑文档</small>
            </label>
          </div>
        </div>
        
        <!-- 高级设置
        <div class="advanced-settings">
          <label class="toggle-checkbox">
            <input type="checkbox" v-model="requirePassword" />
            <span class="toggle-slider"></span>
            <span class="toggle-text">需要密码访问</span>
          </label>
          <input 
            v-if="requirePassword"
            v-model="password"
            type="password"
            placeholder="设置访问密码"
            class="password-input"
            @keyup.enter="generateShareLink"
          />
        </div> -->
        
        <!-- 分享按钮 -->
        <div class="dialog-footer">
          <button 
            @click="generateShareLink" 
            class="primary-btn"
            :class="{ generating: isGenerating }"
            :disabled="isGenerating"
          >
            <i class="fas fa-spinner fa-spin" v-if="isGenerating"></i>
            <span v-else>生成分享链接</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  document: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['close'])

const shareLink = ref('')
const permission = ref('readonly')
const requirePassword = ref(false)
const password = ref('')
const isGenerating = ref(false)

const generateShareLink = () => {
  // 模拟加载状态
  isGenerating.value = true
  
  // 模拟API请求延迟
  setTimeout(() => {
    // 生成唯一的分享链接
    const token = Math.random().toString(36).substring(2, 15)
    shareLink.value = `${window.location.origin}/share/${props.document.id}?token=${token}`
    
    // 这里可以调用 API 保存分享设置
    console.log('分享设置:', {
      documentId: props.document.id,
      permission: permission.value,
      requirePassword: requirePassword.value,
      password: password.value
    })
    
    isGenerating.value = false
  }, 800)
}

const copyLink = () => {
  if (!shareLink.value) return
  
  navigator.clipboard.writeText(shareLink.value)
    .then(() => {
      // 显示复制成功动画反馈
      const copyBtn = document.querySelector('.copy-btn')
      const originalText = copyBtn.innerHTML
      copyBtn.innerHTML = '<i class="fas fa-check"></i> 已复制'
      copyBtn.classList.add('copied')
      
      setTimeout(() => {
        copyBtn.innerHTML = originalText
        copyBtn.classList.remove('copied')
      }, 2000)
    })
    .catch(err => {
      console.error('复制失败:', err)
    })
}

const selectLink = () => {
  // 自动选中链接文本
  const input = document.querySelector('.link-input-group input')
  if (input) {
    input.select()
  }
}
</script>

<style scoped>
/* 基础样式 */
.share-dialog-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  backdrop-filter: blur(3px);
  animation: fadeIn 0.3s ease;
}

.share-dialog {
  background-color: #fff;
  border-radius: 12px;
  width: 100%;
  max-width: 550px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  overflow: hidden;
  transform: translateY(0);
  animation: slideUp 0.3s ease;
}

/* 头部样式 */
.dialog-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 18px 24px;
  background-color: #f8fafc;
  border-bottom: 1px solid #e2e8f0;
}

.dialog-header h3 {
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  color: #1e293b;
}

.close-btn {
  background: none;
  border: none;
  color: #64748b;
  cursor: pointer;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

.close-btn:hover {
  background-color: #e2e8f0;
  color: #0f172a;
}

/* 内容区域样式 */
.dialog-content {
  padding: 24px;
}

.dialog-content > div {
  margin-bottom: 24px;
}

.dialog-content label {
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  color: #334155;
}

/* 链接区域样式 */
.link-input-group {
  display: flex;
  gap: 8px;
}

.link-input-group input {
  flex: 1;
  padding: 12px 16px;
  border: 1px solid #cbd5e1;
  border-radius: 6px;
  font-size: 14px;
  color: #334155;
  transition: all 0.2s ease;
  background-color: #f8fafc;
}

.link-input-group input:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.link-input-group input.has-content {
  background-color: #fff;
  border-color: #94a3b8;
}

.copy-btn {
  padding: 0 16px;
  background-color: #3b82f6;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 6px;
}

.copy-btn:disabled {
  background-color: #94a3b8;
  cursor: not-allowed;
  opacity: 0.7;
}

.copy-btn:hover:not(:disabled) {
  background-color: #2563eb;
}

.copy-btn.copied {
  background-color: #10b981;
}

.link-hint {
  margin: 8px 0 0 0;
  font-size: 13px;
  color: #10b981;
  display: flex;
  align-items: center;
  gap: 4px;
}

/* 权限设置样式 */
.permission-options {
  display: flex;
  gap: 16px;
  margin-top: 8px;
}

.permission-option {
  flex: 1;
  border: 1px solid #cbd5e1;
  border-radius: 8px;
  padding: 16px;
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
  overflow: hidden;
}

.permission-option:hover {
  border-color: #94a3b8;
  background-color: #f8fafc;
}

.permission-option.active {
  border-color: #3b82f6;
  background-color: #eff6ff;
}

.permission-option.active::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 4px;
  height: 100%;
  background-color: #3b82f6;
}

.permission-option input {
  margin-right: 8px;
}

.permission-option span {
  font-weight: 500;
  display: inline-block;
  margin-bottom: 4px;
  color: #1e293b;
}

.permission-option small {
  display: block;
  font-size: 12px;
  color: #64748b;
  margin-top: 4px;
}

/* 高级设置样式 */
.advanced-settings {
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px dashed #e2e8f0;
}

.toggle-checkbox {
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  margin-bottom: 12px;
}

.toggle-slider {
  position: relative;
  width: 40px;
  height: 20px;
  background-color: #cbd5e1;
  border-radius: 10px;
  transition: all 0.2s ease;
}

.toggle-checkbox input:checked + .toggle-slider {
  background-color: #3b82f6;
}

.toggle-slider::after {
  content: '';
  position: absolute;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  top: 2px;
  left: 2px;
  background-color: white;
  transition: all 0.2s ease;
}

.toggle-checkbox input:checked + .toggle-slider::after {
  left: 22px;
}

.toggle-text {
  color: #334155;
  font-weight: 400;
}

.password-input {
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #cbd5e1;
  border-radius: 6px;
  font-size: 14px;
  margin-top: 8px;
  transition: all 0.2s ease;
  animation: fadeIn 0.3s ease;
}

.password-input:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

/* 底部按钮样式 */
.dialog-footer {
  margin-top: 32px;
  display: flex;
  justify-content: flex-end;
}

.primary-btn {
  padding: 12px 24px;
  background-color: #3b82f6;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 8px;
}

.primary-btn:hover:not(:disabled) {
  background-color: #2563eb;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.2);
}

.primary-btn:active:not(:disabled) {
  transform: translateY(0);
  box-shadow: 0 2px 8px rgba(59, 130, 246, 0.2);
}

.primary-btn:disabled {
  background-color: #94a3b8;
  cursor: not-allowed;
  opacity: 0.8;
}

/* 动画效果 */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideUp {
  from { 
    opacity: 0;
    transform: translateY(20px);
  }
  to { 
    opacity: 1;
    transform: translateY(0);
  }
}

/* 隐藏原生radio样式 */
.permission-option input[type="radio"],
.advanced-settings input[type="checkbox"] {
  appearance: none;
  -webkit-appearance: none;
  width: 18px;
  height: 18px;
  border: 2px solid #94a3b8;
  border-radius: 50%;
  position: relative;
  vertical-align: middle;
}

.permission-option input[type="radio"]:checked,
.advanced-settings input[type="checkbox"]:checked {
  border-color: #3b82f6;
}

.permission-option input[type="radio"]:checked::after {
  content: '';
  position: absolute;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: #3b82f6;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.advanced-settings input[type="checkbox"] {
  border-radius: 4px;
}

.advanced-settings input[type="checkbox"]:checked::after {
  content: '✓';
  position: absolute;
  color: #3b82f6;
  font-size: 14px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-weight: bold;
}
</style>