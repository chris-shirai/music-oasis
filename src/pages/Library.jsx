import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { createAlbum, deleteAlbum, getAlbums } from "../services/apiAlbums";
import { getArtists } from "../services/apiArtists";
import toast from "react-hot-toast";
import { useState } from "react";

function AddAlbum() {
  const [albumName, setAlbumName] = useState("test");

  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation({
    mutationFn: createAlbum,
    onSuccess: () => {
      toast.success("New album successfully created");
      queryClient.invalidateQueries({ queryKey: ["albums"] });
    },
    onError: (err) => toast.error(err.message),
  });

  function handleSubmit(e) {
    e.preventDefault();

    if (!albumName) return;

    const newAlbum = {
      albumName: albumName,
      year: 2020,
      artistID: 2,
    };

    mutate(newAlbum);

    setAlbumName("");
  }

  if (isLoading) return <></>;

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

  if (isLoadingAlbums || isLoadingArtists || isDeleting) return <></>;

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
              <td>{artists.find((x) => x.id == album.artistID).artistName}</td>
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
