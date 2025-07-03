"use client";
import { Card } from "./ui/card";
import { NewNote } from "./new-note";
import { readCatatan } from "@/lib/service";
import { useState, useEffect } from "react";
import { DeleteNote } from "./delete-note";

export interface catatanProps {
  id: number;
  judul: string;
  isi: string;
  updated_at: string;
  created_at: string;
}

interface listNoteProps{
  handleCatatan:(item:catatanProps)=>void
}

const ListNote = ({handleCatatan}:listNoteProps) => {
  const [catatan, setCatatan] = useState<catatanProps[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    const fetchData = async () => {
      const data = await readCatatan();
      setCatatan(data);
      setLoading(false);
    };
    fetchData();
  }, []);
  return (
    <>
      <Card className="rounded-sm w-[300px] h-[300px] p-4 space-y-4">
        <NewNote />
        <div className="w-full grid grid-cols-1 space-y-2 max-h-[210px]  overflow-y-scroll overflow-x-hidden">
          {loading ? (
            <div className="h-full w-full flex items-center justify-center">
              <h3>Loading...</h3>
            </div>
          ) : catatan.length === 0 ? (
            <div className="h-full w-full flex items-center justify-center">
              <h3>Catatan Kosong</h3>
            </div>
          ) : (
            catatan.map((item,index) => {
              const date = new Date(item.updated_at)
              return(
              <Card key={index} className="relative group w-full h-[50px] rounded-sm" onClick={()=>handleCatatan(item)}>
                <DeleteNote id={item.id} judul={item.judul}/>
                <h2 className="text-sm absolute font-semibold top-1 left-2 max-w-[250px] max-h-[20px] overflow-hidden text-ellipsis whitespace-nowrap">
                  {item.judul}
                </h2>
                <h4 className="absolute bottom-1 right-2 text-[8pt] font-light">
                  {date.toLocaleDateString()}:{date.toLocaleTimeString()}
                </h4>
              </Card>
            )})
          )}
        </div>
      </Card>
    </>
  );
};
export { ListNote };
