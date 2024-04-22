import { Link} from "react-router-dom"
import { useState } from "react";
import {AppBar, Box, Toolbar, IconButton, Typography, Menu, MenuItem, Button} from '@mui/material'
import AccountCircle from '@mui/icons-material/AccountCircle';
import FormGroup from '@mui/material/FormGroup';
import {useAuthContext} from '../hooks/useAuthContext'
import useLogout from "../hooks/useLogout";
import { menu, style } from "../themes/defaultTheme";

export default function Navbar() {
    const [showMenu, setShowMenu] = useState(null);
    const {user} = useAuthContext()
    const {logout} = useLogout()
  

    const handleLogout = () => {
      logout()
      setShowMenu(null);
    };

    
  return (
    <Box sx={{ flexGrow: 1 }}>
      <FormGroup>
      </FormGroup>
      <AppBar position="static">
        <Toolbar>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              {<Link to='/' style={{ textDecoration: 'none', color: style.textColor }}>Home</Link>}
              </Typography>
            <div>
            {user ? <>
                    <IconButton
                      size="large"
                      aria-label="account of current user"
                      aria-controls="menu-appbar"
                      aria-haspopup="true"
                      onClick={(e) => setShowMenu(e.currentTarget)}
                      color="inherit"
                    >
                  <AccountCircle />
                </IconButton>
              <Menu
                sx={menu}
                id="menu-appbar"
                anchorEl={showMenu}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(showMenu)}
                onClose={() => setShowMenu(null)}
              >
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </>
          : 
          <Box>
            <Button variant="text" sx={{ backgroundColor: 'white' , margin: '0 5px'}}>{<Link to='/login' style={{ textDecoration: 'none', color: 'black' }}>Login</Link>}</Button>
            <Button variant="text" sx={{ backgroundColor: 'white' , margin: '0 5px'}}>{<Link to='/signup' style={{ textDecoration: 'none', color: 'black' }}>Signup</Link>}</Button>
          </Box>
          }
            </div>
        </Toolbar>
      </AppBar>
    </Box>
  )
}
