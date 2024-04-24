import {useState} from 'react'
import {useLogin} from '../hooks/useLogin'
import {Stack, Typography, TextField, Button, Alert} from '@mui/material'
import { style } from '../themes/defaultTheme'

export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const {login, error, setError, loading} = useLogin()

    const handleSubmit = async (e) => {
        e.preventDefault()
        if(!email || !password){
          return setError('All fields are required')
         }
        await login(email, password)
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
            type='password'
            label="Password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            />
            <Button variant='contained' onClick={handleSubmit} disabled={loading}>Login</Button>
        </Stack>
        }
    </Stack>
  )
}
