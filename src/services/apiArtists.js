import supabase from "./supabase";

export async function getArtists() {
  const { data, error } = await supabase
    .from("artists")
    .select("id, artistName: artist_name");

  if (error) {
    console.error(error);
    throw new Error("Artists could not be loaded");
  }

  return data;
}
