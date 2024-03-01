import PasswordTextfield from "@/components/PasswordTextfield";
import { LoadingButton } from "@mui/lab";
import { Grid, TextField } from "@mui/material";
import useLoginForm from "./useLogInForm";
import FormFieldError from "@/components/FormFieldError";

type Props = {};

export default function LogInForm({}: Props) {
  const {
    formData,
    setFormData,
    isSubmitDisabled,
    formattedErrors,
    isLoading,
    onSubmit,
  } = useLoginForm({});

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
    >
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                autoFocus
                fullWidth
                name="email"
                label="Email"
                type="email"
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, email: e.target.value }))
                }
                value={formData.email}
              />

              <FormFieldError fieldErrors={formattedErrors?.email} />
            </Grid>

            <Grid item xs={12}>
              <PasswordTextfield
                onChange={(e) => {
                  setFormData((prev) => ({
                    ...prev,
                    password: e.target.value,
                  }));
                }}
                value={formData.password}
              />

              <FormFieldError fieldErrors={formattedErrors?.password} />
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <LoadingButton
            fullWidth
            type="submit"
            disabled={isSubmitDisabled}
            loading={isLoading}
            variant="contained"
          >
            Log In
          </LoadingButton>
        </Grid>
      </Grid>
    </form>
  );
}
