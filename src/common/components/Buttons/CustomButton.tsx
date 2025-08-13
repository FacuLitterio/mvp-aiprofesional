/* eslint-disable @typescript-eslint/no-misused-spread */
import { Button, type ButtonProps } from "@mui/material"

const CustomButton: React.FC<ButtonProps> = props => {
  const { sx, children, ...otherProps } = props
  return (
    <Button
      variant="contained"
      size="small"
      sx={{ textTransform: "none", ...sx }}
      {...otherProps}
    >
      {children}
    </Button>
  )
}

export default CustomButton
