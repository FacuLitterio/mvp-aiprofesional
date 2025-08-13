import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded"
import Button from "@mui/material/Button"
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import LinearProgress from "@mui/material/LinearProgress"
import Typography from "@mui/material/Typography"
import { useEffect, useState } from "react"

export default function CardAlert() {
  const [timeLeft, setTimeLeft] = useState<string>("2 days")

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => (prev === "1 day" ? "expired" : "1 day"))
    }, 86400000) // Update every 24 hours (simplified)
    return () => {
      clearInterval(timer)
    }
  }, [])

  return (
    <Card sx={{ m: 1.5, flexShrink: 0 }}>
      <CardContent>
        <AutoAwesomeRoundedIcon fontSize="small" />
        <Typography gutterBottom sx={{ fontWeight: 600 }}>
          Plan about to expire
        </Typography>
        <Typography variant="caption" sx={{ color: "text.secondary" }}>
          You’ve hit your 1-page limit. Upgrade for unlimited pages and A/B
          testing. Get 10% off today—offer ends in {timeLeft}.
        </Typography>
        <LinearProgress
          variant="determinate"
          value={0}
          color="primary"
          sx={{
            my: 1,
          }}
        />
        <Button
          variant="contained"
          color="primary"
          sx={{ textTransform: "none" }}
          disableElevation
          size="small"
          fullWidth
        >
          Upgrade Now
        </Button>
      </CardContent>
    </Card>
  )
}
