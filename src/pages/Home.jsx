import { Link } from "react-router-dom";
import { getArtists } from "../services/apiArtists";
import { useQuery } from "@tanstack/react-query";
import { getAlbums } from "../services/apiAlbums";
import { AnimatePresence, inertia, motion, spring } from "framer-motion";
import { useState } from "react";

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
    <div className="m-2 rounded-3xl bg-stone-800">
      <h1 className="absolute p-2 text-left text-2xl font-bold text-stone-100">
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

function AnimateItem({ year, albums, artists }) {
  const [isOpen, setIsOpen] = useState(false);

  if (albums.length < 4) {
    return <></>;
  }

  return (
    <AnimatePresence initial={false} mode="wait">
      <motion.div
        key={isOpen ? "minus" : "plus"}
        initial={{
          height: 140,
        }}
        animate={{
          height: "auto",
          transition: { type: "tween", duration: 0.3, ease: "circOut" },
        }}
        exit={{
          height: 140,
          transition: { type: "tween", duration: 0.3, ease: "circOut" },
        }}
        // className={`parent flex w-96 justify-center rounded-md bg-white ${isOpen ? "h-96" : "h-10"}`}
        className={`parent flex justify-center rounded-3xl`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="m-2 rounded-3xl bg-stone-800">
          <h1 className="absolute p-2 text-left text-2xl font-bold text-stone-100">
            {year}
          </h1>
          <div className="grid grid-cols-4 gap-2 p-8">
            {/* {Array.from({ length: 4 }, (_, i) => i).map((num) => (
              <MinimizedAlbum
                key={albums[num].id}
                albumName={albums[num].albumName}
                artistName={
                  artists.find((x) => x.id == albums[num].artistID).artistName
                }
                albumArt={albums[num].albumArt}
              />
            ))} */}
            <MinimizedAlbum
              key={albums[0].id}
              albumName={albums[0].albumName}
              artistName={
                artists.find((x) => x.id == albums[0].artistID).artistName
              }
              albumArt={albums[0].albumArt}
            />

            <MinimizedAlbum
              key={albums[1].id}
              albumName={albums[1].albumName}
              artistName={
                artists.find((x) => x.id == albums[1].artistID).artistName
              }
              albumArt={albums[1].albumArt}
            />

            <MinimizedAlbum
              key={albums[2].id}
              albumName={albums[2].albumName}
              artistName={
                artists.find((x) => x.id == albums[2].artistID).artistName
              }
              albumArt={albums[2].albumArt}
            />

            <MinimizedAlbum
              key={albums[3].id}
              albumName={albums[3].albumName}
              artistName={
                artists.find((x) => x.id == albums[3].artistID).artistName
              }
              albumArt={albums[3].albumArt}
            />
          </div>

          {isOpen && (
            <>
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              {"OPEN"}
            </>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
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
      <Link className="text-white" to="/test">
        Test Page
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

      {Array.from(
        { length: endYear - startYear + 1 },
        (_, i) => endYear - i,
      ).map((year) => (
        <AnimateItem
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
