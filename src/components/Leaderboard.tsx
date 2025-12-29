"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function Leaderboard() {
  const [scores, setScores] = useState<any[]>([]);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      // Pulling from the profiles table we created in Supabase
      const { data, error } = await supabase
        .from('profiles')
        .select('id, points')
        .order('points', { ascending: false })
        .limit(5);
      
      if (error) {
        console.error("Leaderboard error:", error);
      } else if (data) {
        setScores(data);
      }
    };
    fetchLeaderboard();
  }, []);

  return (
    <div className="mt-8 border-t border-zinc-800 pt-4 w-full">
      <h2 className="text-xl font-bold mb-4 text-purple-400">🏆 Top Anons</h2>
      {scores.length === 0 ? (
        <p className="text-zinc-600 italic text-sm text-center">No scores yet. Start posting!</p>
      ) : (
        scores.map((s, i) => (
          <div key={s.id} className="flex justify-between p-2 bg-zinc-800/30 rounded mb-2 border border-zinc-700/30">
            <span className="text-zinc-400 text-xs font-mono">
              {i + 1}. {s.id.substring(0, 8)}...
            </span>
            <span className="font-bold text-white text-sm">{s.points} pts</span>
          </div>
        ))
      )}
    </div>
  );
}