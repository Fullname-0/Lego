import {Typography} from "@mui/material";

type Props = {
  title: string;
}

const HeadingCard = ({title}: Props) => {
  return (
    <Typography variant={'h5'} sx={{textAlign: 'center'}}>{title}</Typography>
  )
}

export default HeadingCard;
