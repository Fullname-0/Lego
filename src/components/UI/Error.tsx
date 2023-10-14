import {Box, styled} from "@mui/material";

const Loading = styled(Box)(() => ({
  display: 'inline-block',
  position: 'relative',
  width: '120px',
  height: '120px',

  '@keyframes ripple': {
    '0%': {
      top: '50px',
      left: '50px',
      width: 0,
      height: 0,
      opacity: 0,
    },
    '4.9%': {
      top: '50px',
      left: '50px',
      width: 0,
      height: 0,
      opacity: 0,
    },
    '5%': {
      top: '50px',
      left: '50px',
      width: 0,
      height: 0,
      opacity: 1,
    },
    '100%': {
      top: 0,
      left: 0,
      width: '100px',
      height: '100px',
      opacity: 0,
    }
  }
}));

const Error = () => {
  return (
    <Box sx={{position: 'absolute', top: '55%', left: '60%', transform: 'translate(-50%,-50%)', zIndex: 101}}>
      <Loading>
        <Box sx={{
          position: 'absolute',
          border: '4px solid red',
          opacity: 1,
          borderRadius: '50%',
          animation: 'ripple 1s cubic-bezier(0, 0.2, 0.8, 1) infinite',
        }} />
        <Box sx={{
          position: 'absolute',
          border: '4px solid red',
          opacity: 1,
          borderRadius: '50%',
          animation: 'ripple 1s cubic-bezier(0, 0.2, 0.8, 1) infinite',
          animationDelay: '-0.5s',
        }} />
      </Loading>
    </Box>
  )
}

export default Error;
