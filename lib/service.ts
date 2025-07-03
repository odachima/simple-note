import supabase from "./supabase-client";

interface createCatatan{
    judul:string,
    isi:string,
}

interface updateCatatan{
    id:number,
    judul:string,
    isi:string,
}

interface deleteCatatan{
    id:number,
}

const createCatatan = async ({judul,isi}:createCatatan) => {
    const date = new Date()
    await supabase.from('catatan').insert([{ 
        judul,
        isi,
        created_at:date,
        updated_at:date
     }]);
};
    
const updateCatatan = async ({id,judul,isi}:updateCatatan) => {
    const date = new Date()
    await supabase
    .from("catatan")
    .update({
      judul,
      isi,
      updated_at:date,
    })
    .eq("id", id);
};

const deleteCatatan = async ({id}:deleteCatatan) => {
    await supabase
    .from("catatan")
    .delete()
    .eq("id", id);
};

const readCatatan = async () => {
  const { data, error } = await supabase
    .from("catatan")
    .select("*")
    .order("created_at", { ascending: false });
  return data || [];
};

export {createCatatan,readCatatan,updateCatatan,deleteCatatan}
