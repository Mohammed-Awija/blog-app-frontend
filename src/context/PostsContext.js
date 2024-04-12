import React, { createContext, useReducer } from 'react'

export const PostsContext = createContext()

export const postReducer = (state, action) => {
    switch (action.type){
        case 'GET_POST':
            return {
                ...state,
                posts: action.payload
            }
        case 'CREATE_POST':
            return {
                posts: [action.payload, ...state.posts]
            }
        case 'EDIT_POST':
            return {
                posts: state.posts.map((post) => 
                post._id === action.payload._id ? action.payload : post)
        
            }
        case 'DELETE_POST':
            return {
                posts: state.posts.filter((post) => post._id !== action.payload._id)
            }
        case 'LIKE_POST':
            return {
                posts: state.posts.map((post) => 
                post._id === action.payload._id ? {...post, likes: action.payload.likes} : post)
            }
        default:
            return state
    }

}



export function PostContextProvider({children}) {
    const [state, dispatch] = useReducer(postReducer, {
        posts: null
    })

    const value = {
        ...state, 
        dispatch
    }


  return (
    <PostsContext.Provider value={value}>
        {children}
    </PostsContext.Provider>
  )
}
