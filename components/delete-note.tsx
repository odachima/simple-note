"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { useState } from "react";
import { createCatatan } from "@/lib/service";
import { deleteCatatan } from "@/lib/service";

interface deleteNoteProps{
    id:number,
    judul:string
}

const DeleteNote = ({id,judul}:deleteNoteProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const handleDelete = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await deleteCatatan({id});
      setOpen(false);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      window.location.reload();
    }
  };
  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="opacity-0 text-[11px] text-red-500 absolute top-2 right-3 group-hover:opacity-100"
      >
        Hapus
      </button>
      <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="sm:max-w-[425px] space-y-3">
            <DialogHeader className="pt-6">
              <DialogTitle>Apakah anda yakin ingin menghapus catatan {judul}</DialogTitle>
            </DialogHeader>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button type="submit" variant={"destructive"} onClick={handleDelete}>
                Hapus
              </Button>
            </DialogFooter>
          </DialogContent>
      </Dialog>
    </>
  );
};
export { DeleteNote };
