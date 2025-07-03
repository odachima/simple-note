"use client";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useState,useEffect } from "react";
import { Textarea } from "./ui/textarea";
import { catatanProps } from "./list-note";
import { updateCatatan } from "@/lib/service";


interface wrapperNote {
  item: catatanProps | null;
}

const WrapperNote = ({ item }: wrapperNote) => {
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [judul,setJudul]=useState<string>("")
  const [isi,setIsi]=useState<string>("")
  const [loading,setLoading]=useState<boolean>(false)
  useEffect(()=>{
    const setCatatan = async()=>{
      if(item){
        setJudul(item.judul)
        setIsi(item.isi)
      }
    }
    setCatatan()
    
  },[item])
  const handleEdit = () => {
    setIsEdit(true);
  };
  const handleCancel = () => {
    setJudul(item?.judul || "")
    setIsi(item?.isi || "")
    setIsEdit(false);
  };
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      if (item){
        await updateCatatan({id:item.id,judul,isi})
      }
    } catch (error) {
      console.log(error)
    }finally{
setIsEdit(false);
setLoading(false)
window.location.reload()
    }
    
  };
  return (
    <Card className="w-[500px] h-[300px] bg-white rounded-sm">
      {item === null ? (
        <div className="w-full h-full flex items-center justify-center">
          <h2>Catatan belum dipilih</h2>
        </div>
      ) : (
        <div className="w-full h-full ">
          <div className="flex justify-between">
            <div className="flex items-center pl-5 text-2xl font-semibold">
              {!isEdit ? <h1>Catatan</h1> : <h1>Ubah Catatan</h1>}
            </div>
            <div className="p-4 flex items-center justify-center">
              {!isEdit ? (
                <Button
                  onClick={handleEdit}
                  className="bg-orange-600 hover:bg-orange-500"
                >
                  Edit
                </Button>
              ) : (
                <div className="flex gap-2">
                  <Button
                    onClick={handleSave}
                    className="bg-green-600 hover:bg-green-500"
                  >
                    Save
                  </Button>
                  <Button variant={"outline"} onClick={handleCancel}>
                    Cancel
                  </Button>
                </div>
              )}
            </div>
          </div>
          <div className="w-full px-4 pb-4 space-y-4">
            {!isEdit?(
              <>
              <Input
              placeholder="Isi judul catatan"
              className="text-xs text-primary"
              value={judul}
              readOnly
            />
            <Textarea
              placeholder="Tulis catatan"
              className="text-xs text-primary h-[160px]"
              value={isi}
              readOnly
            />
              </>
            ):(
              <>
              <Input
              placeholder="Isi judul catatan"
              className="text-xs text-primary"
              value={judul}
              onChange={(e)=>setJudul(e.target.value)}
            />
            <Textarea
              placeholder="Tulis catatan"
              className="text-xs text-primary h-[160px]"
              value={isi}
              onChange={(e)=>setIsi(e.target.value)}
            />
              </>
            )}
            
          </div>
        </div>
      )}
    </Card>
  );
};
export { WrapperNote };
