"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";


export default function Home() {
  return (
    <div className="flex min-h-screen bg-white mr-7.5 ml-7.5 pt-5">
      <main className="flex w-full h-full">
        <HeroSection />
      </main>
    </div>
  );
}

function HeroSection() {
  const router = useRouter();
  function sendToAuth() {
    router.push("/sign-in")
  }
  return (
    <div className="flex flex-col gap-y-3">
      <span className="font-sans tracking-[-0.05em] text-2xl w-125 text-black">
        Witness is the AI built for everyone the system failed. 
        <span className="ml-1 text-[#808080]">Understand your rights, fight back, and win — without a lawyer.</span>
      </span>
      <Button variant="default" size="sm" className="bg-[#121212] w-30 rounded-full">
        <span className="font-sans tracking-[-0.03em] text-sm font-normal">Use witness</span>
        <ArrowRight />
      </Button>
    </div>
  )
}