import { useEffect } from 'react'
import {usePostsContext} from '../hooks/usePostsContext'
import PostDetails from '../components/PostDetails'
import CreatePost from '../components/CreatePost'
import { useAuthContext } from '../hooks/useAuthContext'


export default function Home() {
  const {posts, dispatch} = usePostsContext()
  const {user} = useAuthContext()

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch('/api/v1')
        if(!res.ok){
          throw new Error('Network response was not ok')
        }
        const json = await res.json()
        dispatch({type: 'GET_POST', payload: json.post})
      } catch (error) {
        console.log(error)
      }
    }
    fetchPosts()
  }, [dispatch])



  return (
    <div>
      {user && <CreatePost />}
      {posts?.map((post) => (
        <PostDetails key={post._id}  post={post}/>
      ))}
    </div>
  )
}