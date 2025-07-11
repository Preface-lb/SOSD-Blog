<template>
  <div class="confirm-overlay" @click="handleOverlayClick">
    <div class="confirm-dialog" @click.stop>
      <div class="dialog-header" :class="type">
        <div class="header-icon">
          <i :class="getIcon()"></i>
        </div>
        <h3>{{ title }}</h3>
      </div>
      
      <div class="dialog-content">
        <p>{{ message }}</p>
      </div>
      
      <div class="dialog-actions">
        <button @click="handleCancel" class="cancel-btn">
          取消
        </button>
        <button @click="handleConfirm" class="confirm-btn" :class="type">
          确定
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  title: {
    type: String,
    default: '确认操作'
  },
  message: {
    type: String,
    required: true
  },
  type: {
    type: String,
    default: 'info', // info, warning, danger, success
    validator: (value) => ['info', 'warning', 'danger', 'success'].includes(value)
  },
  confirmText: {
    type: String,
    default: '确定'
  },
  cancelText: {
    type: String,
    default: '取消'
  }
})

const emit = defineEmits(['confirm', 'cancel'])

const getIcon = () => {
  switch (props.type) {
    case 'warning':
      return 'fas fa-exclamation-triangle'
    case 'danger':
      return 'fas fa-exclamation-circle'
    case 'success':
      return 'fas fa-check-circle'
    default:
      return 'fas fa-info-circle'
  }
}

const handleConfirm = () => {
  emit('confirm')
}

const handleCancel = () => {
  emit('cancel')
}

const handleOverlayClick = () => {
  emit('cancel')
}
</script>

<style scoped>
.confirm-overlay {
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
  animation: fadeIn 0.2s ease;
}

.confirm-dialog {
  background: white;
  border-radius: 12px;
  width: 90%;
  max-width: 400px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
  animation: slideIn 0.3s ease;
}

.dialog-header {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 24px 24px 16px;
}

.header-icon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
}

.dialog-header.info .header-icon {
  background: #e3f2fd;
  color: #1976d2;
}

.dialog-header.warning .header-icon {
  background: #fff3e0;
  color: #f57c00;
}

.dialog-header.danger .header-icon {
  background: #ffebee;
  color: #d32f2f;
}

.dialog-header.success .header-icon {
  background: #e8f5e8;
  color: #388e3c;
}

.dialog-header h3 {
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  color: #1a1a1a;
}

.dialog-content {
  padding: 0 24px 24px;
}

.dialog-content p {
  margin: 0;
  font-size: 14px;
  line-height: 1.6;
  color: #6c757d;
}

.dialog-actions {
  display: flex;
  gap: 12px;
  padding: 0 24px 24px;
  justify-content: flex-end;
}

.cancel-btn, .confirm-btn {
  padding: 8px 20px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  border: 1px solid transparent;
}

.cancel-btn {
  background: #f8f9fa;
  color: #6c757d;
  border-color: #e9ecef;
}

.cancel-btn:hover {
  background: #e9ecef;
  color: #495057;
}

.confirm-btn {
  color: white;
}

.confirm-btn.info {
  background: #1976d2;
}

.confirm-btn.info:hover {
  background: #1565c0;
}

.confirm-btn.warning {
  background: #f57c00;
}

.confirm-btn.warning:hover {
  background: #ef6c00;
}

.confirm-btn.danger {
  background: #d32f2f;
}

.confirm-btn.danger:hover {
  background: #c62828;
}

.confirm-btn.success {
  background: #388e3c;
}

.confirm-btn.success:hover {
  background: #2e7d32;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(-20px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@media (max-width: 480px) {
  .confirm-dialog {
    width: 95%;
    margin: 20px;
  }
  
  .dialog-header {
    padding: 20px 20px 12px;
  }
  
  .dialog-content {
    padding: 0 20px 20px;
  }
  
  .dialog-actions {
    padding: 0 20px 20px;
    flex-direction: column-reverse;
  }
  
  .cancel-btn, .confirm-btn {
    width: 100%;
    padding: 12px;
  }
}
</style>