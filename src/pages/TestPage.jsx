import { useState } from "react";
import { AnimatePresence, motion, MotionConfig } from "motion/react";
import useMeasure from "react-use-measure";
import { getArtists } from "../services/apiArtists";
import { getAlbums } from "../services/apiAlbums";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

function TestPage() {
  let [expanded, setExpanded] = useState(false);
  const bounceDuration = 0.6;
  const firstDelay = 0.2;
  const secondDelay = 0.3;
  const stiff = 500;

  const { isLoading: isLoadingArtists, data: artists } = useQuery({
    queryKey: ["artists"],
    queryFn: getArtists,
  });

  //   const { isLoading: isLoadingAlbums, data: albums } = useQuery({
  //     queryKey: ["albums"],
  //     queryFn: getAlbums,
  //   });

  const imageVariants = {
    duration: bounceDuration,
    type: "spring",
    bounce: 0.25,
  };

  const albumNameVariants = {
    duration: 0.3,
    delay: 0.2,
    ease: "linear",
  };

  const artistVariants = {
    duration: 0.3,
    delay: 0.4,
    ease: "linear",
  };

  const albums = [
    {
      albumArt:
        "https://hbebmtiagssdrckajspr.supabase.co/storage/v1/object/public/album-images/tyla_tyla.jpg",
      albumName: "Tyla",
      artistName: "Tyla",
    },
    {
      albumArt:
        "https://hbebmtiagssdrckajspr.supabase.co/storage/v1/object/public/album-images/charli_xcx_brat.png?t=2025-01-08T03%3A27%3A40.881Z",
      albumName: "BRAT",
      artistName: "Charli xcx",
    },
    {
      albumArt:
        "https://hbebmtiagssdrckajspr.supabase.co/storage/v1/object/public/album-images/billie_eilish_hit_me_hard_soft_soft.png",
      albumName: "HIT ME HARD AND SOFT",
      artistName: "Billie Eilish",
    },
    {
      albumArt:
        "https://hbebmtiagssdrckajspr.supabase.co/storage/v1/object/public/album-images/sabrina_carpenter_short_n_sweet.png",
      albumName: "Short 'n Sweet",
      artistName: "Sabrina Carpenter",
    },
  ];

  if (isLoadingArtists) return <></>;

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
      <MotionConfig transition={{ duration: 0.25 }}>
        <div className="flex min-h-screen flex-col p-10 text-zinc-100">
          <div className="mx-auto mt-8 h-full w-full max-w-sm border border-zinc-500">
            <h1 className="mb-8 text-center text-3xl font-thin"></h1>
            <div className="mb-8 flex justify-between px-8">
              <button
                className="border px-2 py-1"
                onClick={() => setExpanded(!expanded)}
              >
                <label>Toggle</label>
              </button>
            </div>
            <ResizablePanel>
              <div
                key={1}
                className={
                  expanded ? "grid grid-cols-2 gap-5" : "grid grid-cols-4 gap-3"
                }
              >
                {Array.from({ length: 4 }, (_, i) => i).map((num) => (
                  <div key={num}>
                    <motion.div layout transition={imageVariants}>
                      <img className="rounded-md" src={albums[num].albumArt} />
                    </motion.div>
                    {expanded ? (
                      <>
                        <motion.div
                          layout
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={albumNameVariants}
                        >
                          <label className="font-bold">
                            {albums[num].albumName}
                          </label>
                          <br />
                          <label>{albums[num].artistName}</label>
                        </motion.div>
                      </>
                    ) : (
                      <div></div>
                    )}
                  </div>
                ))}

                {/* <div>
                  <motion.div layout transition={imageVariants}>
                    <img
                      className="rounded-md"
                      src="https://hbebmtiagssdrckajspr.supabase.co/storage/v1/object/public/album-images/tyla_tyla.jpg"
                    />
                  </motion.div>
                  {expanded ? (
                    <>
                      <motion.div
                        layout
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={albumNameVariants}
                      >
                        <label className="font-bold">Tyla</label>
                        <br />
                        <label>Tyla</label>
                      </motion.div>
                    </>
                  ) : (
                    <div></div>
                  )}
                </div> */}

                {/* <div>
                  <motion.div layout transition={imageVariants}>
                    <img
                      className="rounded-md"
                      src="https://hbebmtiagssdrckajspr.supabase.co/storage/v1/object/public/album-images/charli_xcx_brat.png?t=2025-01-08T03%3A27%3A40.881Z"
                    />
                  </motion.div>
                  <motion.div layout>{expanded ? "BRAT" : ""}</motion.div>
                </div>
                <motion.div layout transition={imageVariants}>
                  <img
                    className="rounded-md"
                    src="https://hbebmtiagssdrckajspr.supabase.co/storage/v1/object/public/album-images/billie_eilish_hit_me_hard_soft_soft.png"
                  />
                </motion.div>
                <motion.div layout transition={imageVariants}>
                  <img
                    className="rounded-md"
                    src="https://hbebmtiagssdrckajspr.supabase.co/storage/v1/object/public/album-images/sabrina_carpenter_short_n_sweet.png"
                  />
                </motion.div> */}
              </div>
            </ResizablePanel>
          </div>

          <div className="mx-auto mt-16 max-w-md">
            <p>
              Some other content. Lorem ipsum dolor sit amet consecetur
              adipisicing elit. Repudiandae modi vel odio.
            </p>
          </div>
        </div>
      </MotionConfig>
    </div>
  );
}

function ResizablePanel({ children }) {
  let [ref, { height }] = useMeasure();

  return (
    <motion.div
      initial={{ height: 0 }}
      animate={{ height }}
      className="overflow-hidden"
    >
      <div ref={ref} className="px-8 pb-8">
        {children}
      </div>
    </motion.div>
  );
}

export default TestPage;
