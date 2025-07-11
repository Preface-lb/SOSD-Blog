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
            />
            <button @click="copyLink" class="copy-btn">
              <i class="fas fa-copy"></i>
              复制
            </button>
          </div>
        </div>
        
        <!-- 权限设置 -->
        <div class="permission-section">
          <label>权限设置</label>
          <div class="permission-options">
            <label class="permission-option">
              <input 
                type="radio" 
                v-model="permission" 
                value="readonly"
              />
              <span>只读</span>
              <small>其他人只能查看文档</small>
            </label>
            <label class="permission-option">
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
        
        <!-- 高级设置 -->
        <div class="advanced-settings">
          <label>
            <input type="checkbox" v-model="requirePassword" />
            需要密码访问
          </label>
          <input 
            v-if="requirePassword"
            v-model="password"
            type="password"
            placeholder="设置访问密码"
            class="password-input"
          />
        </div>
        
        <!-- 分享按钮 -->
        <div class="dialog-footer">
          <button @click="generateShareLink" class="primary-btn">
            生成分享链接
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

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

const generateShareLink = () => {
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
}

const copyLink = () => {
  navigator.clipboard.writeText(shareLink.value)
    .then(() => {
      alert('链接已复制到剪贴板')
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