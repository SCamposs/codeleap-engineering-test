"use client";

import { useState } from "react";
import { formatDistanceToNow } from "@/lib/format-date";
import { Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EditPostModal } from "@/components/edit-post-modal";
import { DeleteConfirmModal } from "@/components/delete-confirm-modal";
import type { Post } from "@/types/post";

interface PostCardProps {
  post: Post;
  currentUsername: string;
}

export function PostCard({ post, currentUsername }: PostCardProps) {
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const isOwner = post.username === currentUsername;

  return (
    <div className="overflow-hidden rounded-2xl border border-[#CCCCCC] bg-white">
      <div className="flex items-center justify-between bg-[#7695EC] px-6 py-5">
        <h3 className="text-lg font-bold text-white">{post.title}</h3>
        {isOwner && (
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={() => setDeleteOpen(true)}
              className="text-white hover:bg-white/20 hover:text-white"
            >
              <Trash2 className="size-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={() => setEditOpen(true)}
              className="text-white hover:bg-white/20 hover:text-white"
            >
              <Pencil className="size-4" />
            </Button>
          </div>
        )}
      </div>
      <div className="px-6 py-5">
        <div className="mb-3 flex items-center justify-between text-sm text-muted-foreground">
          <span className="font-bold text-foreground">@{post.username}</span>
          <span>{formatDistanceToNow(post.created_datetime)}</span>
        </div>
        <p className="text-sm leading-relaxed">{post.content}</p>
      </div>

      <EditPostModal
        post={post}
        open={editOpen}
        onOpenChange={setEditOpen}
      />
      <DeleteConfirmModal
        postId={post.id}
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
      />
    </div>
  );
}
