import {Grid, Box, Typography, useTheme} from "@mui/material";
import {useEffect, useState} from "react";
import {useAppContext} from "../store/AppContext.tsx";
import Heading from "../components/UI/Heading.tsx";
import MinifigCard from "../components/MinifigCard.tsx";
import Button from "../components/UI/Button.tsx";
import {useNavigate} from "react-router-dom";

const MinifigsPage = () => {
  const {palette} = useTheme();
  const { setFinal } = useAppContext();
  const {minifigs} = useAppContext();
  const navigate = useNavigate();
  const [active, setActive] = useState(-1);
  const [selected, setSelected] = useState(true);
  console.log(minifigs)

  const handleButton = () => {
    if(active >= 0) {
      setFinal(minifigs[active]?.set_num)
      navigate('/form')
    } else {
      setSelected(false)
    }
  }

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
        {minifigs.map((item, index) => {
          return <MinifigCard active={active} index={index} item={item} onSetActive={setActive} key={index} />
        })}
      </Box>
      <Box>
        {!selected && <Typography mb={2} sx={{color: 'red', fontSize: '18px', textAlign: 'center'}}>
          Please choose one of minifigs</Typography>}
        <Button title={"proceed to shipment"} boxShadow={true} onClick={handleButton}></Button>
      </Box>
    </Grid>
  )
}


export default MinifigsPage
