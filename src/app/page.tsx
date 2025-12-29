"use client";
import Link from "next/link";
import { MessageSquare, ShieldAlert, Flame } from "lucide-react";

const CATEGORIES = [
  { name: "Q&A", path: "/q-and-a", icon: <MessageSquare />, color: "bg-purple-600", desc: "Ask anything." },
  { name: "Confessions", path: "/confessions", icon: <ShieldAlert />, color: "bg-red-600", desc: "Share secrets." },
  { name: "Hot Takes", path: "/hot-takes", icon: <Flame />, color: "bg-orange-500", desc: "Unpopular opinions." }
];

export default function Hub() {
  return (
    <main className="min-h-screen bg-black text-white p-6 flex flex-col items-center">
      <h1 className="text-4xl font-black mt-8 mb-2 bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">ANON HUB</h1>
      <div className="grid grid-cols-1 gap-4 w-full max-w-md mt-10">
        {CATEGORIES.map((cat) => (
          <Link key={cat.path} href={cat.path} className="flex items-center p-4 bg-zinc-900 border border-zinc-800 rounded-2xl hover:border-purple-500 transition-all">
            <div className={`${cat.color} p-3 rounded-xl mr-4`}>{cat.icon}</div>
            <div className="flex-1">
              <h3 className="font-bold text-lg">{cat.name}</h3>
              <p className="text-zinc-500 text-sm">{cat.desc}</p>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}