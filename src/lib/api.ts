// src/lib/api.ts
import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000',
});

export const fetchPosts = () => API.get('/posts');

export const createPost = (formData: FormData) =>
  API.post('/posts', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

export const addComment = (postId: string, text: string, username: string) =>
  API.post(`/posts/${postId}/comment`, { text, username });

export const deletePost = (id: string) => API.delete(`/posts/${id}`);

export const deleteComment = (postId: string, index: number) =>
  API.delete(`/posts/${postId}/comment/${index}`);

export const fetchKnowledge = (category?: string) =>
  API.get('/api/knowledge', {
    params: category ? { category } : {},
  });

export const addKnowledge = (data: {
  title: string;
  category: string;
  content: string;
  author?: string;
}) => API.post('/api/knowledge', data);

export const likeKnowledge = (id: string) =>
  API.patch(`/api/knowledge/${id}/like`);

export const deleteKnowledge = (id: string) =>
  API.delete(`/api/knowledge/${id}`);