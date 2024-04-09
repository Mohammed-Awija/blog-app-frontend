import {useState} from 'react'
import { useSignup } from '../hooks/useSignup'


export default function Signup() {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const {signup, error, loading} = useSignup()

    const handleSubmit = async (e) => {
        e.preventDefault()

        await signup(username, email, password)
    }

  return (
    <div>
        <h2>Sign up</h2>
        {loading ? "Loading..." :
        <form onSubmit={handleSubmit}>
            {error && <h3>{error}</h3>}
            <label>Username</label>
            <input 
            type='text'
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            />
            <label>Email</label>
            <input 
            type='text'
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            />
            <label>Password</label>
            <input 
            type='password'
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            />
            <label>Confirm Password</label>
            <input 
            type='password'
            onChange={(e) => setConfirmPassword(e.target.value)}
            value={confirmPassword}
            />
            <button disabled={loading}>Sign up</button>
        </form>
        }
    </div>
  )
}
