"use client";
import { useState } from "react";
import Leaderboard from "@/components/Leaderboard";
import PostFeed from "@/components/PostFeed";
import Link from "next/link";
import { ethers } from "ethers"; // Install this: npm install ethers

export default function QandAPage() {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const category = "q-and-a";

  const handlePaymentAndPost = async () => {
    if (!text) return;
    setLoading(true);

    try {
      // 1. Request Wallet Connection
      if (!window.ethereum) throw new Error("No crypto wallet found");
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      // 2. Send Transaction (0.0001 ETH to your address)
      const tx = await signer.sendTransaction({
        to: "0x844b9e33ffc8cae3081c9ec94117e60a35ac9185", // CHANGE THIS TO YOUR WALLET
        value: ethers.parseEther("0.0001"), 
      });

      alert("Transaction sent! Waiting for confirmation...");
      await tx.wait(); // Wait for the block to confirm

      // 3. Only if Tx succeeds, send to database
      const res = await fetch("/api/post", {
        method: "POST",
        body: JSON.stringify({ fid: "12345", content: text, category, txHash: tx.hash }),
      });

      if (res.ok) {
        setText("");
        window.location.reload();
      }
    } catch (err: any) {
      alert("Payment failed: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-black text-white p-8 flex flex-col items-center">
      <div className="w-full max-w-md">
        <Link href="/" className="text-zinc-500 hover:text-white text-sm mb-8 inline-block">← Back to Hub</Link>
        <div className="bg-zinc-900 p-6 rounded-2xl border border-purple-900/30 shadow-2xl">
          <h1 className="text-3xl font-black mb-1 text-purple-500 uppercase tracking-tighter">Q&A</h1>
          <p className="text-zinc-400 mb-6 text-sm">Cost: 0.0001 ETH to ask.</p>
          <textarea 
            className="w-full bg-black border border-zinc-800 p-4 rounded-xl text-white mb-4 focus:border-purple-500 outline-none"
            placeholder="What's your question?"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button 
            onClick={handlePaymentAndPost}
            disabled={loading}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 rounded-xl transition-all"
          >
            {loading ? "Processing..." : "Pay ETH & Post"}
          </button>
          <Leaderboard /> 
          <PostFeed category={category} />
        </div>
      </div>
    </main>
  );
}