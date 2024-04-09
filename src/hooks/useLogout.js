import { useAuthContext } from "./useAuthContext";
import {usePostsContext} from './usePostsContext'


export default function useLogout() {
    const {dispatch} = useAuthContext()
    const {dispatch: postDispatch} = usePostsContext()
    const logout = () => {
        //remove user from storage
        localStorage.removeItem('user')
        //dispatch logout action
        dispatch({type: 'LOGOUT'})
        //set state null after logout
        postDispatch({type: 'GET_POST', payload: null})
    }
  return (
    <div>useLogout</div>
  )
}
