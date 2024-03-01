import { useAuth } from "@/providers/AuthProvider/useAuth";
import { ErrorOutlineRounded, LogoutRounded } from "@mui/icons-material";
import { Button, Typography, useTheme } from "@mui/material";
import { useConfirm } from "material-ui-confirm";

type Props = {};

export default function BtnLogout({}: Props) {
  const theme = useTheme();
  const confirm = useConfirm();

  const { removeAuthorizedUser } = useAuth();

  const onLogout = () => {
    confirm({
      title: (
        <Typography
          component="div"
          style={{
            display: "flex",
            alignItems: "center",
            gap: theme.spacing(1),
          }}
          variant="h6"
        >
          <ErrorOutlineRounded />
          Log out?
        </Typography>
      ),
      description: <>Are you sure you want to log out?</>,
      confirmationText: "Log out",
    })
      .then(removeAuthorizedUser)
      .catch(() => console.log("#zry564654"));
  };

  return (
    <Button
      color="error"
      fullWidth
      onClick={onLogout}
      startIcon={<LogoutRounded />}
      size="small"
    >
      Logout
    </Button>
  );
}
