import {TextField, Button} from '@mui/material'
import { useState } from 'react'
import { useAuthContext } from '../hooks/useAuthContext'
import { usePostsContext } from '../hooks/usePostsContext'


export default function EditPost() {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [id, setId] = useState('')
    const {dispatch} = usePostsContext()
    const {user} = useAuthContext()
    const [error, setError] = useState(null)




      


    const handleEdit = async (e) => {
        e.preventDefault()
        if(!user){
          return setError('You must be logged in!!!')
       }
       if(id === null){
        return setError('post id not found')
      }
          try {
            const res = await fetch(`/api/v1/edit-post/${id}`, {
              method: 'PATCH', 
              body: JSON.stringify({
                title: title,
                description: description,
              }),
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
              }
            })
            const json = await res.json() 
            if(!res.ok){ 
              setError(json.error)
              return; 
          }
          setTitle('')
          setDescription('')
          setError(null)
          dispatch({type: 'EDIT_POST', payload: json})
          } catch (error) {
            console.log(error)
          }
      }
  return (
    <>
        <TextField value={title} onChange={(e) => setTitle(e.target.value)} variant='outlined'/>
        <TextField value={description} onChange={(e) => setDescription(e.target.value)} variant='outlined'/>
        <Button onClick={handleEdit} variant='contained'>Submit</Button>
    </>
  )
}
