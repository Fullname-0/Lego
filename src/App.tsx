import MainLayout from "./layout/MainLayout.tsx";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import Home from "./pages/Home.tsx";
import MinifigsPage from "./pages/MinifigsPage.tsx";
import FormPage from "./pages/FormPage.tsx";
import PageNotFound from "./pages/PageNotFound.tsx";

const App = () => {

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="/minifigs" element={<MinifigsPage />} />
            <Route path="/minifigs/:id" element={<FormPage />} />
            <Route path="*" element={<PageNotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </LocalizationProvider>
  )
}

export default App
