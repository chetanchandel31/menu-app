import { AddRounded } from "@mui/icons-material";
import { Button } from "@mui/material";
import { useState } from "react";
import DialogCategoryCreate from "./DialogCategoryCreate";

type Props = {};

export default function CategoryCreate({}: Props) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        startIcon={<AddRounded />}
        variant="contained"
      >
        Create category
      </Button>

      {isOpen ? (
        <DialogCategoryCreate onClose={() => setIsOpen(false)} />
      ) : null}
    </>
  );
}
