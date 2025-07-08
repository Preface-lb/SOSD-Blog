// src/mock/data.ts
export interface DocumentType {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  wordCount?: number;
}

// 生成随机ID
const generateId = () => Math.random().toString(36).substring(2, 10);

// 生成时间戳
const formatDate = (date: Date) => date.toISOString();

// 模拟文档数据
export const mockDocuments: DocumentType[] = [
  {
    id: generateId(),
    title: "Vue 3 入门指南",
    content: "<p>Vue 3是一个用于构建用户界面的渐进式JavaScript框架...</p>",
    createdAt: formatDate(new Date()),
    updatedAt: formatDate(new Date()),
    wordCount: 1200
  },
  {
    id: generateId(),
    title: "TypeScript基础教程",
    content: "<h2>1. 类型注解</h2><p>TypeScript通过类型注解提供静态类型检查...</p>",
    createdAt: formatDate(new Date(Date.now() - 24 * 60 * 60 * 1000)), // 昨天
    updatedAt: formatDate(new Date(Date.now() - 12 * 60 * 60 * 1000)), // 12小时前
    wordCount: 1850
  },
  {
    id: generateId(),
    title: "前端工程化实践",
    content: "<p>前端工程化是将软件开发的工程方法应用于前端开发的过程...</p>",
    createdAt: formatDate(new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)), // 一周前
    updatedAt: formatDate(new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)),
    wordCount: 3200
  }
];