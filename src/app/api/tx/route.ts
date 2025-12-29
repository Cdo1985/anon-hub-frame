import { NextResponse } from "next/server";

export async function POST() {
  // Replace this with YOUR actual ETH wallet address
  const MY_WALLET = "0xYourWalletAddressHere"; 
  
  // 0.0001 ETH (Adjust as needed)
  const PRICE = "100000000000000"; // value in Wei

  return NextResponse.json({
    chainId: "eip155:8453", // Base Mainnet (cheap and fast)
    method: "eth_sendTransaction",
    params: {
      abi: [], // Standard ETH transfer doesn't need an ABI
      to: MY_WALLET,
      value: PRICE,
      data: "0x",
    },
  });
}