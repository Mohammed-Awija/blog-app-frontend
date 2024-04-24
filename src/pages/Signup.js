import {useState} from 'react'
import { useSignup } from '../hooks/useSignup'
import {Stack, Typography, TextField, Button, Alert} from '@mui/material'
import { style } from '../themes/defaultTheme'

export default function Signup() {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
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
            type='password'
            label="Password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
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
            type='password'
            label="Confirm Password"
            onChange={(e) => setConfirmPassword(e.target.value)}
            value={confirmPassword}
            />
            <Button variant='contained' onClick={handleSubmit} disabled={loading}>Sign up</Button>
        </Stack>
        }
    </Stack>
  )
}
