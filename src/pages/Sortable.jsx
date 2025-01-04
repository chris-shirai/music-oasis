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
import { Link } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getAlbums, updateAlbum } from "../services/apiAlbums";
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
              albumName={album.albumName}
              artistName={
                artists.find((x) => x.id == album.artistID)?.artistName
              }
              yearRank={album.yearRank}
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
        const oldRank = currAlbum.yearRank;
        const newRank = items.find((x) => x.id == over.id).yearRank;

        if (oldRank < newRank) {
          items
            .filter((x) => x.yearRank > oldRank && x.yearRank <= newRank)
            .forEach((album) => {
              mutate({
                albumid: album.id,
                albumname: album.albumName,
                yearrank: album.yearRank - 1,
              });
            });
        } else {
          items
            .filter((x) => x.yearRank < oldRank && x.yearRank >= newRank)
            .forEach((album) => {
              mutate({
                albumid: album.id,
                albumname: album.albumName,
                yearrank: album.yearRank + 1,
              });
            });
        }

        mutate({
          albumid: active.id,
          albumname: currAlbum.albumName,
          yearrank: newRank,
        });

        const oldIndex = items.indexOf(items.find((x) => x.id == active.id));
        const newIndex = items.indexOf(items.find((x) => x.id == over.id));
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  }
}
