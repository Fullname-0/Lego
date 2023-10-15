import {Box, Grid, useTheme} from '@mui/material';
import {Outlet} from 'react-router-dom';
import questionMark from '../assets/icons/questionMark.svg';

const MainLayout = () => {
  const theme = useTheme();

  return (
    <>
      <Grid container
        justifyContent={'center'}
        alignItems={'center'}
        component={"main"}
        sx={{
          position: 'relative',
          minHeight: '100vh',
          width: '100%',
          backgroundColor: theme.palette.primary.main,
          overflow: 'hidden',
          zIndex: '1',
          padding: {xs: '40px 20px', md: '40px'}
        }}>
        <Box component={'img'} src={questionMark} sx={{
          position: 'absolute',
          height: '200px',
          width: '150px',
          top: '10%',
          left: '10%',
          objectFit: 'cover',
          zIndex: '-1'
        }} />
        <Box component={'img'} src={questionMark} sx={{
          position: 'absolute',
          height: '450px',
          width: '380px',
          bottom: '-5%',
          right: '-5%',
          objectFit: 'cover',
          transform: 'rotate(70deg)',
          zIndex: '-1'
        }} />
        <Outlet />
      </Grid>
    </>
  );
}

export default MainLayout;
