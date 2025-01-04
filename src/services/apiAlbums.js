import supabase from "./supabase";

export async function getAlbums() {
  const { data, error } = await supabase.from("albums").select();

  if (error) {
    console.error(error);
    throw new Error("Albums could not be loaded");
  }

  return data;
}

export async function createAlbum({ albumYear, newAlbumName, artistID }) {
  let { data, error } = await supabase.rpc("CreateAlbum_v2", {
    album_year: albumYear,
    new_album_name: newAlbumName,
    new_artist_id: artistID,
  });

  if (error) {
    console.error(error);
    throw new Error("Album could not be created");
  }

  return data;
}

export async function createAlbumWithNewArtist({
  albumYear,
  newAlbumName,
  newArtistName,
}) {
  let { data, error } = await supabase.rpc("CreateAlbumWithNewArtist_v3", {
    album_year: albumYear,
    new_album_name: newAlbumName,
    new_artist_name: newArtistName,
  });

  if (error) {
    console.error(error);
    throw new Error("Album could not be created");
  }

  return data;
}

export async function updateAlbum({ albumID, albumName, yearRank }) {
  const { data, error } = await supabase
    .from("albums")
    .update({ album_name: albumName, year_rank: yearRank })
    .eq("id", albumID)
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
