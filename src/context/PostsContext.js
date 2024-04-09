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
    
            }
        case 'EDIT_POST':
            return {
        
            }
        case 'DELETE_POST':
            return {
    
            }
        case 'LIKE_POST':
            return {
    
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
