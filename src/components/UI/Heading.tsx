import {Typography} from "@mui/material";

type Props = {
  title: string,
  variantSize: string,
  color?: string,
  textAlignment?: string,
}

const Heading = ({title, variantSize, color, textAlignment}: Props) => {
  return (
    <Typography variant={variantSize} sx={{
      textAlign: textAlignment
    }} color={color}>{title}</Typography>
  )
}

export default Heading
