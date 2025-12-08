const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export interface Article {
  id: number;
  title: string;
  content: string;
  excerpt: string;
  author: string;
  created_at: string;
  updated_at: string;
}

export interface ArticleListItem {
  id: number;
  title: string;
  excerpt: string;
  author: string;
  created_at: string;
}

export const articleApi = {
  getAllArticles: async (): Promise<ArticleListItem[]> => {
    const response = await fetch(`${API_URL}/api/articles`);
    if (!response.ok) {
      throw new Error('Failed to fetch articles');
    }
    return response.json();
  },

  getArticle: async (id: string): Promise<Article> => {
    const response = await fetch(`${API_URL}/api/articles/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch article');
    }
    return response.json();
  },

  generateArticle: async (): Promise<Article> => {
    const response = await fetch(`${API_URL}/api/articles/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error('Failed to generate article');
    }
    return response.json();
  },

  deleteArticle: async (id: number): Promise<void> => {
    const response = await fetch(`${API_URL}/api/articles/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete article');
    }
  },
};
