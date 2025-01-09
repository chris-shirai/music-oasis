import { Link } from "react-router-dom";
import { getArtists } from "../services/apiArtists";
import { useQuery } from "@tanstack/react-query";
import { getAlbums } from "../services/apiAlbums";

function MinimizedAlbum({ albumName, artistName, albumArt }) {
  return (
    <div>
      <img className="rounded-md" src={albumArt} />
      {/* <label className="font-semibold">{albumName}</label> */}
      {/* <br /> */}
      {/* <label className="text-white">{artistName}</label> */}
    </div>
  );
}

function Year({ year, albums, artists }) {
  if (albums.length < 4) {
    return <></>;
  }

  return (
    <div className=" bg-stone-800 rounded-3xl m-2 ">
      <h1 className="text-stone-100 text-2xl font-bold absolute text-left p-2">
        {year}
      </h1>
      <div className="grid grid-cols-4 gap-2 p-8">
        {Array.from({ length: 4 }, (_, i) => i).map((num) => (
          <MinimizedAlbum
            key={albums[num].id}
            albumName={albums[num].albumName}
            artistName={
              artists.find((x) => x.id == albums[num].artistID).artistName
            }
            albumArt={albums[num].albumArt}
          />
        ))}
      </div>
    </div>
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
      <Link className="text-white" to="/">
        Home
      </Link>
      <br />
      <Link className="text-white" to="/library">
        Library
      </Link>
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
        <Year
          key={year}
          year={year}
          albums={albums
            .filter((x) => x.year == year)
            .sort((a, b) => a.yearRank - b.yearRank)}
          artists={artists}
        />
      ))}
    </div>
  );
}

export default Home;
