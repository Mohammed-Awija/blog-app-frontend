import {useState} from 'react'
import {useLogin} from '../hooks/useLogin'
import {Stack, Typography, TextField, Button, Alert, InputAdornment} from '@mui/material'
import { style } from '../themes/defaultTheme'
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';

export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const {login, error, setError, loading} = useLogin()

    const handleSubmit = async (e) => {
        e.preventDefault()
        if(!email || !password){
          return setError('All fields are required')
         }
        await login(email, password)
        setShowPassword(false)
}

  return (
    <Stack direction='column' sx={{ alignItems: 'center', margin: '100px 0' }}>
        <Typography color={style.textColor} m={1} variant='h4'>Login</Typography>
        {loading ? <Typography variant='subtitle2' color={style.textColor}>Loading...</Typography> :
        <Stack spacing={1} width='360px'>
          {error && <Alert severity="warning">{error}</Alert>}
            <TextField 
            sx={{ 
              "& .MuiOutlinedInput-root": {
                color: "#b0b3b8",
                "& .MuiOutlinedInput-notchedOutline": {
                  border: `solid 0.5px ${style.main}`
                },
              },
              "& .MuiInputLabel-outlined": {
                color: style.textColor,
              },
              }}
            type='text'
            variant='outlined' label="Email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            />
            <TextField 
            sx={{ 
                "& .MuiOutlinedInput-root": {
                color: "#b0b3b8",
                "& .MuiOutlinedInput-notchedOutline": {
                border: `solid 0.5px ${style.main}`
              },
            },
            "& .MuiInputLabel-outlined": {
            color: style.textColor,
            },
            }}
            type={showPassword ? 'text' : 'password'}
            label="Password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            InputProps={{
              endAdornment:  
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} sx={{ color: style.bgcolor }} aria-label="toggle password visibility">
                {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
              </IconButton>
            </InputAdornment>
            }}
            />
            <Button variant='contained' onClick={handleSubmit} disabled={loading}>Login</Button>
        </Stack>
        }
    </Stack>
  )
}

//{showPassword ? <VisibilityOff /> : <Visibility />}