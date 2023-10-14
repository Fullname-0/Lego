import {Grid} from "@mui/material";
import {useNavigate} from "react-router-dom";
import Button from "../components/UI/Button.tsx";
import Heading from "../components/UI/Heading.tsx";

const PageNotFound = () => {
  const navigate = useNavigate();

  return (
    <Grid item sx={{
      display: 'flex',
      gap: '60px',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column'
    }}>
      <Heading variantSize={'h1'} title={'Page not found'} color={'white'} />
      <Button title={"Go back"} boxShadow={true} onClick={() => navigate(-1)}></Button>
    </Grid>
  );
}

export default PageNotFound;
