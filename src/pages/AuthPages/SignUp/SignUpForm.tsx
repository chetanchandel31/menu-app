import PasswordTextfield from "@/components/PasswordTextfield";
import { LoadingButton } from "@mui/lab";
import { Box, Grid, TextField } from "@mui/material";
import useSignUpForm from "./useSignUpForm";
import FormFieldError from "@/components/FormFieldError";

type Props = {};

export default function SignUpForm({}: Props) {
  const {
    formData,
    setFormData,
    isSubmitDisabled,
    formattedErrors,
    isLoading,
    onSubmit,
  } = useSignUpForm({});

  return (
    <Box
      component="form"
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
              <TextField
                fullWidth
                name="name"
                label="Username"
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, name: e.target.value }))
                }
                value={formData.name}
              />

              <FormFieldError fieldErrors={formattedErrors?.name} />
            </Grid>

            <Grid item xs={12}>
              <PasswordTextfield
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, password: e.target.value }))
                }
                value={formData.password}
              />

              <FormFieldError fieldErrors={formattedErrors?.password} />
            </Grid>

            <Grid item xs={12}>
              <PasswordTextfield
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    confirmPassword: e.target.value,
                  }))
                }
                value={formData.confirmPassword}
                textFieldProps={{
                  label: "Confirm password",
                }}
              />

              <FormFieldError fieldErrors={formattedErrors?.confirmPassword} />
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
            Continue
          </LoadingButton>
        </Grid>
      </Grid>
    </Box>
  );
}
