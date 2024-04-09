import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import { theme } from "./themes/themeProvider";
import { ThemeProvider } from "@emotion/react";
import Login from './pages/Login'
import Signup from './pages/Signup'


function App() {
  return (
    <div>
      <ThemeProvider theme={theme}>
      <BrowserRouter>
      <Navbar />
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/login' element={<Login />}/>
          <Route path='/signup' element={<Signup />}/>
        </Routes>
      </BrowserRouter>
      </ThemeProvider>
    </div>
  );
}

export default App;
