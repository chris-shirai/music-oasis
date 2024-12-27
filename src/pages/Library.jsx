import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { deleteAlbum, getAlbums } from "../services/apiAlbums";

function Library() {
  const queryClient = useQueryClient();

  const { isLoading: isLoadingAlbums, data: albums } = useQuery({
    queryKey: ["albums"],
    queryFn: getAlbums,
  });

  const { isLoading: isDeleting, mutate } = useMutation({
    mutationFn: deleteAlbum,
    onSuccess: () => {
      // alert("Album successfully deleted");
      queryClient.invalidateQueries({
        queryKey: ["albums"],
      });
    },
    onError: (err) => alert(err.message),
  });

  if (isLoadingAlbums || isDeleting) return <></>;

  return (
    <div>
      Update music library here.
      <br />
      <Link to="/">Home</Link>
      <br />
      <ul>
        {albums.map((album) => (
          <li key={album.id}>
            <label>{album.albumName}</label>
            <button onClick={() => mutate(album.id)}>Delete</button>
          </li>
        ))}
      </ul>
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
