import { useEffect, useState } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { SortableItem } from "../controls/SortableItem";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateAlbum } from "../services/apiAlbums";
import toast from "react-hot-toast";

export function Sortable({ albums, artists }) {
  const [albumsWorkingCopy, setAlbums] = useState(albums);

  useEffect(() => {
    setAlbums(albums);
  }, [albums]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const queryClient = useQueryClient();

  const { isLoading: isUpdating, mutate } = useMutation({
    mutationFn: updateAlbum,
    onSuccess: () => {
      toast.success("Album successfully updated");
      queryClient.invalidateQueries({
        queryKey: ["albums"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  if (isUpdating || albumsWorkingCopy == null) return <></>;

  return (
    <>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={albumsWorkingCopy}
          strategy={verticalListSortingStrategy}
        >
          {albumsWorkingCopy.map((album) => (
            <SortableItem
              key={album.id}
              id={album.id}
              albumName={album.album_name}
              artistName={
                artists.find((x) => x.id == album.artist_id)?.artist_name
              }
              yearRank={album.year_rank}
            />
          ))}
        </SortableContext>
      </DndContext>
    </>
  );

  function handleDragEnd(event) {
    const { active, over } = event;

    if (active.id !== over.id) {
      setAlbums((items) => {
        const currAlbum = items.find((x) => x.id == active.id);
        const oldRank = currAlbum.year_rank;
        const newRank = items.find((x) => x.id == over.id).year_rank;

        if (oldRank < newRank) {
          items
            .filter((x) => x.year_rank > oldRank && x.year_rank <= newRank)
            .forEach((album) => {
              mutate({
                albumID: album.id,
                albumName: album.album_name,
                yearRank: album.year_rank - 1,
              });
            });
        } else {
          items
            .filter((x) => x.year_rank < oldRank && x.year_rank >= newRank)
            .forEach((album) => {
              mutate({
                albumID: album.id,
                albumName: album.album_name,
                yearRank: album.year_rank + 1,
              });
            });
        }

        mutate({
          albumID: active.id,
          albumName: currAlbum.album_name,
          yearRank: newRank,
        });

        const oldIndex = items.indexOf(items.find((x) => x.id == active.id));
        const newIndex = items.indexOf(items.find((x) => x.id == over.id));
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  }
}
