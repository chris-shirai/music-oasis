import { useState } from "react";
import { AnimatePresence, motion, MotionConfig } from "motion/react";
import useMeasure from "react-use-measure";
import { getArtists } from "../services/apiArtists";
import { getAlbums } from "../services/apiAlbums";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import autoprefixer from "autoprefixer";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faTableCellsLarge } from "@fortawesome/free-solid-svg-icons";
import { faSquare } from "@fortawesome/free-solid-svg-icons";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import { faList } from "@fortawesome/free-solid-svg-icons";

function AnimatedTabs() {
  // From https://buildui.com/recipes/animated-tabs
  let tabs = [
    { id: "art", label: "Art" },
    { id: "list", label: "List" },
  ];

  let [activeTab, setActiveTab] = useState(tabs[0].id);

  return (
    <div className="relative -top-4 content-center space-x-1 rounded-full">
      <span className="h-10 w-fit rounded-full border-2 border-gray-200 bg-black px-1 pb-3 pt-2.5">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`${
              activeTab === tab.id ? "" : "hover:text-white/60"
            } relative rounded-full px-3 py-1.5 text-sm font-medium text-gray-200 outline-sky-400 transition focus-visible:outline-2`}
            style={{
              WebkitTapHighlightColor: "transparent",
            }}
          >
            {activeTab === tab.id && (
              <motion.span
                layoutId="bubble"
                className="absolute inset-0 bg-gray-200 mix-blend-difference"
                style={{ borderRadius: 9999 }}
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
            {tab.id === "art" ? (
              <FontAwesomeIcon icon={faImage} />
            ) : (
              <FontAwesomeIcon icon={faList} />
            )}{" "}
            {tab.label}
          </button>
        ))}
      </span>
    </div>
  );
}

function TestPage() {
  const startYear = 2021;
  const endYear = 2024;

  const obj = {};
  for (let i = startYear; i <= endYear; i++) {
    obj[i] = false;
  }

  let [expandedArr, setExpandedArr] = useState(obj);

  const [listViewIsChecked, setListViewIsChecked] = useState(false);
  const handleChange = () => {
    setListViewIsChecked(!listViewIsChecked);
  };

  const { isLoading: isLoadingArtists, data: artists } = useQuery({
    queryKey: ["artists"],
    queryFn: getArtists,
  });

  const { isLoading: isLoadingAlbums, data: albums } = useQuery({
    queryKey: ["albums"],
    queryFn: getAlbums,
  });

  if (isLoadingArtists || isLoadingAlbums) return <></>;

  return (
    <div className="m-0">
      <img src="https://hbebmtiagssdrckajspr.supabase.co/storage/v1/object/public/app-images//header.jpeg" />
      <AnimatedTabs />
      <hr className="relative -top-8 -z-20 border" />
      <br />
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
      <input
        type="checkbox"
        checked={listViewIsChecked}
        onChange={handleChange}
      />
      {Array.from(
        { length: endYear - startYear + 1 },
        (_, i) => endYear - i,
      ).map((year) => (
        <YearPanel
          key={year}
          albums1={albums
            .filter((x) => x.year == year)
            .sort((a, b) => a.yearRank - b.yearRank)}
          setExpandedArr={setExpandedArr}
          expandedArr={expandedArr}
          listViewIsChecked={listViewIsChecked}
          year={year}
          artists={artists}
        />
      ))}
    </div>
  );
}

function YearPanel({
  albums1,
  setExpandedArr,
  expandedArr,
  listViewIsChecked,
  year,
  artists,
}) {
  // This function resets the expandedArr, which tells us which year's panel is expanded
  const resetArr = () => {
    const newObject = { ...expandedArr };
    for (const key in newObject) {
      newObject[key] = false;
    }
    newObject[year] = !expandedArr[year];

    setExpandedArr(newObject);
  };

  const imageVariants = {
    duration: 0.6,
    type: "spring",
    bounce: 0.25,
  };

  const albumNameVariants = {
    duration: 0.3,
    delay: 0.2,
    ease: "linear",
  };

  return (
    <MotionConfig transition={{ duration: 0.25 }}>
      <div
        className="mx-6 mt-3 rounded-2xl bg-stone-800 text-zinc-100"
        onClick={resetArr}
      >
        <h1 className="absolute pl-7 pt-4 text-left text-2xl font-bold">
          {year}
        </h1>

        <ResizablePanel>
          <div
            key={1}
            className={
              expandedArr[year]
                ? "grid grid-cols-2 gap-5"
                : listViewIsChecked
                  ? "grid grid-cols-[15%_85%] gap-2"
                  : "grid grid-cols-4 grid-rows-1 gap-2"
            }
          >
            {Array.from({ length: 4 }, (_, i) => i).map((num) => (
              <React.Fragment key={num}>
                <div>
                  <motion.img
                    layout
                    transition={imageVariants}
                    style={{ borderRadius: 6 }}
                    src={albums1[num].albumArt}
                  />

                  {expandedArr[year] ? (
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
                        <label>
                          {
                            artists.find((x) => x.id == albums1[num].artistID)
                              .artistName
                          }
                        </label>
                      </motion.div>
                    </>
                  ) : (
                    <div></div>
                  )}
                </div>
                {!expandedArr[year] && listViewIsChecked ? (
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
                    <label>
                      {
                        artists.find((x) => x.id == albums1[num].artistID)
                          .artistName
                      }
                    </label>
                  </motion.div>
                ) : (
                  <></>
                )}
              </React.Fragment>
            ))}
          </div>
        </ResizablePanel>
      </div>
    </MotionConfig>
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
      <div ref={ref} className="px-5 pb-4 pt-14">
        {children}
      </div>
    </motion.div>
  );
}

export default TestPage;
