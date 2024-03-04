import { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import type { Identifier, XYCoord } from "dnd-core";

type DragItem = {
  /** unique identifier for draggable list */
  type: string;
  index: number;
};

export const useDraggableItem = ({
  dragItem,
  moveItem,
}: {
  dragItem: DragItem;
  moveItem: (fromIndex: number, toIndex: number) => void;
}) => {
  const containerRef = useRef<HTMLTableRowElement>(null);
  const handleRef = useRef<HTMLElement>(null);

  const [, drop] = useDrop<DragItem, void, { handlerId: Identifier | null }>({
    accept: dragItem.type,
    collect: (monitor) => {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(_item: DragItem, monitor) {
      if (!handleRef.current) {
        return;
      }
      const dragIndex = _item.index;
      const hoverIndex = dragItem.index;

      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }

      // Determine rectangle on screen
      const hoverBoundingRect = handleRef.current?.getBoundingClientRect();

      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      // Determine mouse position
      const clientOffset = monitor.getClientOffset();

      // Get pixels to the top
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%

      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      // Time to actually perform the action
      moveItem(dragIndex, hoverIndex);

      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      _item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag, preview] = useDrag({
    type: dragItem.type,
    item: { type: dragItem.type, index: dragItem.index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  preview(drop(containerRef));
  drag(handleRef);

  return { containerRef, handleRef, isDragging };
};
