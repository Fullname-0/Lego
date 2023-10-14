import {Box, Typography, useTheme} from '@mui/material';
import {useEffect, useState} from 'react';
import {useAppContext} from '../store/AppContext.tsx';
import Heading from './UI/Heading.tsx';
import Button from './UI/Button.tsx';
import Loader from '../components/UI/Loader.tsx';
import {getMinifig} from "../api/api.ts";

type Props = {
  error: string;
  success: string;
  loadingForm: boolean;
  item: any;
  onActionSend: () => void;
}

const MinifigDetails = ({error, success, loadingForm, item, onActionSend}: Props) => {
  const {palette} = useTheme()
  const { loading, setLoading, stopLoading } = useAppContext();
  const [minifig, setMinifig] = useState();

  useEffect(() => {
    if(!minifig) {
      setLoading()
      const fetchParts = async () => {
        const data = await getMinifig(item[0].set_num)
          .then((res: any) => {
            console.log(res)
            return res
          })
          .catch((error) => {
            console.error(error);
          });
        setMinifig(data)
        stopLoading()
      }
      fetchParts()
    }
  }, [item])

  const cutText = (text: string, maxLength: number) => {
    return text.length > maxLength ? text.slice(0, maxLength - 3) + "..." : text;
  }

  return (
    <Box component={'aside'} sx={{
      display: 'flex',
      flexDirection: 'column',
      gap: '40px',
      backgroundColor: palette.primary.light,
      padding: '40px 30px',
      borderRadius: '18px'
    }}>
      <Heading
        title={'Summary'}
        variantSize={'h3'}
        color={palette.primary.dark}
        textAlignment={'left'} />
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: {xs: 'flex-start', md: 'center'},
          gap: '20px'
        }}>
          <Box component={'img'} src={item[0].set_img_url} sx={{
            width: '120px',
            height: '180px',
            objectFit: 'cover',
            alignSelf: 'center'
          }} />
          <Typography variant={'h6'} color={palette.primary.dark} sx={{
            textAlign: 'center'
          }}>
            {item[0].name}
          </Typography>
          {loading ?
            <Box pt={20} pb={10} sx={{
              position: 'relative',
            }}>
              <Loader />
            </Box> :
            <Box sx={{
              display: 'flex',
              flexDirection: 'column',
            }}>
              <Typography mt={'20px'} mb={'40px'}>There are {minifig?.results.length} parts in this minifig:</Typography>
              <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: '20px'
              }}>
                {
                  minifig?.results.map((item, index) => {
                    return (
                      <Box sx={{
                        display: 'flex',
                        gap: '10px'
                      }} key={index}>
                        <Box component={'img'} src={item.part.part_img_url} sx={{
                          width: '80px',
                          height: '60px',
                          objectFit: 'contain',
                          alignSelf: 'center'
                        }} />
                        <Box sx={{
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'center',
                          flex: '1 0 90%',
                        }}>
                          <Typography variant={'body1'} sx={{lineHeight: 1.3}} pr={'40px'}>{cutText(item.part.name, 32)}</Typography>
                          <Typography variant={'body1'} color={palette.secondary.light} sx={{lineHeight: 1.3}}>{item.part.part_num}</Typography>
                        </Box>
                      </Box>
                    )
                  })
                }
              </Box>
            </Box>
          }
        </Box>
        <Box mt={loadingForm ? 12 : 6} ml={loadingForm ? 2 : 0} mb={loadingForm ? 2 : 0} sx={{position: 'relative'}}>
          {
            !loadingForm && error && <Typography mb={2} color={'error'} sx={{textAlign: 'center'}}>{error}</Typography>
          }
          {
            !loadingForm && success && <Typography mb={2} color={'#388e3c'} sx={{textAlign: 'center'}}>{success}</Typography>
          }
          {
            loadingForm ? <Loader /> : <Button title={'Submit'} boxShadow={false} disabled={success} onClick={() => onActionSend()} />
          }
        </Box>
      </Box>
    </Box>
  )
}

export default MinifigDetails
