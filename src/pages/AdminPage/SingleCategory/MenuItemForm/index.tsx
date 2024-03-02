import { TypeSetStateFunction } from "@/types";
import { TypeMenuItemFormData } from "./schemaMenuItemFormData";
import {
  FormControlLabel,
  FormLabel,
  Grid,
  InputAdornment,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import { ZodError } from "zod";
import FormFieldError from "@/components/FormFieldError";

type Props = {
  formData: TypeMenuItemFormData;
  setFormData: TypeSetStateFunction<TypeMenuItemFormData>;
  errors: ZodError<TypeMenuItemFormData> | undefined;
};

export default function MenuItemForm({ errors, formData, setFormData }: Props) {
  const formattedErrors = errors?.format();

  const isPriceBasedOnAvailability = formData.price === null;

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <TextField
          autoFocus
          name="menu-item-name"
          label="Name"
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, menuItemName: e.target.value }))
          }
          value={formData.menuItemName}
        />

        <FormFieldError fieldErrors={formattedErrors?.menuItemName} />
      </Grid>

      <Grid item xs={12}>
        <TextField
          name="menu-item-description"
          label="Description"
          multiline
          minRows={3}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, description: e.target.value }))
          }
          value={formData.description}
        />

        <FormFieldError fieldErrors={formattedErrors?.description} />
      </Grid>

      <Grid item xs={12}>
        <FormLabel id="price-radio-buttons">Price</FormLabel>

        <RadioGroup
          row
          aria-labelledby="price-radio-buttons"
          name="row-radio-buttons-group"
        >
          <FormControlLabel
            checked={isPriceBasedOnAvailability}
            control={<Radio />}
            label="Based on availability"
            onClick={() => setFormData((prev) => ({ ...prev, price: null }))}
          />
          <FormControlLabel
            checked={!isPriceBasedOnAvailability}
            control={<Radio />}
            label="Custom price"
            onClick={() => setFormData((prev) => ({ ...prev, price: 1 }))}
          />
        </RadioGroup>

        {isPriceBasedOnAvailability ? null : (
          <TextField
            name="menu-item-price"
            type="number"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">₹</InputAdornment>
              ),
            }}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                price: isNaN(Number(e.target.value))
                  ? 0
                  : Number(e.target.value),
              }))
            }
            sx={{ mt: 1 }}
            value={formData.price}
          />
        )}

        <FormFieldError fieldErrors={formattedErrors?.price} />
      </Grid>
    </Grid>
  );
}
