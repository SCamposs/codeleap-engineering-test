"use client";

import { useDeletePost } from "@/hooks/usePosts";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

interface DeleteConfirmModalProps {
  postId: number;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function DeleteConfirmModal({
  postId,
  open,
  onOpenChange,
}: DeleteConfirmModalProps) {
  const { mutate: deletePost, isPending } = useDeletePost();

  const handleDelete = () => {
    deletePost(postId, {
      onSuccess: () => onOpenChange(false),
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="gap-0 overflow-hidden p-0 sm:max-w-sm"
      >
        <div className="bg-[#7695EC] px-6 py-5">
          <DialogTitle className="text-lg font-bold text-white">
            Delete Post
          </DialogTitle>
        </div>
        <div className="flex flex-col gap-6 px-6 py-6">
          <p className="text-sm text-muted-foreground">
            Are you sure you want to delete this item?
          </p>
          <div className="flex justify-end gap-3">
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isPending}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={isPending}
            >
              DELETE
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
