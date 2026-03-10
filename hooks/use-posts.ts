import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { postsService } from "@/services/posts-service";
import type { CreatePostPayload, UpdatePostPayload } from "@/types/post";

const POSTS_KEY = ["posts"] as const;

export function usePosts() {
  return useQuery({
    queryKey: POSTS_KEY,
    queryFn: postsService.getAll,
  });
}

export function useCreatePost() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreatePostPayload) => postsService.create(payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: POSTS_KEY }),
  });
}

export function useUpdatePost() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }: { id: number; payload: UpdatePostPayload }) =>
      postsService.update(id, payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: POSTS_KEY }),
  });
}

export function useDeletePost() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => postsService.delete(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: POSTS_KEY }),
  });
}
