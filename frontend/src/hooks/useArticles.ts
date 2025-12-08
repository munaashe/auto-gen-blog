import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { articleApi } from '../api/articles';

export const useArticles = () => {
  return useQuery({
    queryKey: ['articles'],
    queryFn: articleApi.getAllArticles,
  });
};

export const useArticle = (id: string) => {
  return useQuery({
    queryKey: ['article', id],
    queryFn: () => articleApi.getArticle(id),
    enabled: !!id,
  });
};

export const useGenerateArticle = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: articleApi.generateArticle,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['articles'] });
    },
  });
};

export const useDeleteArticle = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: articleApi.deleteArticle,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['articles'] });
    },
  });
};
