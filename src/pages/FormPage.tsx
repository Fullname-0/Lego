import {Box, Grid, useTheme} from '@mui/material';
import {useEffect, useState} from 'react';
import isEmail from 'validator/lib/isEmail';
import {registerSchipping} from "../api/api.ts";
import MinifigDetails from '../components/MinifigDetails.tsx';
import {useAppContext} from '../store/AppContext.tsx';
import FormTextField from '../components/UI/FormTextField.tsx';
import FormDateField from '../components/UI/FormDateField.tsx';
import Heading from "../components/UI/Heading.tsx";

const FormPage = () => {
  const initialFormState = {
    name: {value: '', error: 'Please enter name'},
    surname: {value: '', error: 'Please enter surname'},
    phone: {value: '', error: 'Please enter phone number'},
    email: {value: '', error: 'Please enter valid email'},
    birth: {value: '', error: 'Please enter date of birth'},
    address: {value: '', error: 'Please enter address'},
    city: {value: '', error: 'Please enter city'},
    state: {value: '', error: 'Please enter state'},
    zipCode: {value: '', error: 'Please enter zip code'},
  }
  const {palette} = useTheme();
  const {selectMinifig, setInit} = useAppContext();
  const [validated, setValidated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [formInfo, setFormInfo] = useState(initialFormState);

  const resetInputs = () => {
    setFormInfo(initialFormState);
  };

  const valueHandler = (accessor: string, value: any) => {
    let validValue: any = value;
    let validInput: any = false;

    if(accessor == 'phone') {
      validValue = value.replace(/\D/g, '');
    }
    if(accessor == 'email') {
      validInput = !isEmail(value)
    }
    if(accessor == 'zipCode') {
      const numericValue = value.replace(/\D/g, '');
      validValue = numericValue.replace(/(\d{2})(\d{1,})/, '$1-$2');
      validInput = validValue.length !== 6;
    }
    if(accessor == 'birth') {
      validValue = value?.$d;
    }

    setFormInfo((prevState) => {
      return {
        ...prevState,
        [accessor]: {
          value: validValue,
          error: (validValue.length < 1 || validInput) ? initialFormState[accessor].error : ''
        },
      };
    });
  };

  const validatedForm = () => {
    for (const key in formInfo) {
      if (formInfo[key].error !== '') {
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
      const valuesWithProperties = {};
      for (const key in formInfo) {
        valuesWithProperties[key] = formInfo[key].value;
      }
      const formData = {
        title: selectMinifig[0].name,
        idMinifig: selectMinifig[0].set_num,
        ...valuesWithProperties,
      }
      registerSchipping(formData)
        .then((res: any) => {
          setLoading(false);
          if (res.status == 201 || res.status == 200) {
            setSuccessMsg('Thank you for your request :)')
            setValidated(false)
            resetInputs();
          } else {
            setErrorMsg('Something went wrong! Please try again later!')
          }
        })
        .catch((error: any) => {
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
        setInit()
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
              errorMsg={formInfo.name.error}
              value={formInfo.name.value}
              valueChangeHandler={valueHandler}
              placeholder={'Name'}
              helperText={initialFormState.name.error}
            />
            <FormTextField
              id={'surname'}
              type={'text'}
              label={'Surname'}
              validated={validated}
              errorMsg={formInfo.surname.error}
              value={formInfo.surname.value}
              valueChangeHandler={valueHandler}
              placeholder={'Surname'}
              helperText={initialFormState.surname.error}
            />
          </Box>
          <FormTextField
            id={'phone'}
            type={'tel'}
            label={'Phone number'}
            validated={validated}
            errorMsg={formInfo.phone.error}
            value={formInfo.phone.value}
            valueChangeHandler={valueHandler}
            placeholder={'Phone number'}
            helperText={initialFormState.phone.error}
          />
          <FormTextField
            id={'email'}
            type={'email'}
            label={'Email'}
            validated={validated}
            errorMsg={formInfo.email.error}
            value={formInfo.email.value}
            valueChangeHandler={valueHandler}
            placeholder={'Email'}
            helperText={initialFormState.email.error}
          />
          <FormDateField
            id={'birth'}
            label={'Date of birth'}
            value={formInfo.birth.value}
            validated={validated}
            errorMsg={formInfo.birth.error}
            valueChangeHandler={valueHandler}
            placeholder={'Date of birth'}
            helperText={initialFormState.birth.error}
          />
          <FormTextField
            id={'address'}
            type={'text'}
            label={'Address'}
            validated={validated}
            errorMsg={formInfo.address.error}
            value={formInfo.address.value}
            valueChangeHandler={valueHandler}
            placeholder={'Address'}
            helperText={initialFormState.address.error}
          />
          <FormTextField
            id={'city'}
            type={'text'}
            label={'City'}
            validated={validated}
            errorMsg={formInfo.city.error}
            value={formInfo.city.value}
            valueChangeHandler={valueHandler}
            placeholder={'City'}
            helperText={initialFormState.city.error}
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
              errorMsg={formInfo.state.error}
              value={formInfo.state.value}
              valueChangeHandler={valueHandler}
              placeholder={'State'}
              helperText={initialFormState.state.error}
            />
            <FormTextField
              id={'zipCode'}
              type={'text'}
              label={'Zip code'}
              validated={validated}
              errorMsg={formInfo.zipCode.error}
              value={formInfo.zipCode.value}
              valueChangeHandler={valueHandler}
              placeholder={'Zip code'}
              helperText={initialFormState.zipCode.error}
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
