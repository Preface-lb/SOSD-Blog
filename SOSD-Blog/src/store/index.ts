import { createStore } from 'vuex';

export default createStore({
  state: {
    documents: []  // 默认的文档列表
  },
  mutations: {
    setDocuments(state, docs) {
      state.documents = docs;
    }
  },
  actions: {
    fetchDocuments({ commit }) {
      // 模拟请求
      const docs = [
        { id: 1, title: 'Vue 指南', content: '这是 Vue 的使用指南' },
        { id: 2, title: 'Vuex 介绍', content: 'Vuex 是一个状态管理库' }
      ];
      commit('setDocuments', docs);
    }
  }
});
