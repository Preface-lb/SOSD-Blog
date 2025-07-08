// src/publish/services/documentService.ts
import axios from 'axios';
import type { AxiosResponse } from 'axios'; 
import api from '../../../mock/api';
import type { DocumentType } from '../../../mock/data';

// 定义文档数据类型
export interface DocumentType {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  wordCount?: number;
}

// 获取所有文档
export const fetchDocuments = async (): Promise<DocumentType[]> => {
  const response: AxiosResponse<{ documents: DocumentType[] }> = await api.get('/documents');
  return response.data.documents || [];
};

// 获取单个文档
export const fetchDocument = async (id: string): Promise<DocumentType> => {
  const response: AxiosResponse<DocumentType> = await api.get(`/documents/${id}`);
  return response.data;
};

// 创建新文档
export const createDocument = async (document: Omit<DocumentType, 'id'>): Promise<DocumentType> => {
  const response: AxiosResponse<DocumentType> = await api.post('/documents', document);
  return response.data;
};

// 更新文档
export const updateDocument = async (id: string, document: Partial<DocumentType>): Promise<DocumentType> => {
  const response: AxiosResponse<DocumentType> = await api.put(`/documents/${id}`, document);
  return response.data;
};

// 删除文档
export const deleteDocument = async (id: string): Promise<void> => {
  await api.delete(`/documents/${id}`);
};