import React from 'react'
import Post from './Post/Post'
import useStyles from './styles';
import { Grid, CircularProgress, AppBar, Typography } from '@material-ui/core';
import echo from "../../images/echo.png";
import { useSelector } from 'react-redux';

const Posts = ({setCurrentId}) => {

  const classes = useStyles();
  const posts = useSelector( ( state ) => state.posts );
  
  console.log( posts );
  
    return !posts.length ? (
      <CircularProgress />
    ) : (
      <Grid
        className={classes.container}
        container
        alignItems='stretch'
        spacing={3}
      >
        <AppBar className={classes.appBar} position='static' color='inherit'>
          <Typography className={classes.heading} variant='h2' align='center'>
            Echo
          </Typography>
          <img className={classes.image} src={echo} alt='echo' height='60' />
        </AppBar>
        {posts.map((post) => (
          <Grid key={post.id} item xs={12} sm={6}>
            <Post post={post} setCurrentId={setCurrentId} />
          </Grid>
        ))}
      </Grid>
    );
}

export default Posts;
