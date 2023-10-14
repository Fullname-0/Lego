import {createContext, ReactNode, useContext, useReducer} from 'react';

type AppContextType = {
  loading: boolean,
  step: string,
  minifigs: [],
  selectMinifig: any,
  setStep: (minifigs: any) => void,
  setLoading: () => void,
  stopLoading: () => void,
  setFinal: (minifigId: string) => void,
  setInit: () => void,
};

type ActionType = {
  type: string;
  value?: any;
};

const initialState: AppContextType = {
  loading: false,
  step: 'init',
  minifigs: [],
  selectMinifig: {},
  setStep: () => {},
  setLoading: () => {},
  stopLoading: () => {},
  setFinal: () => {},
  setInit: () => {}
}

const randomArray = () => {
  return 0.5 - Math.random();
}

const reducer = (state: AppContextType, action: ActionType): AppContextType => {
  switch (action.type) {
    case 'loading':
      return {...state, loading: true}

    case 'stopLoading':
      return {...state, loading: false}

    case 'stepMinifigs':
      return {...state, loading: false, step: 'minifigs', minifigs: action.value.sort(randomArray).slice(0, 3)}

    case 'stepFinal':
      return {...state, step: 'final', selectMinifig: state.minifigs.filter((it: any) => it.set_num === action.value)}

    case 'init':
      return {...state, loading: false, step: 'init', minifigs: [], selectMinifig: {}}

    default: throw new Error('Unknown action')
  }
}

const AppContextProvider = ({children} : {children: ReactNode}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const setLoading = () => {dispatch({type: 'loading'})};
  const stopLoading = () => {dispatch({type: 'stopLoading'})};
  const setStep = (minifigs: any) => {dispatch({type: 'stepMinifigs', value: minifigs})};
  const setFinal = (minifigId: string) => {dispatch({type: 'stepFinal', value: minifigId})};
  const setInit = () => {dispatch({type: 'init'})};

  const contextValue: AppContextType = {
    ...state,
    setStep: setStep,
    setLoading: setLoading,
    stopLoading: stopLoading,
    setFinal: setFinal,
    setInit: setInit
  };

  return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
}

const AppContext = createContext<AppContextType>({
  ...initialState,
});

const useAppContext = () => {
  const context = useContext(AppContext)
  if(context === undefined)
    throw new Error('AppContext was used outside AppContext.Provider')
  return context
}

export { AppContextProvider, useAppContext }
