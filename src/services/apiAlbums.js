import supabase from "./supabase";

export async function getAlbums() {
  const { data, error } = await supabase.from("albums").select();

  if (error) {
    console.error(error);
    throw new Error("Albums could not be loaded");
  }

  return data;
}

export async function createAlbum({
  album_year,
  new_album_name,
  new_artist_id,
}) {
  let { data, error } = await supabase.rpc("CreateAlbum_v2", {
    album_year,
    new_album_name,
    new_artist_id,
  });

  if (error) {
    console.error(error);
    throw new Error("Album could not be created");
  }

  return data;
}

export async function createAlbumWithNewArtist({
  album_year,
  new_album_name,
  new_artist_name,
}) {
  let { data, error } = await supabase.rpc("CreateAlbumWithNewArtist_v3", {
    album_year,
    new_album_name,
    new_artist_name,
  });

  if (error) {
    console.error(error);
    throw new Error("Album could not be created");
  }

  return data;
}

export async function updateAlbum({ albumid, albumname, yearrank }) {
  const { data, error } = await supabase
    .from("albums")
    .update({ albumName: albumname, yearRank: yearrank })
    .eq("id", albumid)
    .select();

  if (error) {
    console.error(error);
    throw new Error("Album could not be updated");
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
