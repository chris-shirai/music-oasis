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
      <Link to="/sortable">Sortable</Link>
      <br />
      <ul>
        {artists.map((artist) => (
          <li key={artist.artistName}>{artist.artistName}</li>
        ))}
      </ul>
    </div>
  );
}

export default Home;
