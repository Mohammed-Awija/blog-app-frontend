import {useState} from 'react'
import { useSignup } from '../hooks/useSignup'
import {Stack, Typography, TextField, Button, Alert, InputAdornment} from '@mui/material'
import { style } from '../themes/defaultTheme'
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';

export default function Signup() {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const {signup, error, loading, setError} = useSignup()
    //password validator
    const minLength = /.{8,}/
    const minLowercase = /[a-z]/
    const minUppercase = /[A-Z]/
    const minNumbers = /\d/
    const minSymbols = /[\W_]/

    const handleSubmit = async (e) => {
        e.preventDefault()
        if(!username || !email || !password || !confirmPassword){
          return setError('All fields are required')
        }
        if(!minLength.test(password) || 
        !minLowercase.test(password) ||
        !minUppercase.test(password) ||
        !minNumbers.test(password) ||
        !minSymbols.test(password)){
          return setError('Password is not strong enough')
        }
        if(password !== confirmPassword){
          return setError('Passwords are not the same')
        }
        await signup(username, email, password)
        setShowPassword(false)
    }

  return (
    <Stack direction='column' sx={{ alignItems: 'center', margin: '100px 0' }}>
        <Typography color={style.textColor} m={1} variant='h4'>Sign up</Typography>
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
            variant='outlined' label="Username"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
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
            label="Confirm Password"
            onChange={(e) => setConfirmPassword(e.target.value)}
            value={confirmPassword}
            InputProps={{
              endAdornment:  
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} sx={{ color: style.bgcolor }} aria-label="toggle password visibility">
                {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
              </IconButton>
            </InputAdornment>
            }}
            />
            <Button variant='contained' onClick={handleSubmit} disabled={loading}>Sign up</Button>
        </Stack>
        }
    </Stack>
  )
}
