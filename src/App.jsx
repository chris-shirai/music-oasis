import "./App.css";
import { useEffect, useState } from "react";
import supabase from "./services/supabase";

function App() {
  const [artists, setArtists] = useState([]);

  useEffect(() => {
    getArtists();
  }, []);

  async function getArtists() {
    const { data } = await supabase.from("artists").select();
    setArtists(data);
  }

  return (
    <ul>
      {artists.map((artist) => (
        <li key={artist.artistName}>{artist.artistName}</li>
      ))}
    </ul>
  );
}

export default App;
