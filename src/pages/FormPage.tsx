import {Box, Grid, useTheme} from '@mui/material';
import {useEffect, useState} from 'react';
import isEmail from 'validator/lib/isEmail';
import {registerSchipping} from "../api/api.ts";
import MinifigDetails from '../components/MinifigDetails.tsx';
import {useAppContext} from '../store/AppContext.tsx';
import FormTextField from '../components/UI/FormTextField.tsx';
import FormDateField from '../components/UI/FormDateField.tsx';
import Heading from "../components/UI/Heading.tsx";

const formErrors = {
  nameError: 'Please enter name',
  surnameError: 'Please enter surname',
  phoneError: 'Please enter phone number',
  emailError: 'Please enter valid email',
  birthError: 'Please enter date of birth',
  addressError: 'Please enter address',
  cityError: 'Please enter city',
  stateError: 'Please enter state',
  zipCodeError: 'Please enter zip code',
};

const FormPage = () => {
  const {palette} = useTheme();
  const {selectMinifig, setInit} = useAppContext();
  const [validated, setValidated] = useState(false);
  const [formValidation, setFormValidation] = useState(formErrors);
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [formInfo, setFormInfo] = useState({
    name: '',
    surname: '',
    phone: '',
    email: '',
    birth: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
  });

  const resetInputs = () => {
    setFormInfo((prevState) => {
      return {
        ...prevState,
        name: '',
        surname: '',
        phone: '',
        email: '',
        birth: '',
        address: '',
        city: '',
        state: '',
        zipCode: '',
      };
    });
  };

  const nameHandler = (value: string) => {
    if (value.length < 1) {
      setFormValidation({
        ...formValidation,
        nameError: formErrors.nameError,
      });
    } else {
      setFormValidation({
        ...formValidation,
        nameError: '',
      });
    }
    setFormInfo((prevState) => {
      return {
        ...prevState,
        name: value,
      };
    });
  };

  const surnameHandler = (value: string) => {
    if (value.length < 1) {
      setFormValidation({
        ...formValidation,
        surnameError: formErrors.surnameError,
      });
    } else {
      setFormValidation({
        ...formValidation,
        surnameError: '',
      });
    }
    setFormInfo((prevState) => {
      return {
        ...prevState,
        surname: value,
      };
    });
  };

  const phoneHandler = (value: string) => {
    const numericValue = value.replace(/\D/g, '');
    if (value.length < 1) {
      setFormValidation({
        ...formValidation,
        phoneError: formErrors.phoneError,
      });
    } else {
      setFormValidation({
        ...formValidation,
        phoneError: '',
      });
    }
    setFormInfo((prevState) => {
      return {
        ...prevState,
        phone: numericValue,
      };
    });
  };

  const emailHandler = (value: string) => {
    if (value.length < 1) {
      setFormValidation({
        ...formValidation,
        emailError: formErrors.emailError,
      });
    } else if (!isEmail(value)) {
      setFormValidation({
        ...formValidation,
        emailError: 'Niepoprawny adres e-mail',
      });
    } else {
      setFormValidation({
        ...formValidation,
        emailError: '',
      });
    }
    setFormInfo((prevState) => {
      return {
        ...prevState,
        email: value,
      };
    });
  };

  const birthHandler = (value: any) => {
    if (value.length < 1) {
      setFormValidation({
        ...formValidation,
        birthError: formErrors.birthError,
      });
    } else {
      setFormValidation({
        ...formValidation,
        birthError: '',
      });
    }
    setFormInfo((prevState) => {
      return {
        ...prevState,
        birth: value?.$d,
      };
    });
  };

  const addressHandler = (value: string) => {
    if (value.length < 1) {
      setFormValidation({
        ...formValidation,
        addressError: formErrors.addressError,
      });
    } else {
      setFormValidation({
        ...formValidation,
        addressError: '',
      });
    }
    setFormInfo((prevState) => {
      return {
        ...prevState,
        address: value,
      };
    });
  };

  const cityHandler = (value: string) => {
    if (value.length < 1) {
      setFormValidation({
        ...formValidation,
        cityError: formErrors.cityError,
      });
    } else {
      setFormValidation({
        ...formValidation,
        cityError: '',
      });
    }
    setFormInfo((prevState) => {
      return {
        ...prevState,
        city: value,
      };
    });
  };

  const stateHandler = (value: string) => {
    if (value.length < 1) {
      setFormValidation({
        ...formValidation,
        stateError: formErrors.stateError,
      });
    } else {
      setFormValidation({
        ...formValidation,
        stateError: '',
      });
    }
    setFormInfo((prevState) => {
      return {
        ...prevState,
        state: value,
      };
    });
  };

  const zipCodeHandler = (value: string) => {
    const numericValue = value.replace(/\D/g, '');
    const formattedValue = numericValue.replace(/(\d{2})(\d{1,})/, '$1-$2');

    if (formattedValue.length === 6) {
      setFormValidation({
        ...formValidation,
        zipCodeError: '',
      });
    } else {
      setFormValidation({
        ...formValidation,
        zipCodeError: formErrors.zipCodeError,
      });
    }
    setFormInfo((prevState) => {
      return {
        ...prevState,
        zipCode: formattedValue,
      };
    });
  };

  const validatedForm = () => {
    for (const key in formValidation) {
      if (formValidation[key] !== '') {
        return false;
      }
    }
    return true;
  }

  const actionSend = () => {
    setValidated(true);

    if(!validatedForm()) {
      return
    }

    if (formInfo) {
      setLoading(true);
      const formData = {
        ...formInfo,
        name: selectMinifig.name,
        idMinifig: selectMinifig.set_num
      }
      registerSchipping(formData)
        .then((res: any) => {
          setLoading(false);
          if (res.status == 201 || res.status == 200) {
            setInit()
            setSuccessMsg(res.statusText)

            // resetInputs();
          } else {
            setErrorMsg('Something went wrong! Please try again later!')
          }
        })
        .catch((error: any) => {
          resetInputs();
          console.log(error)
          setErrorMsg('Something went wrong! Please try again later!')
          setLoading(false);
        });
    }
  };

  useEffect(() => {
    if(successMsg || errorMsg) {
      const timeout = setTimeout(() => {
        setSuccessMsg('');
        setErrorMsg('');
      }, 2000);

      return () => {
        clearTimeout(timeout);
      };
    }
  }, [errorMsg, successMsg])

  return (
    <Grid item xs={12} sx={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      gap: {xs: '40px', lg: '80px'},
      flexDirection: {xs: 'column', md: 'row'}
    }}>
      <Grid item xs={12} md={6} lg={6.5} ml={{xs: 0, lg: 12}} sx={{
        width: '100%'
      }}>
        <Box mb={5}>
          <Heading
            title={'Shipping details'}
            variantSize={'h2'}
            color={palette.primary.light}
            textAlignment={'left'} />
        </Box>
        <Box component={'form'} sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '20px'
        }}>
          <Box sx={{
            display: 'flex',
            gap: '20px',
            flexDirection: {xs: 'column', sm: 'row'}
          }}>
            <FormTextField
              id={'name'}
              type={'text'}
              label={'Name'}
              validated={validated}
              errorMsg={formValidation.nameError}
              value={formInfo.name}
              valueChangeHandler={nameHandler}
              placeholder={'Name'}
              helperText={formValidation.nameError}
            />
            <FormTextField
              id={'surname'}
              type={'text'}
              label={'Surname'}
              validated={validated}
              errorMsg={formValidation.surnameError}
              value={formInfo.surname}
              valueChangeHandler={surnameHandler}
              placeholder={'Surname'}
              helperText={formValidation.surnameError}
            />
          </Box>
          <FormTextField
            id={'phone'}
            type={'tel'}
            label={'Phone number'}
            validated={validated}
            errorMsg={formValidation.phoneError}
            value={formInfo.phone}
            valueChangeHandler={phoneHandler}
            placeholder={'Phone number'}
            helperText={formValidation.phoneError}
          />
          <FormTextField
            id={'email'}
            type={'email'}
            label={'Email'}
            validated={validated}
            errorMsg={formValidation.emailError}
            value={formInfo.email}
            valueChangeHandler={emailHandler}
            placeholder={'Email'}
            helperText={formValidation.emailError}
          />
          <FormDateField
            id={'birth'}
            label={'Date of birth'}
            value={formInfo.birth}
            validated={validated}
            errorMsg={formValidation.birthError}
            valueChangeHandler={birthHandler}
            placeholder={'Date of birth'}
            helperText={formValidation.birthError}
          />
          <FormTextField
            id={'address'}
            type={'text'}
            label={'Address'}
            validated={validated}
            errorMsg={formValidation.addressError}
            value={formInfo.address}
            valueChangeHandler={addressHandler}
            placeholder={'Address'}
            helperText={formValidation.addressError}
          />
          <FormTextField
            id={'city'}
            type={'text'}
            label={'City'}
            validated={validated}
            errorMsg={formValidation.cityError}
            value={formInfo.city}
            valueChangeHandler={cityHandler}
            placeholder={'City'}
          />
          <Box sx={{
            display: 'flex',
            gap: '20px',
            flexDirection: {xs: 'column', sm: 'row'}
          }}>
            <FormTextField
              id={'state'}
              type={'text'}
              label={'State'}
              validated={validated}
              errorMsg={formValidation.stateError}
              value={formInfo.state}
              valueChangeHandler={stateHandler}
              placeholder={'State'}
            />
            <FormTextField
              id={'zip'}
              type={'text'}
              label={'Zip code'}
              validated={validated}
              errorMsg={formValidation.zipCodeError}
              value={formInfo.zipCode}
              valueChangeHandler={zipCodeHandler}
              placeholder={'Zip code'}
            />
          </Box>
        </Box>
      </Grid>
      <Grid item xs={12} md={5} lg={3.5}>
        <MinifigDetails
          error={errorMsg}
          success={successMsg}
          loadingForm={loading}
          item={selectMinifig}
          onActionSend={actionSend}
        />
      </Grid>
    </Grid>
  )
}

export default FormPage
