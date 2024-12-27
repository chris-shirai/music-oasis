import supabase from "./supabase";

export async function getAlbums() {
  const { data, error } = await supabase.from("albums").select();

  if (error) {
    console.error(error);
    throw new Error("Albums could not be loaded");
  }

  return data;
}

export async function deleteAlbum(id) {
  const { data, error } = await supabase.from("albums").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Album could not be deleted");
  }

  return data;
}
