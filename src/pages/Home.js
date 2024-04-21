import { useEffect } from 'react'
import {usePostsContext} from '../hooks/usePostsContext'
import PostDetails from '../components/PostDetails'
import CreatePost from '../components/CreatePost'
import { useAuthContext } from '../hooks/useAuthContext'



export default function Home() {
  const {posts, dispatch} = usePostsContext()
  const {user, dispatch: authDispatch} = useAuthContext()

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch('/api/v1', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.token}`
          }
        })
        if(!res.ok){
          if (res.status === 401) {
            authDispatch({ type: 'LOGOUT' });
            localStorage.removeItem('user');
          }
          throw new Error('Network response was not ok')
        }
        const json = await res.json()
        dispatch({type: 'GET_POST', payload: json.post})
      } catch (error) {
        console.log(error)
      }
    }
    fetchPosts()
  }, [dispatch, authDispatch, user.token])



  return (
    <div>
      {user && <CreatePost />} 
      {posts?.map((post) => (
        <PostDetails key={post._id}  post={post}/>
      ))}
    </div>
  )
}
