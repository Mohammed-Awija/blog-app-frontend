import {Card, CardHeader, CardMedia, CardContent, Avatar, TextField, Stack, Button, Alert, Typography } from '@mui/material'
import defaultImage from '../images/default.jpg'
import { useState } from 'react'
import {useAuthContext} from '../hooks/useAuthContext'
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import {usePostsContext} from '../hooks/usePostsContext'
import { inputStyle, textFieldStyle } from '../themes/defaultTheme';

export default function CreatePost() { 
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [error, setError] = useState(null)
  const [create, setCreate] = useState(false)
  const {user} = useAuthContext()
  const {dispatch} = usePostsContext()
  //image
  const [image, setImage] = useState(null)



  const selectedImage = (e) => {
    const file = e.target.files[0]
    setImage(file)
  }

  
  const handleSubmit = async (e) => {
    e.preventDefault()
    if(!user){
      return setError('You must be logged in')
   }
   if(!title || !description || !image){
    return setError('All fields are required')
   }
   const formData = new FormData();
   formData.append('title', title);
   formData.append('description', description);
   formData.append('image', image);
      try { 
        const res = await fetch('/api/v1/create-post', {
          method: 'POST', 
          body: formData,
          headers: {
            //'Content-Type': 'application/json',
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
      setImage(null)
      setError(null)
      setCreate(false)
      dispatch({type: 'CREATE_POST', payload: json})
      } catch (error) {
        console.log(error)
      }
  }





  return (
    <Card sx={{ maxWidth: '500px', margin: '15px auto', backgroundColor: '#242526' }}>
      {create ? 
      <>
      <CardHeader 
      avatar={
          <Avatar sx={{ bgcolor: '#FF5700'}} aria-label='user'>
            {user && user.username[0].toUpperCase()}
          </Avatar>
        } 
        action={
          <IconButton sx={{ color: "#b0b3b8", }} aria-label="close" onClick={() => setCreate(false)}>
            <CloseIcon  />
          </IconButton>
        }
        title={<Typography variant='subtitle1' color='	#e4e6eb'>{user && user.username}</Typography>}
        />
        <CardMedia
          component='img'
          height='280px'
          image={image ? URL.createObjectURL(image) : defaultImage}
          alt={image ? image.name : 'default image'}
        />
        <CardContent>
          <Stack spacing={1.5} direction='column' >
          {error && <Alert severity="warning">{error}</Alert>}
            <TextField sx={inputStyle} type='file' onChange={selectedImage} accept='image/*'/>
            <TextField sx={inputStyle} value={title} onChange={(e) => setTitle(e.target.value)} variant='outlined' label="Title"/>
            <TextField sx={inputStyle} value={description} onChange={(e) => setDescription(e.target.value)} multiline rows={5} label="Description..." variant='outlined'/>
            <Button onClick={handleSubmit} variant='contained'>Create Post</Button>
          </Stack>
        </CardContent>
      
      </> : 
      <Stack direction='row'>
      <CardHeader
      avatar={
          <Avatar sx={{ bgcolor: '#FF5700'}} aria-label='user'>
            {user && user.username[0].toUpperCase()}
          </Avatar>
        } 
        title={<Typography sx={{ margin: '0 -5px' }} variant='subtitle1' color='	#e4e6eb'>{user && user.username.length < 10 ? user.username : user.username.substring(0, 8)}</Typography>}
        />
        
        <CardContent>
          <TextField sx={ textFieldStyle }
        onFocus={() => setCreate(true)} variant='outlined' label="What's on your mind?"/>
        </CardContent>
      </Stack>
      }
    </Card>
  )
}
