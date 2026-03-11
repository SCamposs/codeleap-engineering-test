"use client";

import { useState } from "react";
import { formatDistanceToNow } from "@/lib/formatDate";
import { Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EditPostModal } from "@/components/feed/EditPostModal";
import { DeleteConfirmModal } from "@/components/feed/DeleteConfirmModal";
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
    <article className="overflow-hidden rounded-2xl border border-[#CCCCCC] bg-white shadow-sm transition-shadow hover:shadow-md">
      <div className="flex items-center justify-between bg-[#7695EC] px-6 py-5">
        <h3 className="text-lg font-bold text-white">{post.title}</h3>
        {isOwner && (
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="icon-sm"
              aria-label="Delete post"
              onClick={() => setDeleteOpen(true)}
              className="text-white hover:bg-white/20 hover:text-white"
            >
              <Trash2 className="size-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon-sm"
              aria-label="Edit post"
              onClick={() => setEditOpen(true)}
              className="text-white hover:bg-white/20 hover:text-white"
            >
              <Pencil className="size-4" />
            </Button>
          </div>
        )}
      </div>
      <div className="px-6 py-5">
        <div className="mb-3 flex items-center justify-between gap-4 text-sm">
          <span className="font-bold">@{post.username}</span>
          <span className="text-muted-foreground">
            {formatDistanceToNow(post.created_datetime)}
          </span>
        </div>
        <p className="text-sm leading-relaxed text-foreground/80">
          {post.content}
        </p>
      </div>

      <EditPostModal post={post} open={editOpen} onOpenChange={setEditOpen} />
      <DeleteConfirmModal
        postId={post.id}
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
      />
    </article>
  );
}
