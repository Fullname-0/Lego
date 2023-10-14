import {Box, useTheme} from '@mui/material';
import HeadingCard from './UI/HeadingCard.tsx';
import DetailsButtonCard from './UI/DetailsButtonCard.tsx';

type Props = {
  active: number;
  index: number;
  item: any;
  onSetActive: any;
}

const MinifigCard = ({active, index, item, onSetActive}: Props) => {
  const {palette} = useTheme();

  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      alignItems: 'center',
      flex: {xs: '1 0 100%', sm: '0 0 40%', lg: '0 0 30%'},
      padding: '40px 20px',
      gap: '20px',
      backgroundColor: palette.primary.light,
      borderRadius: '18px',
      cursor: 'pointer',
      boxShadow: active === index ? '0px 0px 10px 12px rgba(251, 136, 43, 1)' : 'none',
      transition: 'all .4s ease',
      zIndex: 1,
    }} onClick={() => onSetActive(index)}>
      <Box component={'img'} src={item.set_img_url} sx={{
        height: '150px',
        objectFit: 'cover'
      }} />
      <HeadingCard title={item.name} />
      <DetailsButtonCard title={'Show details'} href={item.set_url} />
    </Box>
  )
}

export default MinifigCard
