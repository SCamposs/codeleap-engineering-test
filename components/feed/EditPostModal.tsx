"use client";

import { useEffect, useState } from "react";
import { useUpdatePost } from "@/hooks/usePosts";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import type { Post } from "@/types/post";

interface EditPostModalProps {
  post: Post;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function EditPostModal({ post, open, onOpenChange }: EditPostModalProps) {
  const [title, setTitle] = useState(post.title);
  const [content, setContent] = useState(post.content);
  const { mutate: updatePost, isPending } = useUpdatePost();

  useEffect(() => {
    if (open) {
      setTitle(post.title);
      setContent(post.content);
    }
  }, [open, post.title, post.content]);

  const handleSave = () => {
    if (!title.trim() || !content.trim()) return;
    updatePost(
      { id: post.id, payload: { title: title.trim(), content: content.trim() } },
      { onSuccess: () => onOpenChange(false) },
    );
  };

  const canSave =
    title.trim().length > 0 && content.trim().length > 0 && !isPending;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="gap-0 overflow-hidden p-0 sm:max-w-lg"
      >
        <div className="bg-[#7695EC] px-6 py-5">
          <DialogTitle className="text-lg font-bold text-white">
            Edit item
          </DialogTitle>
        </div>
        <div className="flex flex-col gap-4 px-6 py-6">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="edit-title">Title</Label>
            <Input
              id="edit-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="edit-content">Content</Label>
            <Textarea
              id="edit-content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="min-h-24"
            />
          </div>
          <div className="flex justify-end gap-3">
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isPending}
            >
              Cancel
            </Button>
            <Button onClick={handleSave} disabled={!canSave}>
              SAVE
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
