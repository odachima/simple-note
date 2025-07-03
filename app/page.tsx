"use client"
import { WrapperNote } from "@/components/wrapper-note";
import { ListNote } from "@/components/list-note";
import { useState } from "react";
import { catatanProps } from "@/components/list-note";

export default function Home() {
  const [catatan,setCatatan]=useState<catatanProps | null>(null)

  const handleCatatan = (item:catatanProps)=>{
    setCatatan(item)
  }
  console.log("ini catatan",catatan)
  return (
    <main className="">
      <div className="w-full bg-white shadow-sm h-[50px] flex items-center">
        <h1 className="pl-[20px] text-xl font-semibold">Aplikasi Catatan</h1>
      </div>
      <div className="flex justify-evenly mt-[20px]">
        <ListNote handleCatatan={handleCatatan} />
        <WrapperNote item={catatan} />
      </div>
    </main>
  );
}
