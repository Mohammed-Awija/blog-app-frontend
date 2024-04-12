import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import {Card, CardHeader, CardMedia, CardContent, Avatar, Typography, Grid, Menu, MenuItem, TextField, Alert, Button} from '@mui/material'
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import defaultImage from '../images/default.jpg'
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useState } from 'react';
import {useAuthContext} from '../hooks/useAuthContext'
import {usePostsContext} from '../hooks/usePostsContext'
import FavoriteIcon from '@mui/icons-material/Favorite';


export default function PostDetails({post}) {
  const [showMenu, setShowMenu] = useState(null)
  const {user} = useAuthContext()
  const {dispatch} = usePostsContext()
  const [edit, setEdit] = useState(false)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [error, setError] = useState(null)
  const [id, setId] = useState('')



const deletePost = async () => {
  try {
    const res = await fetch(`/api/v1/delete-post/${post._id}`,{
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      }
    })
    if(!res.ok){
      throw Error('Something went wrong!!!')
    }
    const json = await res.json()
    dispatch({type: 'DELETE_POST', payload: json})
    
  } catch (error) {
    console.log(error)
  }
  setShowMenu(null)
}

const editPost = (post) => {
  setTitle(post.title)
  setDescription(post.description)
  setId(post._id)
  setEdit(true)
  setShowMenu(null)
}

const handleEdit = async (e) => {
  e.preventDefault()
  if(!user){
    return setError('You must be logged in!!!')
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
    setEdit(false)
    dispatch({type: 'EDIT_POST', payload: json})
    } catch (error) {
      console.log(error)
    }
}

const likePost = async (post) => {

  if(!user){
    return setError('You must be logged in!!!')
 }
    try {
      const res = await fetch(`/api/v1/like-post/${post._id}`, {
        method: 'PATCH', 
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
    setError(null)
    dispatch({type: 'LIKE_POST', payload: json})
    } catch (error) {
      console.log(error)
    }
}



  return (
    <Card sx={{ maxWidth: '600px', margin: '15px auto' }}>
      {error && <Alert severity="warning">{error}</Alert>}
      <CardHeader 
      avatar={
          <Avatar sx={{ bgcolor: '#FF5700' }} aria-label='user'>
            {post.createdBy[0].toUpperCase()}
          </Avatar>
        } 
        action={
          <IconButton aria-label="settings" onClick={(e) => setShowMenu(e.currentTarget)}>
            <MoreVertIcon />
          </IconButton>
        }
        title={user.username === post.createdBy ? "You" : post.createdBy}
        subheader={formatDistanceToNow(new Date(post.createdAt), {addSuffix: true})}
        />
                <Menu
                id="menu-appbar"
                anchorEl={showMenu}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(showMenu)}
                onClose={() => setShowMenu(null)}
              >
                <MenuItem onClick={() => setShowMenu(null)}>Save Post</MenuItem>
                {user.username === post.createdBy ? <MenuItem onClick={() => editPost(post)}>Edit Post</MenuItem> : null}
                {user.username === post.createdBy ? <MenuItem onClick={deletePost}>Delete Post</MenuItem> : null}
            </Menu>
        <CardMedia
          component='img'
          height='280px'
          image={defaultImage}
          alt='default photo'
        />
        <CardContent  sx={{ textAlign: 'center' }}>
          {edit ? 
          <>
          <TextField value={title} onChange={(e) => setTitle(e.target.value)} variant='outlined'/>
          <TextField value={description} onChange={(e) => setDescription(e.target.value)} variant='outlined'/>
          <Button onClick={handleEdit} variant='contained'>Submit</Button>
          </>
          :
          <>
          <Typography variant='h6' color="text.secondary">{post.title}</Typography>
          <Typography variant='body2' color="text.secondary">{post.description}</Typography>
          </>
          } 
        </CardContent>
        <Grid sx={{flexGrow: 1}} container spacing={2}>
          <Grid item xs={12}>
            <Grid container justifyContent="center">
              <Grid key={0} alignItems='center' sx={{ display: 'flex' }}>
                <IconButton size='large' onClick={() => likePost(post)}>
                {post.likes.includes(user.username) ? <FavoriteIcon color='primary' /> : <FavoriteBorderOutlinedIcon color='primary' />}
                </IconButton>
                <Typography variant="subtitle2">{post.likes.length} Likes</Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
    </Card>
  )
}


//{post.likes.includes(user.username) ? <FavoriteIcon color='primary' /> : <FavoriteBorderOutlinedIcon color='primary' />}