import React from 'react'
import Post from './Post/Post'
import useStyles from './styles';
import { CircularProgress } from '@material-ui/core';
import { useSelector } from 'react-redux';
import styled from 'styled-components';


const Posts = ({setCurrentId}) => {

  const classes = useStyles();
  const posts = useSelector( ( state ) => state.posts );
  
  console.log( posts );
  
    return !posts.length ? (
      <CircularProgress />
    ) : (
      <
      >
        {posts.map((post) => (
          <PostWrapper key={post.id}>
            <Post post={post} setCurrentId={setCurrentId} />
          </PostWrapper>
        ))}
      </>
    );
}

export default Posts;

const PostWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 40%;
  margin: 10px 0;
  border: 1px solid rgba(232, 232, 232, 0.6);
  border-radius: 3px;
  padding: 10px;

  @media screen and (max-width: 768px) {
    width: 96%;
  }
`;
