import { useCategories } from "@/providers/CategoriesProvider/useCategories";
import { DragIndicatorRounded } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import React from "react";

type Props = {
  handleRef: React.RefObject<HTMLElement>;
};

export default function DragHandleCategory({ handleRef }: Props) {
  const { categories } = useCategories();
  const isLastRemainingListItem = categories.length <= 1;

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
