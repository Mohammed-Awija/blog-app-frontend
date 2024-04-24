import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import {Card, CardHeader, CardMedia, CardContent, Avatar, Typography, Grid, Menu, MenuItem, TextField, Alert, Button, Collapse, Stack, InputAdornment} from '@mui/material'
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useState } from 'react';
import {useAuthContext} from '../hooks/useAuthContext'
import {usePostsContext} from '../hooks/usePostsContext'
import FavoriteIcon from '@mui/icons-material/Favorite';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import SendIcon from '@mui/icons-material/Send';
import {inputStyle, menu, style} from '../themes/defaultTheme.js'



export default function PostDetails({post}) {
  //hooks
  const {user} = useAuthContext()
  const {dispatch} = usePostsContext()

  //inputs
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [image, setImage] = useState(null)
  const [comment, setComment] = useState('')
  const [commentId, setCommentId] = useState(null)
  const [reply, setReply] = useState('')

  const [error, setError] = useState(null)
  const [id, setId] = useState('')
  const [edit, setEdit] = useState(false)
  const [expanded, setExpanded] = useState(false);
  const [showMenu, setShowMenu] = useState(null)
  const [showFullDescription , setShowFullDescription] = useState(false)

  const selectedImage = (e) => {
    const file = e.target.files[0]
    setImage(file)
  }
 

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
  setImage(null)
  setId(post._id)
  setEdit(true)
  setShowMenu(null)
}

const handleEdit = async (e) => {
  e.preventDefault();
  if (!user) {
    return setError('You must be logged in!!!');
  }
  if (id === null) {
    return setError('Post id not found');
  }
  if(post.title === title && post.description === description && image === null){
    setEdit(false);
    setTimeout(() => {
      setError(null)
    }, 3000)
    return setError('No no changes are made')
  }
  const formData = new FormData();
  formData.append('title', title);
  formData.append('description', description);
  formData.append('image', image); // Append the file data to the form data

  try {
    const res = await fetch(`/api/v1/edit-post/${id}`, {
      method: 'PATCH',
      body: formData, // Send form data instead of JSON.stringify
      headers: { 
        'Authorization': `Bearer ${user.token}`
      }
    });
    const json = await res.json();
    if (!res.ok) {
      setError(json.error);
      return;
    }
    setTitle('');
    setDescription('');
    setError(null);
    setEdit(false);
    setImage(null)
    dispatch({ type: 'EDIT_POST', payload: json });
  } catch (error) {
    console.log(error);
  }
};

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

const handleComment = async (post) => {
  if(!comment){
    return setError("Field is required")
  }
  try {
    const res = await fetch(`/api/v1/comment-post/${post._id}`, {
      method: 'PATCH',
      body: JSON.stringify({
        comment: comment,
      }),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      }
    })
    const json = await res.json() 
    if(!res.ok){ 
      setError(json.error)
      return
  }
  setError(null)
  dispatch({type: 'COMMENT_POST', payload: json})
  setComment('')
  } catch (error) {
    console.log(error)
  }
}

const submitReply = async (post, commentId, reply) => {
  if(!reply){
    return setError("Field is required")
  }
  try {
    const res = await fetch(`/api/v1/reply-post/${post._id}/${commentId}`, {
      method: 'PATCH',
      body: JSON.stringify({
        reply: reply,
      }),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      }
    })
    const json = await res.json()
    if(!res.ok){
      setError(json.error)
      return
    }
    setError(null)
    dispatch({type: 'REPLY_POST', payload: json})
    setReply('')
    setCommentId(null)
  } catch (error) {
    console.log(error)
  }
}

  return (
    <Card sx={{ maxWidth: '500px', margin: '15px auto', backgroundColor: '#242526' }}>
      {error && <Alert severity="warning">{error}</Alert>}
      <CardHeader 
      avatar={
          <Avatar sx={{ bgcolor: '#FF5700' }} aria-label='user'>
            {post.createdBy[0].toUpperCase()}
          </Avatar>
        } 
        action={
          <IconButton sx={{ color: style.textColor }} aria-label="settings" onClick={(e) => setShowMenu(e.currentTarget)}>
            {user && user.username === post.createdBy ? <MoreVertIcon /> : null}
          </IconButton>
        }
        title={user.username === post.createdBy ? <Typography variant='subtitle1' color='	#e4e6eb'>You</Typography> : <Typography variant='subtitle1' color='	#e4e6eb'>{post && post.createdBy}</Typography>}
        subheader={<Typography color={style.textColor} variant='subtitle2'>{formatDistanceToNow(new Date(post.createdAt), {addSuffix: true})}</Typography>}
        />
                <Menu
                sx={menu}
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
                <MenuItem onClick={() => editPost(post)}>Edit Post</MenuItem>
                <MenuItem onClick={deletePost}>Delete Post</MenuItem>
            </Menu>
            {edit ? 
              <CardMedia
                component='img'
                height='280px'
                image={post.imageUrl}
                alt={post.imageName}
              />
            : 
              <CardMedia
                sx={{ width: '100%' }}
                component='img'
                height='280px'
                image={image ? URL.createObjectURL(image) : post.imageUrl}
                alt={post.imageName}
              />
                    }
        <CardContent  sx={{ textAlign: 'center' }}>
          {edit ? 
          <Stack spacing={1}>
          <TextField sx={ inputStyle } type='file' onChange={selectedImage} accept='image/*'/>
          <TextField sx={ inputStyle } value={title} onChange={(e) => setTitle(e.target.value)} variant='outlined'/>
          <TextField multiline rows={Math.max(Math.ceil(description.length / 40), 2)} sx={ inputStyle }  value={description} onChange={(e) => setDescription(e.target.value)} variant='outlined'/>
          <Button onClick={handleEdit} variant='contained'>Submit</Button>
          <Button onClick={() => setEdit(false)} variant='outlined'>Cancel</Button>
          </Stack>
          :
          <Stack>
          <Typography sx={{ margin: '10px 0' }} variant='h5' color={style.textColor}>{post.title}</Typography>
          <Typography multiline  variant='subtitle1' color={style.textColor}>
            {showFullDescription ? post.description : `${post.description.slice(0, 300)}...`}
            
            {post.description.length > 100 && !showFullDescription && (
              <Button size='small' onClick={() => setShowFullDescription(true)}>Read more</Button>
            )}
            {showFullDescription && <Button size='small' onClick={() => setShowFullDescription(false)}>Read less</Button>}
          </Typography> 
          </Stack>
          } 
        </CardContent>
        <Stack>
            <Grid container justifyContent="space-around" >
              <Grid alignItems='center' sx={{ display: 'flex' }}>
                <IconButton size='large' onClick={() => likePost(post)}>
                {post.likes.includes(user.username) ? <FavoriteIcon color='primary' /> : <FavoriteBorderOutlinedIcon color='primary' />}
                </IconButton>
                <Typography color={style.textColor} ml="-10px" variant="subtitle2">{post.likes.length} Likes</Typography>
              </Grid>
              <Grid alignItems='center' sx={{ display: 'flex' }}>
                <IconButton onClick={() => setExpanded(!expanded)}>
                <ChatBubbleIcon color='primary' />
                <Typography color={style.textColor} ml="4px" variant="subtitle2">Comments</Typography>
                </IconButton>
              </Grid> 
            </Grid>
        </Stack>
        <Collapse sx={{ width: '100%'}} in={expanded}>
          <CardContent>
          <Stack direction='row' sx={{ maxWidth:'450px', margin: '0 auto'}}>
            <TextField value={comment} onChange={(e) => setComment(e.target.value)} variant='outlined' InputProps={{
              sx: { borderRadius: 25, height: '35px', width: '450px', color: style.textColor},
              endAdornment: (
              <InputAdornment position='end' sx={{
                marginRight: '-10px',
                }}>
                <IconButton onClick={() => handleComment(post)}>
                  <SendIcon color='primary' />
                </IconButton>
              </InputAdornment>)}} 
            />
          </Stack>
          {post.comments.map((comment) => (
            <Stack key={comment._id} direction="row" sx={{ alignItems: 'center'}}>
              <Stack m={1} spacing={1} direction='column' sx={{ width: '100%' }} >
                <Stack spacing={1} direction='row' sx={{ alignItems: 'center' }}>
                  <Avatar  sx={{ bgcolor: '#FF5700', width: 30, height: 30 }} aria-label='user'>
                  <Typography variant='subtitle1'>{post.createdBy[0].toUpperCase()}</Typography>
                  </Avatar>
                  <Typography color={style.textColor} variant='subtitle1'>{comment.createdBy}</Typography>
                </Stack>
                <Typography sx={{
                borderRadius: '10px', 
                backgroundColor: style.darkBgColor ,
                padding: '10px',
                wordWrap: "break-word",
                color: style.textColor,
                width: comment.comment.length * 8
                }} variant='subtitle2'>{comment.comment}</Typography>
                <Stack sx={{ maxWidth: '440px'}}>
                {commentId === comment._id ? 
                  <Stack spacing={1} direction="row">
                  <TextField onChange={(e) => setReply(e.target.value)} variant='outlined' InputProps={{
                  sx: { borderRadius: 25, height: '35px', maxWidth: '400px', width: '380px', color: style.textColor},
                  endAdornment: (
                  <InputAdornment position='end' sx={{
                  marginRight: '-10px',
                }}>
                <IconButton onClick={() => submitReply(post, commentId, reply)}>
                  <SendIcon color='primary' />
                </IconButton>
                </InputAdornment>)}} 
                />
                <Typography sx={{ "&:hover" : {cursor: "pointer"}}} color="primary" onClick={() => setCommentId(null)} variant='subtitle2'>Cancel</Typography>
              </Stack> :
                    <Typography sx={{ "&:hover" : {cursor: "pointer"} }} color="primary" onClick={() => setCommentId(comment._id)} variant='subtitle2'>Reply</Typography>
                  }
                </Stack>
                {comment.replies && comment.replies.map((re) => 
                <Stack key={re._id}>
                    <Stack spacing={1} direction='row' sx={{ alignItems: 'center', margin: '0px 20px' }}>
                    <Avatar  sx={{ bgcolor: '#FF5700', width: 30, height: 30 }} aria-label='user'>
                    <Typography variant='subtitle1'>{re.createdBy[0].toUpperCase()}</Typography>
                    </Avatar>
                    <Typography color={style.textColor} variant='subtitle1'>{re.createdBy}</Typography>
                    </Stack>
                    <Typography sx={{
                    borderRadius: '10px', 
                    backgroundColor: style.darkBgColor ,
                    padding: '10px',
                    wordWrap: "break-word",
                    color: style.textColor,
                    width: re.reply.length * 8,
                    margin: '5px 20px'
                    }} variant='subtitle2'>{re.reply}</Typography>
                </Stack>
              )}
              </Stack>
            </Stack>
          ))}
          </CardContent>
        </Collapse>
    </Card>
  )
}

