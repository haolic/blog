"use client";

import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";
import { Contract, ethers, formatEther } from "ethers";
import { toast } from "sonner";

const Test = () => {
  const [address, setAddress] = useState("");
  const provider = useRef<ethers.BrowserProvider | ethers.AbstractProvider>(
    null
  );

  const signer = useRef<ethers.Signer | null>(null);

  useEffect(() => {
    if (window.ethereum) {
      provider.current = new ethers.BrowserProvider(window.ethereum);
    } else {
      provider.current = ethers.getDefaultProvider();
    }
  }, []);

  const connectWallet = async () => {
    if (window.ethereum) {
      provider.current = new ethers.BrowserProvider(window.ethereum);
      signer.current = await (
        provider.current as ethers.BrowserProvider
      ).getSigner();

      const address = await signer.current?.getAddress();
      setAddress(address);
    } else {
      toast.warning("请安装MetaMask钱包");
    }
  };

  const handleClick = async () => {
    const abi = [
      "function totalSupply() external view returns (uint)",
      "function balanceOf(address account) external view returns (uint)",
    ];
    const contract = new Contract(
      "0x8165B03B2d73eed0952F722591A83df777B54664",
      abi,
      provider.current
    );

    const totalSupply = await contract.totalSupply();
    console.log(formatEther(totalSupply));

    const balance = await contract.balanceOf(
      "0x25B36D90C3990af817d4242901B0f73e3cd81b19"
    );
    console.log(balance);

    const transaction = await provider.current?.getTransaction(
      "0x39146d457b3bdfd582942e8bae80bab87dc82a7cea845b5dba9d849a9048535f"
    );
    console.log(transaction);
  };

  return (
    <div className="w-full p-4">
      <div className="w-full flex justify-center items-center gap-2">
        <Button onClick={handleClick}>点击查询</Button>
        {!address && <Button onClick={connectWallet}>连接钱包</Button>}
      </div>

      {address && (
        <div className="text-center text-base">当前钱包地址：{address}</div>
      )}
    </div>
  );
};

export default Test;
