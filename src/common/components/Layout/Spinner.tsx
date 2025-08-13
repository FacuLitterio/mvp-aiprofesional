import {
  CircularProgress,
  type CircularProgressProps,
  Stack,
  Typography,
} from "@mui/material"

type SpinnerProps = { title?: string } & CircularProgressProps

const Spinner: React.FC<SpinnerProps> = props => {
  return (
    <Stack
      spacing={2}
      sx={{
        height: 1,
        width: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CircularProgress {...props} />
      {props.title && (
        <Typography variant="subtitle2" color="primary.main">
          {props.title}
        </Typography>
      )}
    </Stack>
  )
}

export default Spinner
