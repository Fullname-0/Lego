import {DatePicker} from '@mui/x-date-pickers';
import {Grid, InputLabel, Typography, useTheme} from '@mui/material';

type Props = {
  id: string;
  label: string;
  validated?: boolean;
  errorMsg?: string;
  value: string | null;
  placeholder?: string;
  valueChangeHandler?: (id: string, value: string) => void;
  labelSx?: any;
  helperText?: string;
};

const FormDateField = ({
  id,
  label,
  valueChangeHandler,
  validated,
  value,
  errorMsg,
  placeholder,
  labelSx,
}: Props) => {
  const { palette } = useTheme();

  return (
    <Grid
      container
      width={'100%'}
      gap={'4px'}
      flexDirection={'column'}
      sx={{
        position: 'relative',
        border: 'none'
      }}
    >
      <InputLabel
        htmlFor={id}
        sx={{
          fontSize: '18px',
          fontWeight: '500',
          color: palette.primary.light,
          ...labelSx,
        }}
      >
        {label}
      </InputLabel>
      <DatePicker
        disableFuture
        value={value}
        sx={{
          marginTop: '4px',
          borderRadius: '18px',
          border: 'none',
          '& .MuiInputBase-root': {
            backgroundColor: palette.primary.light,
            borderRadius: '6px',
            fontSize: '20px',
            color: palette.primary.main,
          },
          '& input': {
            padding: '8.5px 14px',
            height: '28px',
          },
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderRadius: '18px',
              border: 'none',
            },
          },
        }}
        onChange={(e: any) => valueChangeHandler && valueChangeHandler(id, e)}
        slotProps={{ textField: { placeholder: placeholder } }}
      />
      {validated && errorMsg && <Typography className={'MuiFormHelperText-root Mui-error'} sx={{
        color: '#d32f2f',
        position: 'absolute',
        bottom: '-25px',
        left: '50%',
        transform: 'translateX(-50%)',
        textWrap: 'nowrap',
        fontWeight: 400,
        fontFamily: 'Kanit,sans-serif',
        fontSize: '.965rem'
      }}>{errorMsg}</Typography>}
    </Grid>
  )
}

export default FormDateField
