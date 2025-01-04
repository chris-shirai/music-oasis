import { Link } from "react-router-dom";
import { getArtists } from "../services/apiArtists";
import { useQuery } from "@tanstack/react-query";

function Home() {
  const { isLoading, data: artists } = useQuery({
    queryKey: ["artists"],
    queryFn: getArtists,
  });

  if (isLoading) return <></>;
  //   console.log(x);

  return (
    <div>
      <Link to="/">Home</Link>
      <br />
      <Link to="/library">Library</Link>
      <br />
      {/* <Link to="/sortable">Sortable</Link> */}
      <br />
      <img
        src="https://hbebmtiagssdrckajspr.supabase.co/storage/v1/object/public/app-images/profile.jpeg?t=2025-01-04T22%3A15%3A15.750Z"
        width="200"
        height="200"
        style={{ borderRadius: "30%" }}
      />
      <ul>
        {artists.map((artist) => (
          <li key={artist.artistName}>{artist.artistName}</li>
        ))}
      </ul>
    </div>
  );
}

export default Home;
