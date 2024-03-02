import { AddRounded } from "@mui/icons-material";
import { Button } from "@mui/material";
import { useState } from "react";
import DialogMenuItemCreate from "./DialogMenuItemCreate";

type Props = {};

export default function MenuItemCreate({}: Props) {
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
        <DialogMenuItemCreate onClose={() => setIsDialogOpen(false)} />
      ) : null}
    </>
  );
}
