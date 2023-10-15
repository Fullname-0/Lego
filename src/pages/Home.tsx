import {useNavigate} from 'react-router-dom';
import {Grid, useTheme} from '@mui/material';
import Button from '../components/UI/Button.tsx';
import Heading from '../components/UI/Heading.tsx';

const Home = () => {
  const {palette} = useTheme();
  const navigate = useNavigate();

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
      <Button title={"let's go!"} boxShadow={true} onClick={() => navigate('/minifigs', {state: {active: true}})}></Button>
    </Grid>
  );
}

export default Home;
