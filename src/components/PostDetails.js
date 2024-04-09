import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import {Card, CardHeader, CardMedia, CardContent, Avatar, Typography, Grid, Stack} from '@mui/material'
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import defaultImage from '../images/default.jpg'

export default function PostDetails({post}) {
  return (
    <Card sx={{ maxWidth: '600px', margin: '15px auto' }}>
      <CardHeader 
      avatar={
          <Avatar sx={{ bgcolor: '#FF5700' }} aria-label='user'>
            {post.createdBy[0]}
          </Avatar>
        } 
        title={post.createdBy}
        subheader={formatDistanceToNow(new Date(post.createdAt), {addSuffix: true})}
        />
        <CardMedia
          component='img'
          height='280px'
          image={defaultImage}
          alt='default photo'
        />
        <CardContent>
          <Typography variant='h6' color="text.secondary">{post.title}</Typography>
          <Typography variant='body2' color="text.secondary">{post.description}</Typography>
        </CardContent>
        <Stack direction='row' sx={{ alignItems: 'center', justifyContent: 'space-between', margin: '10px 5px'}}>
            <Grid sx={{ display: 'flex', margin: '0 5px'}}>
              <FavoriteBorderOutlinedIcon />
              <Typography variant='subtitle2' sx={{ margin: '0 5px' }}>{post.likes.length} Likes</Typography>
            </Grid>
        </Stack>
    </Card>
  )
}
