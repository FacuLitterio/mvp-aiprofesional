import { Button } from "@mui/material"
import GithubLogo from "common/assets/github-icon.svg"
import { ROOT_PATH } from "common/routes"
import { useNavigate } from "react-router-dom"

const GithubButton: React.FC = () => {
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
          src={GithubLogo}
          alt="Github Logo"
          style={{ width: 18, height: 18 }}
        />
      }
    >
      Ingresar con GitHub
    </Button>
  )
}

export default GithubButton
