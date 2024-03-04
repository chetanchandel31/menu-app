import { DragIndicatorRounded } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import React from "react";

type Props = {
  handleRef: React.RefObject<HTMLElement>;
  totalMenuItemsInCategory: number;
};

export default function DragHandleMenuItem({
  handleRef,
  totalMenuItemsInCategory,
}: Props) {
  const isLastRemainingListItem = totalMenuItemsInCategory <= 1;

  return (
    <span
      ref={handleRef}
      style={{
        cursor: isLastRemainingListItem ? undefined : "grab",
      }}
    >
      <IconButton
        disabled={isLastRemainingListItem}
        size="small"
        style={{ cursor: "grab" }}
      >
        <DragIndicatorRounded />
      </IconButton>
    </span>
  );
}
