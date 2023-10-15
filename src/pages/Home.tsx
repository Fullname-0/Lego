import {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {getMinifigs} from '../api/api.ts';
import {useAppContext} from '../store/AppContext.tsx';
import {Box, Grid, Typography, useTheme} from '@mui/material';
import Button from '../components/UI/Button.tsx';
import Heading from '../components/UI/Heading.tsx';
import Loader from '../components/UI/Loader.tsx';

const Home = () => {
  const {palette} = useTheme();
  const navigate = useNavigate();
  const { loading, step, setStep, setLoading } = useAppContext();
  const [error, setError] = useState('');

  const handleButton = async () => {
    setLoading()
    const minifigs = await getMinifigs()
      .then((res: any) => {
        return res.results
      })
      .catch((error) => {
        setError('Something went wrong! Please try again later!')
        console.error(error);
      });
    setStep(minifigs)
    navigate('/minifigs')
  }

  useEffect(() => {
    if(step === 'minifigs') navigate('/minifigs')
  }, [])

  return (
    <Grid item xs={10}
      flexDirection={'column'}
      justifyContent={'center'}
      alignItems={'center'}
      gap={'60px'}
      sx={{
        display: 'flex'
      }}
    >
      <Heading
        title={'Lego Minifigs mystery box'}
        variantSize={'h1'}
        color={palette.primary.light}
        textAlignment={'center'}
      />
      {error && <Typography mb={2} sx={{color: 'red', fontSize: '18px', textAlign: 'center'}}>
        {error}</Typography>}
      {loading && <Box sx={{position: 'relative'}} mt={'36px'}>
        <Loader />
      </Box>}
      {!loading && <Button title={"let's go!"} boxShadow={true} onClick={handleButton}></Button>}
    </Grid>
  );
}

export default Home;
