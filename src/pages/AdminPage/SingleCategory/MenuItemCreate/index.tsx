import { AddRounded } from "@mui/icons-material";
import { Button } from "@mui/material";
import { useState } from "react";
import DialogMenuItemCreate from "./DialogMenuItemCreate";
import { TypeCategory } from "@/providers/CategoriesProvider/categories";

type Props = { category: TypeCategory };

export default function MenuItemCreate({ category }: Props) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <>
      <Button
        onClick={() => setIsDialogOpen(true)}
        startIcon={<AddRounded />}
        size="small"
        variant="contained"
      >
        Add menu item
      </Button>

      {isDialogOpen ? (
        <DialogMenuItemCreate
          category={category}
          onClose={() => setIsDialogOpen(false)}
        />
      ) : null}
    </>
  );
}
