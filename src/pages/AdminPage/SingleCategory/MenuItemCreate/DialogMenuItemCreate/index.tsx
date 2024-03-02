import useForm from "@/hooks/useForm";
import { Button, Dialog, DialogContent, Grid, Typography } from "@mui/material";
import { schemaMenuItemFormData } from "../MenuItemForm/schemaMenuItemFormData";
import MenuItemForm from "../MenuItemForm";

type Props = {
  onClose: () => void;
};

export default function DialogMenuItemCreate({ onClose }: Props) {
  const { formData, setFormData, getSubmitHandler, errors } = useForm({
    zodValidator: schemaMenuItemFormData,
    initialData: {
      description: "",
      menuItemName: "",
      price: null,
    },
  });

  const onSubmit = getSubmitHandler(async (_formData) => {
    return { isSuccess: true };
  });

  return (
    <Dialog open={true} onClose={onClose}>
      <DialogContent>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit();
          }}
        >
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography fontWeight={700} variant="h6">
                Add menu item
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <MenuItemForm
                formData={formData}
                setFormData={setFormData}
                errors={errors}
              />
            </Grid>

            <Grid item xs={12}>
              <Grid
                container
                spacing={1}
                justifyContent={"space-between"}
                alignItems={"center"}
              >
                <Grid item>
                  <Button color="error" onClick={onClose}>
                    Cancel
                  </Button>
                </Grid>

                <Grid item>
                  <Button
                    type="submit"
                    sx={{ minWidth: 120 }}
                    variant="contained"
                  >
                    Add
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </DialogContent>
    </Dialog>
  );
}
