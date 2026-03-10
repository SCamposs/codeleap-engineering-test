"use client";

import { useState } from "react";
import { useCreatePost } from "@/hooks/use-posts";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface CreatePostFormProps {
  username: string;
}

export function CreatePostForm({ username }: CreatePostFormProps) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const { mutate: createPost, isPending } = useCreatePost();

  const handleSubmit = () => {
    if (!title.trim() || !content.trim()) return;
    createPost(
      { username, title: title.trim(), content: content.trim() },
      {
        onSuccess: () => {
          setTitle("");
          setContent("");
        },
      }
    );
  };

  const canSubmit =
    title.trim().length > 0 && content.trim().length > 0 && !isPending;

  return (
    <div className="overflow-hidden rounded-2xl border border-[#CCCCCC] bg-white shadow-sm">
      <div className="bg-[#7695EC] px-6 py-5">
        <h2 className="text-lg font-bold text-white">What&apos;s on your mind?</h2>
      </div>
      <div className="flex flex-col gap-4 px-6 py-6">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="post-title">Title</Label>
          <Input
            id="post-title"
            placeholder="Hello world"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="post-content">Content</Label>
          <Textarea
            id="post-content"
            placeholder="Content here"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="min-h-24"
          />
        </div>
        <div className="flex justify-end">
          <Button onClick={handleSubmit} disabled={!canSubmit}>
            CREATE
          </Button>
        </div>
      </div>
    </div>
  );
}
