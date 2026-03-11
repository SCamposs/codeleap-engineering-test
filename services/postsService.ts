import type {
  Post,
  PostsResponse,
  CreatePostPayload,
  UpdatePostPayload,
} from "@/types/post";

const API_BASE = "https://dev.codeleap.co.uk/careers/";

export const postsService = {
  async getAll(): Promise<PostsResponse> {
    const res = await fetch(API_BASE);
    if (!res.ok) throw new Error("Failed to fetch posts");
    return res.json();
  },

  async create(payload: CreatePostPayload): Promise<Post> {
    const res = await fetch(API_BASE, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error("Failed to create post");
    return res.json();
  },

  async update(id: number, payload: UpdatePostPayload): Promise<Post> {
    const res = await fetch(`${API_BASE}${id}/`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error("Failed to update post");
    return res.json();
  },

  async delete(id: number): Promise<void> {
    const res = await fetch(`${API_BASE}${id}/`, {
      method: "DELETE",
    });
    if (!res.ok) throw new Error("Failed to delete post");
  },
};
