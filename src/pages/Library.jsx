import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import {
  createAlbumWithNewArtist,
  createAlbum,
  deleteAlbum,
  getAlbums,
} from "../services/apiAlbums";
import { getArtists } from "../services/apiArtists";
import toast from "react-hot-toast";
import { useState } from "react";
import CreatableSelect from "react-select/creatable";

function AddAlbum() {
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
        albumname: albumName,
        artistname: artist.value,
        year: 2020,
      });
    } else {
      mutateCreateAlbum({
        albumName: albumName,
        year: 2020,
        artistID: artist.value,
      });
    }

    setAlbumName("");
    setArtist("");
  }

  if (isCreatingAlbum || isLoadingArtists || isCreatingAlbumNewArtist)
    return <></>;

  var artistList = artists.map((artist) => ({
    label: artist.artistName,
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
      <table>
        <tbody>
          {albums.map((album) => (
            <tr key={album.id}>
              <td>{album.albumName}</td>
              <td>{artists.find((x) => x.id == album.artistID)?.artistName}</td>
              <td>
                <button onClick={() => mutate(album.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <AddAlbum />
    </div>
  );
}

export default Library;
