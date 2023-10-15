import {Box, useTheme} from "@mui/material";

type Props = {
  title: string;
  href: string;
}

const DetailsButtonCard = ({title, href}: Props) => {
  const {palette} = useTheme()

  return (
    <Box component={'a'} href={href} target={'_blank'} onClick={(e) => e.stopPropagation()} sx={{
      fontFamily: 'Onest',
      fontWeight: 600,
      textDecoration: 'none',
      position: 'relative',
      color: palette.secondary.light,
      zIndex: 2,
      fontSize: '16px',
      '&:after': {
        content: '""',
        position: 'absolute',
        bottom: 0,
        left: 0,
        height: '2px',
        width: 0,
        backgroundColor: palette.secondary.light,
        transition: 'all .4s ease',
      },
      '&:hover:after': {
        width: '100%'
      }
    }}>

        {title}

    </Box>
  )
}

export default DetailsButtonCard
