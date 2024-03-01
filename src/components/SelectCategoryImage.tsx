import { CATEGORY_IMAGES } from "@/providers/CategoriesProvider/categories";
import { TextField } from "@mui/material";
import { sentenceCase } from "change-case";

type Props = {
  onChange: (value: string) => void;
  value: string;
};

export default function SelectCategoryImage({ onChange, value }: Props) {
  const options: React.ReactNode[] = [];

  Object.entries(CATEGORY_IMAGES).forEach(([key, value]) => {
    options.push(
      <option key={key} value={value}>
        {sentenceCase(key || "")}
      </option>
    );
  });

  return (
    <TextField
      label="Select category image"
      select
      SelectProps={{
        native: true,
      }}
      onChange={(e) => onChange(e.target.value)}
      value={value}
    >
      <option disabled value={""}></option>
      {options}
    </TextField>
  );
}
