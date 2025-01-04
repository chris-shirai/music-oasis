import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import {
  deleteAlbum,
  getAlbums,
  createAlbum,
  createAlbumWithNewArtist,
} from "../services/apiAlbums";
import { getArtists } from "../services/apiArtists";
import toast from "react-hot-toast";
import { useState } from "react";
import CreatableSelect from "react-select/creatable";
import { Sortable } from "./Sortable";

function AddAlbum({ year }) {
  const [albumName, setAlbumName] = useState("");
  const [artist, setArtist] = useState("");
  const queryClient = useQueryClient();

  const { isLoadingArtists, data: artists } = useQuery({
    queryKey: ["artists"],
    queryFn: getArtists,
  });

  const { mutate: mutateCreateAlbum, isLoading: isCreatingAlbum } = useMutation(
    {
      mutationFn: createAlbum,
      onSuccess: () => {
        toast.success("New album successfully created");
        queryClient.invalidateQueries({ queryKey: ["albums"] });
      },
      onError: (err) => toast.error(err.message),
    }
  );

  const {
    mutate: mutateCreateAlbumWithNewArtist,
    isLoading: isCreatingAlbumNewArtist,
  } = useMutation({
    mutationFn: createAlbumWithNewArtist,
    onSuccess: () => {
      toast.success("New album successfully created");
      queryClient.invalidateQueries({ queryKey: ["albums"] });
      queryClient.invalidateQueries({ queryKey: ["artists"] });
    },
    onError: (err) => toast.error(err.message),
  });

  const customStyles = {
    option: (provided) => ({
      ...provided,
      color: "black",
    }),
  };
  function handleSubmit(e) {
    e.preventDefault();

    if (!albumName || !artist) return;

    if (artist.__isNew__) {
      mutateCreateAlbumWithNewArtist({
        albumYear: year,
        newAlbumName: albumName,
        newArtistName: artist.value,
      });
    } else {
      mutateCreateAlbum({
        albumYear: year,
        newAlbumName: albumName,
        artistID: artist.value,
      });
    }

    setAlbumName("");
    setArtist("");
  }

  if (isCreatingAlbum || isLoadingArtists || isCreatingAlbumNewArtist)
    return <></>;

  var artistList = artists.map((artist) => ({
    label: artist.artist_name,
    value: artist.id,
  }));

  return (
    <form onSubmit={handleSubmit}>
      <h3>Add an album</h3>

      <label>Album name</label>
      <input
        type="text"
        value={albumName}
        onChange={(e) => {
          setAlbumName(e.target.value);
        }}
      ></input>
      <br />
      <label>Artist</label>
      <CreatableSelect
        value={artist}
        options={artistList}
        onChange={(opt) => setArtist(opt)}
        styles={customStyles}
      />
      <button>Add</button>
    </form>
  );
}

function Library() {
  const startYear = 2019;
  const endYear = 2024;

  // Show/hide Create Album form for each year
  const [itemsShowCreateForm, setItemsShowCreateForm] = useState(
    Array.from({ length: endYear - startYear + 1 }, (_, i) => endYear - i).map(
      (year) => ({
        year: year,
        showCreateAlbumForm: false,
      })
    )
  );

  const handleShowCreateFormToggle = (id) => {
    setItemsShowCreateForm((prevItems) =>
      prevItems.map((item) =>
        item.year === id
          ? { ...item, showCreateAlbumForm: !item.showCreateAlbumForm }
          : item
      )
    );
  };

  const queryClient = useQueryClient();

  const { isLoadingArtists, data: artists } = useQuery({
    queryKey: ["artists"],
    queryFn: getArtists,
  });

  const { isLoading: isLoadingAlbums, data: albums } = useQuery({
    queryKey: ["albums"],
    queryFn: getAlbums,
  });

  const { isLoading: isDeleting, mutate } = useMutation({
    mutationFn: deleteAlbum,
    onSuccess: () => {
      toast.success("Album successfully deleted");
      queryClient.invalidateQueries({
        queryKey: ["albums"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  if (isLoadingAlbums || isLoadingArtists || isDeleting || !artists)
    return <></>;

  return (
    <div>
      Update music library here.
      <br />
      <Link to="/">Home</Link>
      <br />
      <Link to="/library">Library</Link>
      <br />
      <br />
      {Array.from(
        { length: endYear - startYear + 1 },
        (_, i) => endYear - i
      ).map((year) => (
        <div key={year}>
          <h3>{year}</h3>

          <Sortable
            albums={albums
              .filter((x) => x.year == year)
              .sort((a, b) => a.year_rank - b.year_rank)}
            artists={artists}
          />
          {/* {albums
                .filter((x) => x.year == year)
                .sort((a, b) => a.yearRank - b.yearRank)
                .map((album) => (
                  <tr key={album.id}>
                    <td>{album.yearRank}</td>
                    <td>{album.albumName}</td>
                    <td>
                      {artists.find((x) => x.id == album.artistID)?.artistName}
                    </td>
                    <td>
                      <button onClick={() => mutate(album.id)}>Delete</button>
                    </td>
                  </tr>
                ))} */}

          <button onClick={() => handleShowCreateFormToggle(year)}>
            Add new album
          </button>
          {itemsShowCreateForm.find((x) => x.year == year)
            ?.showCreateAlbumForm && <AddAlbum year={year} />}
        </div>
      ))}
    </div>
  );
}

export default Library;
