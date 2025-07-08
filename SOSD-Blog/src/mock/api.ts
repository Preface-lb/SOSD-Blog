// src/mock/api.ts
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { mockDocuments } from './data';
import type { DocumentType } from './data'; // 使用 import type 单独导入类型

// 创建axios实例
const api = axios.create({
  baseURL: '/api',
});

// 创建mock适配器
const mock = new MockAdapter(api, { delayResponse: 300 }); // 添加300ms延迟模拟网络请求

// 模拟获取所有文档
mock.onGet('/documents').reply(200, {
  documents: mockDocuments
});

// 模拟获取单个文档
mock.onGet(/\/documents\/\w+/).reply((config) => {
  const id = config.url?.split('/').pop();
  const document = mockDocuments.find(doc => doc.id === id);
  return document ? [200, document] : [404, { message: '文档不存在' }];
});

// 模拟创建文档
mock.onPost('/documents').reply((config) => {
  const newDoc = JSON.parse(config.data) as Omit<DocumentType, 'id'>;
  const createdDoc = {
    ...newDoc,
    id: Math.random().toString(36).substring(2, 10),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  mockDocuments.unshift(createdDoc);
  return [201, createdDoc];
});

// 模拟更新文档
mock.onPut(/\/documents\/\w+/).reply((config) => {
  const id = config.url?.split('/').pop();
  const updatedData = JSON.parse(config.data);
  const index = mockDocuments.findIndex(doc => doc.id === id);
  
  if (index !== -1) {
    mockDocuments[index] = {
      ...mockDocuments[index],
      ...updatedData,
      updatedAt: new Date().toISOString()
    };
    return [200, mockDocuments[index]];
  }
  
  return [404, { message: '文档不存在' }];
});

// 模拟删除文档
mock.onDelete(/\/documents\/\w+/).reply((config) => {
  const id = config.url?.split('/').pop();
  const index = mockDocuments.findIndex(doc => doc.id === id);
  
  if (index !== -1) {
    mockDocuments.splice(index, 1);
    return [200, { message: '删除成功' }];
  }
  
  return [404, { message: '文档不存在' }];
});

export default api;