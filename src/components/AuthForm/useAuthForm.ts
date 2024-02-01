import { routes } from "@/routes/routes";
import { useLocation } from "react-router-dom";
import { z } from "zod";
import useForm from "@/hooks/useForm";

type Params = {};

export default function useAuthForm({}: Params) {
  const location = useLocation();
  const isSignUp = location.pathname === routes.auth_signup.path;

  const schemaAuthForm = z
    .object({
      userName: z
        .string({
          required_error: "Username is required",
        })
        .min(3, { message: "Username should be of 3 characters atleast" }),
      password: z
        .string({
          required_error: "Password is required",
        })
        .min(8, { message: "Password should be of atleast 8 characters" }),
      confirmPassword: z.string(),
    })
    .superRefine((schema, ctx) => {
      if (isSignUp && schema.password !== schema.confirmPassword) {
        ctx.addIssue({
          code: "custom",
          message: "Passwords don't match",
          path: ["confirmPassword"],
        });
      }
    });

  const {
    formData,
    setFormData,
    formattedErrors,
    isSubmitDisabled,
    getSubmitHandler,
    isLoading,
  } = useForm({
    zodValidator: schemaAuthForm,
    initialData: {
      userName: "",
      password: "",
      confirmPassword: "",
    },
    showErrorSnackbarOnSubmit: true,
    successSnackbarMessage: isSignUp ? "Sign up successful" : "Logged in",
  });

  getSubmitHandler(async (_formData) => {
    const res = { isSuccess: true };

    //

    return res;
  });

  return {
    formData,
    setFormData,
    formattedErrors,
    isSubmitDisabled,
    getSubmitHandler,
    isLoading,
  };
}
