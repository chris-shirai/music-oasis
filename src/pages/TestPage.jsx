import { useState } from "react";
import { AnimatePresence, motion, MotionConfig } from "motion/react";
import useMeasure from "react-use-measure";
import { getArtists } from "../services/apiArtists";
import { getAlbums } from "../services/apiAlbums";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import autoprefixer from "autoprefixer";

function TestPage() {
  let [expandedArr, setExpandedArr] = useState({
    1: false,
    2: false,
    3: false,
  });
  const [isChecked, setIsChecked] = useState(false);
  const handleChange = () => {
    setIsChecked(!isChecked);
  };

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

  const albums1 = [
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

  const albums2 = [
    {
      albumArt:
        "https://hbebmtiagssdrckajspr.supabase.co/storage/v1/object/public/album-images/karol_g_manana_sera_bonito.png?t=2025-01-15T03%3A30%3A05.193Z",
      albumName: "MAÑANA SERÁ BONITO",
      artistName: "KAROL G",
    },
    {
      albumArt:
        "https://hbebmtiagssdrckajspr.supabase.co/storage/v1/object/public/album-images/kali_uchis_red_moon_in_venus.png?t=2025-01-15T03%3A30%3A36.810Z",
      albumName: "Red Moon In Venus",
      artistName: "Kali Uchis",
    },
    {
      albumArt:
        "https://hbebmtiagssdrckajspr.supabase.co/storage/v1/object/public/album-images/caroline_polachek_desire_i_want_to_turn_into_you.png?t=2025-01-15T03%3A30%3A45.925Z",
      albumName: "Desire, I Want To Turn Into You",
      artistName: "Caroline Polachek",
    },
    {
      albumArt:
        "https://hbebmtiagssdrckajspr.supabase.co/storage/v1/object/public/album-images/luke_combs_gettin_old.png?t=2025-01-15T03%3A30%3A57.368Z",
      albumName: "Gettin' Old",
      artistName: "Luke Combs",
    },
  ];

  const albums3 = [
    {
      albumArt:
        "https://hbebmtiagssdrckajspr.supabase.co/storage/v1/object/public/album-images/harry_styles_harrys_house.png?t=2025-01-15T03%3A32%3A41.017Z",
      albumName: "Harry's House",
      artistName: "Harry Styles",
    },
    {
      albumArt:
        "https://hbebmtiagssdrckajspr.supabase.co/storage/v1/object/public/album-images/beyonce_renaissance.png?t=2025-01-15T03%3A32%3A34.014Z",
      albumName: "Renaissance",
      artistName: "Beyoncé",
    },
    {
      albumArt:
        "https://hbebmtiagssdrckajspr.supabase.co/storage/v1/object/public/album-images/sza_sos.png?t=2025-01-15T03%3A32%3A24.600Z",
      albumName: "SOS",
      artistName: "SZA",
    },
    {
      albumArt:
        "https://hbebmtiagssdrckajspr.supabase.co/storage/v1/object/public/album-images/the_weeknd_dawn_fm.png?t=2025-01-15T03%3A32%3A16.678Z",
      albumName: "Dawn FM",
      artistName: "The Weeknd",
    },
  ];

  if (isLoadingArtists) return <></>;

  return (
    <div className="m-0">
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
      <label className="text-white">List?</label>
      <input type="checkbox" checked={isChecked} onChange={handleChange} />
      <MotionConfig transition={{ duration: 0.25 }}>
        <div
          className="m-0 rounded-3xl bg-stone-800 text-zinc-100"
          onClick={() =>
            setExpandedArr({ 1: !expandedArr[1], 2: false, 3: false })
          }
        >
          <h1 className="absolute pl-7 pt-4 text-left text-2xl font-bold">
            2024
          </h1>
          <div className="px-5 pb-4 pt-14">
            <ResizablePanel>
              <div
                key={1}
                className={
                  expandedArr[1]
                    ? "grid grid-cols-2 gap-5"
                    : isChecked
                      ? "grid grid-cols-[20%_80%] grid-rows-4 gap-2"
                      : "grid grid-cols-4 grid-rows-1 gap-2"
                }
              >
                {Array.from({ length: 4 }, (_, i) => i).map((num) => (
                  <>
                    <div key={num}>
                      <motion.div layout transition={imageVariants}>
                        <img
                          className={`rounded-md`}
                          src={albums1[num].albumArt}
                        />
                      </motion.div>
                      {expandedArr[1] ? (
                        <>
                          <motion.div
                            layout
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={albumNameVariants}
                          >
                            <label className="font-bold">
                              {albums1[num].albumName}
                            </label>
                            <br />
                            <label>{albums1[num].artistName}</label>
                          </motion.div>
                        </>
                      ) : (
                        <div></div>
                      )}
                    </div>
                    {!expandedArr[1] && isChecked ? (
                      <motion.div
                        className="pl-2 text-left"
                        layout
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={albumNameVariants}
                      >
                        <label className="font-bold">
                          {albums1[num].albumName}
                        </label>
                        <br />
                        <label>{albums1[num].artistName}</label>
                      </motion.div>
                    ) : (
                      <></>
                    )}
                  </>
                ))}
              </div>
            </ResizablePanel>
          </div>
        </div>
      </MotionConfig>
      <MotionConfig transition={{ duration: 0.25 }}>
        <div
          className="m-2 rounded-3xl bg-stone-800 text-zinc-100"
          onClick={() =>
            setExpandedArr({ 1: false, 2: !expandedArr[2], 3: false })
          }
        >
          <h1 className="absolute pl-7 pt-4 text-left text-2xl font-bold">
            2023
          </h1>
          <div className="px-9 pb-8 pt-14">
            <ResizablePanel>
              <div
                key={1}
                className={
                  expandedArr[2]
                    ? "grid grid-cols-2 gap-5"
                    : "grid grid-cols-4 gap-6"
                }
              >
                {Array.from({ length: 4 }, (_, i) => i).map((num) => (
                  <div key={num}>
                    <motion.div layout transition={imageVariants}>
                      <img className="rounded-md" src={albums2[num].albumArt} />
                    </motion.div>
                    {expandedArr[2] ? (
                      <>
                        <motion.div
                          layout
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={albumNameVariants}
                        >
                          <label className="font-bold">
                            {albums2[num].albumName}
                          </label>
                          <br />
                          <label>{albums2[num].artistName}</label>
                        </motion.div>
                      </>
                    ) : (
                      <div></div>
                    )}
                  </div>
                ))}
              </div>
            </ResizablePanel>
          </div>
        </div>
      </MotionConfig>
      <MotionConfig transition={{ duration: 0.25 }}>
        <div
          className="m-2 rounded-3xl bg-stone-800 text-zinc-100"
          onClick={() =>
            setExpandedArr({ 1: false, 2: false, 3: !expandedArr[3] })
          }
        >
          <h1 className="absolute pl-7 pt-4 text-left text-2xl font-bold">
            2022
          </h1>
          <div className="px-9 pb-8 pt-14">
            <ResizablePanel>
              <div
                key={1}
                className={
                  expandedArr[3]
                    ? "grid grid-cols-2 gap-5"
                    : "grid grid-cols-4 gap-6"
                }
              >
                {Array.from({ length: 4 }, (_, i) => i).map((num) => (
                  <div key={num}>
                    <motion.div layout transition={imageVariants}>
                      <img className="rounded-md" src={albums3[num].albumArt} />
                    </motion.div>
                    {expandedArr[3] ? (
                      <>
                        <motion.div
                          layout
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={albumNameVariants}
                        >
                          <label className="font-bold">
                            {albums3[num].albumName}
                          </label>
                          <br />
                          <label>{albums3[num].artistName}</label>
                        </motion.div>
                      </>
                    ) : (
                      <div></div>
                    )}
                  </div>
                ))}
              </div>
            </ResizablePanel>
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
      <div ref={ref} className="">
        {children}
      </div>
    </motion.div>
  );
}

export default TestPage;
