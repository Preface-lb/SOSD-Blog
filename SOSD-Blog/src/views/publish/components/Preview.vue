<template>
  <div class="preview-content" v-html="content"></div>
</template>

<script>
export default {
  name: 'Preview',
  props: {
    content: {
      type: String,
      default: ''
    }
  }
};
</script>

<style scoped>
.preview-content {
  line-height: 1.8;
}

.preview-content h1,
.preview-content h2,
.preview-content h3 {
  margin-top: 24px;
  margin-bottom: 16px;
  font-weight: 600;
  line-height: 1.25;
}

.preview-content p {
  margin-bottom: 16px;
}

.preview-content ul,
.preview-content ol {
  margin-bottom: 16px;
  padding-left: 2em;
}

.preview-content img {
  max-width: 100%;
  height: auto;
  margin: 16px 0;
  border-radius: 4px;
}

.preview-content a {
  color: #165DFF;
  text-decoration: none;
}

.preview-content a:hover {
  text-decoration: underline;
}
</style>