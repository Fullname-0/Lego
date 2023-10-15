import {Grid, Box, Typography, useTheme} from '@mui/material';
import {useEffect, useState} from 'react';
import Heading from '../components/UI/Heading.tsx';
import MinifigCard from '../components/MinifigCard.tsx';
import Button from '../components/UI/Button.tsx';
import {useNavigate} from 'react-router-dom';
import {getMinifigs} from "../api/api.ts";
import Loader from "../components/UI/Loader.tsx";

const randomArray = () => {
  return 0.5 - Math.random();
}

const MinifigsPage = () => {
  const {palette} = useTheme();
  const navigate = useNavigate();
  const [active, setActive] = useState(-1);
  const [selected, setSelected] = useState(true);
  const [minifigs, setMinifigs] = useState([]);
  const [error, setError] = useState('');

  const handleButton = () => {
    active >= 0 ? navigate(
      '/minifigs/' + minifigs[active].set_num,
      {
        state: {
          title: minifigs[active].name,
          idMinifig: minifigs[active].set_num,
          imgMinifig: minifigs[active].set_img_url,
        }
     }
    ) : setSelected(false)
  }

  useEffect(() => {
    if(minifigs.length == 0) {
      getMinifigs()
        .then((res: any) => {
          const minifigsResult = res.results.sort(randomArray).slice(0, 3)
          setMinifigs(minifigsResult)
        })
        .catch((error) => {
          console.error(error);
          setError('Something went wrong! Please try again later.')
        });
    }
  }, [])

  useEffect(() => {
    active >= 0 && setSelected(true)
  }, [active])

  return (
    <Grid item xs={11} md={10} sx={{
      display: 'flex',
      flexDirection: 'column',
      gap: '80px',
      alignItems: 'center',
    }}>
      <Heading
        title={'Choose your minifig'}
        variantSize={'h2'}
        color={palette.primary.light}
        textAlignment={'center'}
      />
      <Box sx={{
        display: 'flex',
        gap: '40px',
        justifyContent: 'center',
        flexWrap: 'wrap',
      }}>
        {minifigs.length > 1 ? minifigs.map((item, index) => {
          return <MinifigCard active={active} index={index} item={item} onSetActive={setActive} key={index} />
        }) : <Box sx={{position: 'relative', width: '100%'}} ml={3}><Loader /></Box>}
      </Box>
      <Box>
        {error && <Typography mb={2} sx={{color: 'red', fontSize: '18px', textAlign: 'center'}}>
          {error}</Typography>}
        {!selected && <Typography mb={2} sx={{color: 'red', fontSize: '18px', textAlign: 'center'}}>
          Please choose one of minifigs</Typography>}
        <Button title={"proceed to shipment"} boxShadow={true} onClick={handleButton}></Button>
      </Box>
    </Grid>
  )
}


export default MinifigsPage
