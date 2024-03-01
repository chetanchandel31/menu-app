import useForm from "@/hooks/useForm";
import { useAuth } from "@/providers/AuthProvider/useAuth";
import { useSnackbar } from "notistack";
import { z } from "zod";

type Params = {};

const schemaLoginForm = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .email({ message: "Invalid email" }),
  password: z
    .string({
      required_error: "Password is required",
    })
    .min(8, { message: "Password should be of atleast 8 characters" }),
});

export default function useLoginForm({}: Params) {
  const snackbar = useSnackbar();
  const {
    formData,
    setFormData,
    formattedErrors,
    isSubmitDisabled,
    isLoading,
    getSubmitHandler,
  } = useForm({
    zodValidator: schemaLoginForm,
    initialData: {
      email: "",
      password: "",
    },
    showErrorSnackbarOnSubmit: true,
  });

  const auth = useAuth();

  function mockApiCall(_formData: typeof formData) {
    return new Promise<{
      accessToken: string;
      accessTokenExpiresAt: number;
    }>((resolve, _reject) => {
      setTimeout(() => {
        resolve({
          accessToken: "hard-coded-access-token",
          accessTokenExpiresAt: (Date.now() + 1000 * 60 * 60 * 6) / 1000, // i.e. 6 hours from now
        });
      }, 1000);
    });
  }

  const onSubmit = getSubmitHandler(async (_formData) => {
    const result = { isSuccess: true };

    try {
      // send _formData to backend
      const { accessToken, accessTokenExpiresAt } = await mockApiCall(
        _formData
      );
      // received accessToken stored to browser
      auth.setAuthorizedUser({
        accessToken,
        accessTokenExpiresAt,
      });
      snackbar.enqueueSnackbar("Welcome back 🎉", { variant: "success" });
    } catch (e) {
      console.log(e, "#uiy839474389");
      result.isSuccess = false;
    }

    return result;
  });

  return {
    formData,
    setFormData,
    formattedErrors,
    isSubmitDisabled,
    onSubmit,
    isLoading,
  };
}
