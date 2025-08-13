import { TextField, type TextFieldProps } from "@mui/material"
import { forwardRef } from "react"
import { NumericFormat, type NumericFormatProps } from "react-number-format"

// Interfaz para las props de nuestro componente
type CurrencyInputProps = {
  onChange: (value: string) => void
  value: string | number
  prefix?: string
  decimalScale?: number
  thousandSeparator?: string
  decimalSeparator?: string
  textFieldProps?: Omit<TextFieldProps, "onChange" | "value" | "inputProps">
}

// Componente de formato numérico personalizado para TextField
const NumericFormatCustom = forwardRef<
  NumericFormatProps,
  {
    onChange: (event: { target: { name: string; value: string } }) => void
    name: string
    prefix?: string
    decimalScale?: number
    thousandSeparator?: string
    decimalSeparator?: string
  }
>((props, ref) => {
  const {
    onChange,
    name,
    prefix = "",
    decimalScale = 2,
    thousandSeparator = ",",
    decimalSeparator = ".",
    ...other
  } = props

  return (
    <NumericFormat
      {...other}
      getInputRef={ref}
      onValueChange={(values: { value: string }) => {
        onChange({
          target: {
            name,
            value: values.value,
          },
        })
      }}
      thousandSeparator={thousandSeparator}
      decimalSeparator={decimalSeparator}
      decimalScale={decimalScale}
      prefix={prefix}
      allowNegative={false}
      valueIsNumericString
    />
  )
})

// Componente principal CurrencyInput
const CurrencyInput: React.FC<CurrencyInputProps> = ({
  onChange,
  value,
  prefix = "",
  decimalScale = 2,
  thousandSeparator = ",",
  decimalSeparator = ".",
  textFieldProps = {},
}) => {
  const handleChange = (event: { target: { value: string } }) => {
    onChange(event.target.value)
  }

  return (
    <TextField
      {...textFieldProps}
      value={value}
      onChange={handleChange}
      slotProps={{
        input: {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-explicit-any
          inputComponent: NumericFormatCustom as any,
          inputProps: {
            prefix,
            decimalScale,
            thousandSeparator,
            decimalSeparator,
          },
        },
      }}
    />
  )
}

export default CurrencyInput
