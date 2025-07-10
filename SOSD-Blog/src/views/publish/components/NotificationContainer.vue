<template>
  <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.1.0/css/all.css" integrity="sha384-lKuwvrZot6UHsBSfcMvOkWwlCMgc0TaWr+30HWe3a4ltaBwTZhyTEggF5tJv8tbt" crossorigin="anonymous">
  <div class="notification-container">
    <TransitionGroup name="notification" tag="div">
      <div
        v-for="notification in notifications"
        :key="notification.id"
        class="notification"
        :class="notification.type"
        @click="removeNotification(notification.id)"
      >
        <div class="notification-icon">
          <i :class="getIcon(notification.type)"></i>
        </div>
        <div class="notification-content">
          <div class="notification-message">
            {{ notification.message }}
          </div>
          <div v-if="notification.description" class="notification-description">
            {{ notification.description }}
          </div>
        </div>
        <button @click.stop="removeNotification(notification.id)" class="notification-close">
          <i class="fa fa-times"></i>
        </button>
        <div 
          v-if="notification.duration > 0"
          class="notification-progress"
          :style="{ animationDuration: notification.duration + 'ms' }"
        ></div>
      </div>
    </TransitionGroup>
  </div>
</template>

<script setup>
const props = defineProps({
  notifications: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(['remove'])

const getIcon = (type) => {
  switch (type) {
    case 'success':
      return 'fa fa-check-circle'
    case 'error':
      return 'fa fa-exclamation-circle'
    case 'warning':
      return 'fa fa-exclamation-triangle'
    case 'info':
    default:
      return 'fa fa-info-circle'
  }
}

const removeNotification = (id) => {
  emit('remove', id)
}
</script>

<style scoped>
.notification-container {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 10001;
  display: flex;
  flex-direction: column;
  gap: 12px;
  max-width: 400px;
  width: 100%;
}

.notification {
  position: relative;
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 16px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  border-left: 4px solid;
  cursor: pointer;
  transition: all 0.2s ease;
  overflow: hidden;
}

.notification:hover {
  transform: translateX(-4px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
}

.notification.success {
  border-left-color: #28a745;
}

.notification.error {
  border-left-color: #dc3545;
}

.notification.warning {
  border-left-color: #ffc107;
}

.notification.info {
  border-left-color: #17a2b8;
}

.notification-icon {
  flex-shrink: 0;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 2px;
}

.notification.success .notification-icon {
  color: #28a745;
}

.notification.error .notification-icon {
  color: #dc3545;
}

.notification.warning .notification-icon {
  color: #ffc107;
}

.notification.info .notification-icon {
  color: #17a2b8;
}

.notification-content {
  flex: 1;
  min-width: 0;
}

.notification-message {
  font-size: 14px;
  font-weight: 500;
  color: #1a1a1a;
  line-height: 1.4;
  margin-bottom: 4px;
}

.notification-description {
  font-size: 13px;
  color: #6c757d;
  line-height: 1.4;
}

.notification-close {
  flex-shrink: 0;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  color: #6c757d;
  cursor: pointer;
  border-radius: 4px;
  transition: all 0.2s ease;
}

.notification-close:hover {
  background: #f8f9fa;
  color: #495057;
}

.notification-progress {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 2px;
  background: currentColor;
  opacity: 0.3;
  animation: progress linear;
  transform-origin: left;
}

.notification.success .notification-progress {
  background: #28a745;
}

.notification.error .notification-progress {
  background: #dc3545;
}

.notification.warning .notification-progress {
  background: #ffc107;
}

.notification.info .notification-progress {
  background: #17a2b8;
}

@keyframes progress {
  from {
    transform: scaleX(1);
  }
  to {
    transform: scaleX(0);
  }
}

/* 过渡动画 */
.notification-enter-active {
  transition: all 0.3s ease;
}

.notification-leave-active {
  transition: all 0.3s ease;
}

.notification-enter-from {
  opacity: 0;
  transform: translateX(100%);
}

.notification-leave-to {
  opacity: 0;
  transform: translateX(100%);
}

.notification-move {
  transition: transform 0.3s ease;
}

/* 移动端适配 */
@media (max-width: 768px) {
  .notification-container {
    top: 10px;
    right: 10px;
    left: 10px;
    max-width: none;
  }
  
  .notification {
    padding: 12px;
  }
  
  .notification-message {
    font-size: 13px;
  }
  
  .notification-description {
    font-size: 12px;
  }
}
</style>