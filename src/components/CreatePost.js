import {Card, CardHeader, CardMedia, CardContent, Avatar, TextField, Stack, Button, Alert } from '@mui/material'
import defaultImage from '../images/default.jpg'
import { useState } from 'react'
import {useAuthContext} from '../hooks/useAuthContext'
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import {usePostsContext} from '../hooks/usePostsContext'

export default function CreatePost() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [error, setError] = useState(null)
  const [create, setCreate] = useState(false)
  const {user} = useAuthContext()
  const {dispatch} = usePostsContext()

  
  const handleSubmit = async (e) => {
    e.preventDefault()
    if(!user){
      return setError('You must be logged in!!!')
   }
   const post = {title, description}
      try { 
        const res = await fetch('/api/v1/create-post', {
          method: 'POST', 
          body: JSON.stringify(post),
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
      dispatch({type: 'CREATE_POST', payload: json})
      } catch (error) {
        console.log(error)
      }
  }





  return (
    <Card sx={{ maxWidth: '500px', margin: '15px auto' }}>
      {error && <Alert severity="warning">{error}</Alert>}
      {create ? 
      <>
      <CardHeader 
      avatar={
          <Avatar sx={{ bgcolor: '#FF5700' }} aria-label='user'>
            {user && user.username[0].toUpperCase()}
          </Avatar>
        } 
        action={
          <IconButton aria-label="close" onClick={() => setCreate(false)}>
            <CloseIcon  />
          </IconButton>
        }
        title={user && user.username}
        />
        <CardMedia
          component='img'
          height='280px'
          image={defaultImage}
          alt='default photo'
        />
        <CardContent>
          <Stack spacing={1} direction='column' >
            <TextField value={title} onChange={(e) => setTitle(e.target.value)} variant='outlined' label="Title"/>
            <TextField value={description} onChange={(e) => setDescription(e.target.value)} multiline rows={5} label="Description..." variant='outlined'/>
            <Button onClick={handleSubmit} variant='contained'>Create Post</Button>
          </Stack>
        </CardContent>
      
      </> : 
      <>
      <CardHeader
      avatar={
          <Avatar sx={{ bgcolor: '#FF5700' }} aria-label='user'>
            {user && user.username[0].toUpperCase()}
          </Avatar>
        } 

        title={user && user.username}
        />
        <CardContent>
          <Stack direction='column' >
          <TextField onFocus={() => setCreate(true)} variant='outlined' label="What's on your mind?"/>
          </Stack>
        </CardContent>
      </>
      }
    </Card>
  )
}


//