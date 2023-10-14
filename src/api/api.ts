import axios from "axios";

export const getMinifigs =  async (onError?: (error: any) => void) => {
  const url = import.meta.env.VITE_API_MINIFIGS_URL ? import.meta.env.VITE_API_MINIFIGS_URL + 'minifigs/?page_size=20&search=potter' : "";

  let data = [] as any[];
  const config = {
    headers: {
      "Authorization ": 'key ' + import.meta.env.VITE_API_KEY
    }
  }
  try {
    const response = await axios.get(url, config)
    if (response.status == 200) {
      data = response.data;
    } else {
      onError && onError(response);
    }
  } catch(error: any) {
    console.error(error.response? error.response : error);
    onError && onError(error.response ? error.response : "Error!");
  }
  return data;
}

export const getMinifig =  async (minifigId: string, onError?: (error: any) => void) => {
  const url = import.meta.env.VITE_API_MINIFIGS_URL ? import.meta.env.VITE_API_MINIFIGS_URL + 'minifigs/' + minifigId + '/parts/' : "";

  let data = [] as any[];
  const config = {
    headers: {
      "Authorization ": 'key ' + import.meta.env.VITE_API_KEY
    }
  }
  try {
    const response = await axios.get(url, config)
    if (response.status == 200) {
      data = response.data;
    } else {
      onError && onError(response);
    }
  } catch(error: any) {
    console.error(error.response? error.response : error);
    onError && onError(error.response ? error.response : "Error!");
  }
  return data;
}

export const registerSchipping = async (
  formInfo: {
    title: any,
    idMinifig: any,
    name: string,
    surname: string,
    phone: string,
    email: string,
    birth: string,
    address: string,
    city: string,
    state: string,
    zipCode: string,
  }) => {
  const url = import.meta.env.VITE_API_FORM ? import.meta.env.VITE_API_FORM + '/shippment' : '';

  const data = JSON.stringify(formInfo);

  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  try {
    const response = await axios.post(url, data, config);
    if (response.status != 200 && response.status != 201) {
      console.error(response);
    }
    return response;
  } catch (error: any) {
    console.error(error.response ? error.response : error);
    return error.response ? error.response.data.message : error;
  }
};
