import {useState} from 'react'
import {useAuthContext} from './useAuthContext'



export function useSignup (){
    const {dispatch} = useAuthContext()
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)

    const signup = async (username, email, password) => {
        setLoading(true)
        setError(null)
        const res = await fetch('/api/user/signup', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({username, email, password})
        })
        const json = await res.json()
        if(!res.ok){
            setLoading(false)
            setError(json.error)
        }
        if(res.ok){
            //save the user in local storage
            localStorage.setItem('user', JSON.stringify(json))
        }
        dispatch({type: 'LOGIN', payload: json})
        setLoading(false)
    }
  return {signup, loading, error, setError}
}
