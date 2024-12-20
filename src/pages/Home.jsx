import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import supabase from "../services/supabase";

function Home() {
  const [artists, setArtists] = useState([]);

  useEffect(() => {
    getArtists();
  }, []);

  async function getArtists() {
    const { data } = await supabase.from("artists").select();
    setArtists(data);
  }

  return (
    <div>
      <Link to="/library">Library</Link>
      <ul>
        {artists.map((artist) => (
          <li key={artist.artistName}>{artist.artistName}</li>
        ))}
      </ul>
    </div>
  );
}

export default Home;
