import { Grid, InputLabel, TextField, useTheme } from '@mui/material';

type Props = {
  id: string;
  type?: string;
  label: string;
  validated?: boolean;
  errorMsg?: string;
  value: string | undefined;
  placeholder?: string;
  valueChangeHandler?: (id: string, value: string) => void;
  labelSx?: any;
  maxLength?: number;
  helperText?: string;
};
const FormTextField = ({
  id,
  type,
  label,
  validated,
  errorMsg,
  valueChangeHandler,
  value,
  placeholder,
  labelSx,
  maxLength,
}: Props) => {
  const { palette } = useTheme();

  return (
    <Grid
      container
      width={'100%'}
      gap={'4px'}
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
      <TextField
        id={id}
        type={type}
        size='small'
        required
        fullWidth
        placeholder={placeholder}
        sx={{
          position: 'relative',
          marginTop: '4px',
          '& .MuiFormHelperText-root': {
            color: 'red',
            position: 'absolute',
            bottom: '-25px',
            left: '48%',
            transform: 'translateX(-50%)',
            textWrap: 'nowrap'
          },
          '& input': {
            backgroundColor: palette.primary.light,
            borderRadius: '6px',
            height: '28px',
            fontSize: '20px',
            color: palette.primary.main,
          },
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderRadius: '18px',
              border: 'none',
            },
          },
        }}
        inputProps={{ maxLength: maxLength }}
        value={value}
        error={validated && errorMsg !== ''}
        onChange={(e: any) => valueChangeHandler && valueChangeHandler(id, e.target.value)}
        helperText={validated && errorMsg}
      />
    </Grid>
  );
};

export default FormTextField;
