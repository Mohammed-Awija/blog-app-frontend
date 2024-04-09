import { useContext } from 'react'
import {PostsContext} from '../context/PostsContext'



export function usePostsContext() {
    const context = useContext(PostsContext)

    if(!context){
        throw Error("usePostContext must be used inside PostContextProvider")
    }
  return context

}