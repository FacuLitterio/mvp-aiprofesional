import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined"
import { Avatar, Button, Paper, Stack, Typography } from "@mui/material"
import { useNavigate } from "react-router-dom"

type ToolbarProps = {
  title?: string
  subtitle?: string
  icon?: React.ReactNode
  actions: React.ReactNode[]
  spacing?: number
  showBackButton?: boolean
}

const Toolbar: React.FC<ToolbarProps> = props => {
  const { title, icon, actions, spacing = 2, showBackButton = false } = props
  const navigate = useNavigate()

  const handleGoBack = () => {
    void navigate(-1)
  }

  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      spacing={spacing}
    >
      <Stack spacing={1}>
        {showBackButton && (
          <Button
            startIcon={<ArrowBackOutlinedIcon />}
            onClick={handleGoBack}
            variant="text"
            color="primary"
            size="small"
            sx={{ alignSelf: "flex-start", ml: 0.5 }}
          >
            Back
          </Button>
        )}
        <Stack direction="row" alignItems="center" spacing={1}>
          {icon && (
            <Paper variant="outlined" sx={{ bgcolor: "transparent" }}>
              <Avatar sx={{ bgcolor: "transparent", color: "text.primary" }}>
                {icon}
              </Avatar>
            </Paper>
          )}
          {title && (
            <Typography variant="h6" color="text.primary" fontSize=".95rem">
              {title}
            </Typography>
          )}
        </Stack>
      </Stack>

      <Stack direction="row" spacing={2} alignItems="center">
        {actions}
      </Stack>
    </Stack>
  )
}

export default Toolbar
