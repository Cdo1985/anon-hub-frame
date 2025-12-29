"use client";
import { useState } from "react";
import Leaderboard from "@/components/Leaderboard";
import PostFeed from "@/components/PostFeed";
import Link from "next/link";
import { ethers } from "ethers";

export default function HotTakesPage() {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const category = "hot-takes";

  const handlePaymentAndPost = async () => {
    if (!text) return;
    setLoading(true);

    try {
      if (!window.ethereum) throw new Error("Wallet not found");
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      const tx = await signer.sendTransaction({
        to: "0x844b9e33ffc8cae3081c9ec94117e60a35ac9185",
        value: ethers.parseEther("0.0001"),
      });

      await tx.wait();

      const res = await fetch("/api/post", {
        method: "POST",
        body: JSON.stringify({ fid: "12345", content: text, category, txHash: tx.hash }),
      });

      if (res.ok) {
        setText("");
        window.location.reload();
      }
    } catch (err: any) {
      alert("Error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-black text-white p-8 flex flex-col items-center">
      <div className="w-full max-w-md">
        <Link href="/" className="text-zinc-500 hover:text-white text-sm mb-8 inline-block">← Back to Hub</Link>
        <div className="bg-zinc-900 p-6 rounded-2xl border border-orange-900/30 shadow-2xl">
          <h1 className="text-3xl font-black mb-1 text-orange-500 uppercase tracking-tighter">Hot Takes</h1>
          <p className="text-zinc-400 mb-6 text-sm">It costs 0.0001 ETH to be this bold.</p>
          <textarea 
            className="w-full bg-black border border-zinc-800 p-4 rounded-xl text-white mb-4 focus:border-orange-500 outline-none"
            placeholder="Drop your take..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button 
            onClick={handlePaymentAndPost}
            disabled={loading}
            className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 rounded-xl transition-all"
          >
            {loading ? "Verifying..." : "Pay ETH & Post Take"}
          </button>
          <Leaderboard /> 
          <PostFeed category={category} />
        </div>
      </div>
    </main>
  );
}