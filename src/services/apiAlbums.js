import supabase from "./supabase";

export async function getAlbums() {
  const { data, error } = await supabase.from("albums").select();

  if (error) {
    console.error(error);
    throw new Error("Albums could not be loaded");
  }

  return data;
}

export async function createAlbum(newAlbum) {
  const { data, error } = await supabase
    .from("albums")
    .insert([newAlbum])
    .select();

  if (error) {
    console.error(error);
    throw new Error("Album could not be created");
  }

  return data;
}

export async function createAlbumWithNewArtist({
  albumname,
  artistname,
  year,
}) {
  let { data, error } = await supabase.rpc("CreateAlbumWithNewArtist", {
    albumname,
    artistname,
    year,
  });

  if (error) {
    console.error(error);
    throw new Error("Album could not be created");
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