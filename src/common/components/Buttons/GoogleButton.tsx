import { Button } from "@mui/material"
import GoogleLogo from "common/assets/google-icon-logo.svg"
import { ROOT_PATH } from "common/routes"
import { useNavigate } from "react-router-dom"

const GoogleButton: React.FC = () => {
  const navigate = useNavigate()
  return (
    <Button
      variant="contained"
      color="secondary"
      fullWidth
      disableElevation
      sx={{
        textTransform: "none",
      }}
      onClick={() => {
        void navigate(ROOT_PATH)
      }}
      startIcon={
        <img
          src={GoogleLogo}
          alt="Google Logo"
          style={{ width: 18, height: 18 }}
        />
      }
    >
      Ingresar con Google
    </Button>
  )
}

export default GoogleButton
