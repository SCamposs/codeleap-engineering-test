"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { usePosts } from "@/hooks/usePosts";
import { CreatePostForm } from "@/components/feed/CreatePostForm";
import { PostCard } from "@/components/feed/PostCard";

export default function FeedPage() {
  const router = useRouter();
  const [username, setUsername] = useState<string | null>(null);
  const { data, isLoading, isError } = usePosts();

  useEffect(() => {
    const stored = sessionStorage.getItem("username");
    if (!stored) {
      router.replace("/signup");
    } else {
      setUsername(stored);
    }
  }, [router]);

  if (!username) return null;

  const posts = data?.results
    ? [...data.results].sort(
        (a, b) =>
          new Date(b.created_datetime).getTime() -
          new Date(a.created_datetime).getTime(),
      )
    : [];

  return (
    <div className="min-h-screen bg-[#DDDDDD]">
      <header className="sticky top-0 z-10 bg-[#7695EC] shadow-sm">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-6 py-4">
          <h1 className="text-xl font-bold text-white">CodeLeap Network</h1>
          <span className="text-sm font-medium text-white/80">@{username}</span>
        </div>
      </header>

      <main className="mx-auto flex max-w-3xl flex-col gap-6 px-4 py-6">
        <CreatePostForm username={username} />

        {isLoading && (
          <div className="flex justify-center py-12">
            <span className="text-sm text-muted-foreground">
              Loading posts...
            </span>
          </div>
        )}

        {isError && (
          <div className="rounded-lg bg-destructive/10 px-4 py-3 text-sm text-destructive">
            Failed to load posts. Please try again.
          </div>
        )}

        {!isLoading && !isError && posts.length === 0 && (
          <div className="flex justify-center py-12">
            <span className="text-sm text-muted-foreground">
              No posts yet. Be the first!
            </span>
          </div>
        )}

        {posts.map((post) => (
          <PostCard key={post.id} post={post} currentUsername={username} />
        ))}
      </main>
    </div>
  );
}
