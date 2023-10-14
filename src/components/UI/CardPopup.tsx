import {Modal, Box, Typography, useTheme} from "@mui/material";
import Loader from "./Loader.tsx";

type Props = {
  open: boolean;
  data: any;
  isLoading: boolean;
  onHandleClose: () => void;
}

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  padding: '100px 50px',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

const CardPopup = ({open, data, isLoading, onHandleClose}: Props) => {
  const {palette} = useTheme();

  return (
    <Modal
      open={open}
      onClose={onHandleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      {
        !data && isLoading ? <Loader /> :
          <Box sx={{
            ...style,
            borderRadius: '18px',
            backgroundColor: palette.primary.light,
          }}>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              There are those parts in this minifig:
            </Typography>
            <Box component={'ul'}>
              {
                data.results.map((item: any, index: number) => {
                  return (
                    <Box component={'li'} key={index}>
                      {item.part.name}
                    </Box>
                  )
                })
              }
            </Box>
          </Box>
      }
    </Modal>
  )
}

export default CardPopup;
