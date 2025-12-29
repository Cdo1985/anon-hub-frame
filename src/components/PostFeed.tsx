"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function PostFeed({ category }: { category: string }) {
  const [posts, setPosts] = useState<any[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const { data, error } = await supabase
        .from("posts")
        .select("*")
        .eq("category", category) // Only show posts for THIS page
        .order("created_at", { ascending: false })
        .limit(10);

      if (data) setPosts(data);
    };

    fetchPosts();
  }, [category]);

  return (
    <div className="mt-8 space-y-4 w-full">
      <h3 className="text-zinc-500 text-xs font-bold uppercase tracking-widest">Recent Feed</h3>
      {posts.length === 0 ? (
        <p className="text-zinc-700 italic text-sm">Nothing posted here yet...</p>
      ) : (
        posts.map((post) => (
          <div key={post.id} className="p-4 bg-white/5 border border-white/10 rounded-xl">
            <p className="text-white text-sm leading-relaxed">{post.content}</p>
            <div className="mt-2 flex justify-between items-center">
              <span className="text-[10px] text-zinc-600 font-mono uppercase">Anon_{post.user_id.substring(0, 4)}</span>
              <span className="text-[10px] text-zinc-600">{new Date(post.created_at).toLocaleDateString()}</span>
            </div>
          </div>
        ))
      )}
    </div>
  );
}