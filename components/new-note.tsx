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

const NewNote = () => {
  const [judul, setJudul] = useState<string>("");
  const [isi, setIsi] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createCatatan({ judul, isi });
      setJudul("");
      setIsi("");
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
      <Button
        onClick={() => setOpen(true)}
        className="w-full text-white font-semibold rounded-sm h-9 bg-green-600 hover:bg-green-500"
      >
        + Catatan Baru
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <form>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Catatan Baru</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4">
              <div className="grid gap-3">
                <Label htmlFor="name-1">Judul Catatan</Label>
                <Input
                  id="name-1"
                  name="judul"
                  placeholder="Tulis judul catatan"
                  onChange={(e) => setJudul(e.target.value)}
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="isi-catatan">Isi Catatan</Label>
                <Textarea
                  id="isi-catatan"
                  name="isi"
                  placeholder="Tulis isi catatan"
                  onChange={(e) => setIsi(e.target.value)}
                />
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button type="submit" className="bg-green-600 hover:bg-green-500 text-white" onClick={handleSubmit}>
                Tambah Catatan
              </Button>
            </DialogFooter>
          </DialogContent>
        </form>
      </Dialog>
    </>
  );
};
export { NewNote };
