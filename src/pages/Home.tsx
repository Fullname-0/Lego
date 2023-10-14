import {useNavigate} from "react-router-dom";
import {useAppContext} from "../store/AppContext.tsx";
import {Box, Grid, useTheme} from "@mui/material";
import Button from "../components/UI/Button.tsx";
import Heading from "../components/UI/Heading.tsx";
import Loader from "../components/UI/Loader.tsx";
import {getMinifigs} from "../api/api.ts";
import {useEffect} from "react";

const Home = () => {
  const {palette} = useTheme();
  const navigate = useNavigate();
  const { loading, step, setStep, setLoading } = useAppContext();

  const handleButton = async () => {
    setLoading()
    const minifigs = await getMinifigs()
      .then((res: any) => {
        return res.results
      })
      .catch((error) => {
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
      {loading && <Box sx={{position: 'relative'}} mt={'36px'}>
        <Loader />
      </Box>}
      {!loading && <Button title={"let's go!"} boxShadow={true} onClick={handleButton}></Button>}
    </Grid>
  );
}

export default Home;
