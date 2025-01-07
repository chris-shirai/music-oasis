import { Link } from "react-router-dom";
import { getArtists } from "../services/apiArtists";
import { useQuery } from "@tanstack/react-query";
import { getAlbums } from "../services/apiAlbums";

function Album({ album, artistName }) {
  return (
    <li key={album.id} width="400">
      <img
        src="https://hbebmtiagssdrckajspr.supabase.co/storage/v1/object/public/app-images/music.png"
        width="50"
        height="50"
      />
      <label className="text-blue-800">
        {album.albumName} {artistName}
      </label>
    </li>
  );
}

function Home() {
  const startYear = 2019;
  const endYear = 2024;

  const { isLoading: isLoadingArtists, data: artists } = useQuery({
    queryKey: ["artists"],
    queryFn: getArtists,
  });

  const { isLoading: isLoadingAlbums, data: albums } = useQuery({
    queryKey: ["albums"],
    queryFn: getAlbums,
  });

  if (isLoadingArtists || isLoadingAlbums) return <></>;
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
      {Array.from(
        { length: endYear - startYear + 1 },
        (_, i) => endYear - i,
      ).map((year) => (
        <div key={year}>
          <h1>{year}</h1>
          <ul>
            {albums
              .filter((x) => x.year == year)
              .sort((a, b) => a.yearRank - b.yearRank)
              .map((album) => (
                <Album
                  key={album.id}
                  album={album}
                  artistName={
                    artists.find((x) => x.id == album.artistID).artistName
                  }
                />
              ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default Home;
