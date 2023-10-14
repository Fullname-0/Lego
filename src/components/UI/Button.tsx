import {Box, useTheme} from '@mui/material';

type Props = {
  disabled?: string,
  title: string,
  boxShadow: boolean,
  onClick?: () => void,
}

const Button = ({disabled, title, boxShadow, onClick}: Props) => {
  const {palette} = useTheme();

  return (
    <Box component={'button'} disabled={disabled ? true : false} onClick={onClick} sx={{
      fontFamily: 'Onest',
      fontWeight: 600,
      backgroundColor: palette.secondary.main,
      borderRadius: '28px',
      padding: '12px',
      color: palette.primary.light,
      outline: 'none',
      border: 'none',
      minWidth: '260px',
      cursor: 'pointer',
      textTransform: 'uppercase',
      lineHeight: 'unset',
      boxShadow: boxShadow ? '0px 5px 5px 0px rgba(0, 0, 0, 1)' : '',
      transition: 'background-color .4s ease',
      '&:hover': {
        backgroundColor: '#036fba',
      },
      '&:active': {
        boxShadow: 'none',
      }
    }}>
      {title}
    </Box>
  )
}

export default Button
