import {useState} from 'react'
import {useLogin} from '../hooks/useLogin'


export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const {login, error, loading} = useLogin()

    const handleSubmit = async (e) => {
        e.preventDefault()

        await login(email, password)
    }

  return (
    <div>
        <h2>Login</h2>
        {loading ? "Loading..." :
        <form onSubmit={handleSubmit}>
          {error && <h3>{error}</h3>}
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
            <button disabled={loading}>Login</button>
        </form>
        }
    </div>
  )
}
