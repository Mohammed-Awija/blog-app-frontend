import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import { theme } from "./themes/themeProvider";
import { ThemeProvider } from "@emotion/react";
import Login from './pages/Login'
import Signup from './pages/Signup'
import { useAuthContext } from "./hooks/useAuthContext";




function App() {
  const {user} = useAuthContext()
  return (
    <div>
      <ThemeProvider theme={theme}>
      <BrowserRouter>
      <Navbar />
        <Routes>
          <Route path='/' element={user ? <Home /> : <Login />}/>
          <Route path='/login' element={user ? <Home /> : <Login />}/>
          <Route path='/signup' element={user ? <Home /> : <Signup />}/>
        </Routes>
      </BrowserRouter>
      </ThemeProvider>
    </div>
  );
}

export default App;
