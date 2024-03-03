import useForm from "@/hooks/useForm";
import { useAuth } from "@/providers/AuthProvider/useAuth";
import { useSnackbar } from "notistack";
import { z } from "zod";
import { getAuthEmailSessionStorage } from "../helpers/emailFromSessionStorage";

type Params = {};

const schemaSignupForm = z
  .object({
    name: z
      .string({
        required_error: "Username is required",
      })
      .min(3, { message: "Username should be of 3 characters atleast" }),
    email: z
      .string({ required_error: "Email is required" })
      .email({ message: "Invalid email" }),
    password: z
      .string({
        required_error: "Password is required",
      })
      .min(8, { message: "Password should be of atleast 8 characters" }),
    confirmPassword: z.string(),
  })
  .superRefine((schema, ctx) => {
    if (schema.password !== schema.confirmPassword) {
      ctx.addIssue({
        code: "custom",
        message: "Passwords don't match",
        path: ["confirmPassword"],
      });
    }
  });

export default function useSignUpForm({}: Params) {
  const snackbar = useSnackbar();
  const {
    formData,
    setFormData,
    formattedErrors,
    isSubmitDisabled,
    isLoading,
    getSubmitHandler,
  } = useForm({
    zodValidator: schemaSignupForm,
    initialData: {
      email: getAuthEmailSessionStorage(),
      name: "",
      password: "",
      confirmPassword: "",
    },
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
      // receive accessToken to store in browser
      auth.setAuthorizedUser({
        accessToken,
        accessTokenExpiresAt,
      });
      snackbar.enqueueSnackbar("Sign up successful", { variant: "success" });
    } catch (e) {
      console.log(e, "#mgy3464387687");
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
