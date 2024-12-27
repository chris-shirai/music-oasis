import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { deleteAlbum, getAlbums } from "../services/apiAlbums";
import { getArtists } from "../services/apiArtists";
import toast from "react-hot-toast";

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
      {/* <h2>2023</h2>
      <label>Album</label>
      <input type="text" />
      <br />
      <label>Artist</label>
      <input type="text" />
      <br />
      <br />
      <button>Save</button> */}
    </div>
  );
}

export default Library;
