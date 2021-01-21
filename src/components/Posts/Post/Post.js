import React from 'react';
import { CardActions} from '@material-ui/core';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbUpAltOutlined from "@material-ui/icons/ThumbUpAltOutlined";
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import useStyles from './styles';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { deletePost, likePost } from '../../../actions/posts';
import styled from 'styled-components'

const Post = ( { post, setCurrentId } ) => {
    
    const classes = useStyles();
  const dispatch = useDispatch();
  const user = JSON.parse( localStorage.getItem( "profile" ) );
  
  console.log(post);
  
   const Likes = () => {
     if (post.likes.length > 0) {
       return post.likes.find(
         (like) => like === (user?.result?.googleId || user?.result?._id)
       ) ? (
         <>
           <ThumbUpAltIcon fontSize='small' />
           &nbsp;
           {post.likes.length > 2
             ? `You and ${post.likes.length - 1} others`
             : `${post.likes.length} like${post.likes.length > 1 ? "s" : ""}`}
         </>
       ) : (
         <>
           <ThumbUpAltOutlined fontSize='small' />
           &nbsp;{post.likes.length}{" "}
           {post.likes.length === 1 ? "Like" : "Likes"}
         </>
       );
     }

     return (
       <>
         <ThumbUpAltOutlined fontSize='small' />
         &nbsp;Like
       </>
     );
   };

    return (
      <PostCard>
        <div className='top'>
          <div className='user-info'>
            <span className='user'>{post.name}</span>
            <span className='time'>{moment(post.createdAt).fromNow()}</span>
          </div>
          {(user?.result?.googleId === post?.creator ||
            user?.result?._id === post?.creator) && (
            <div>
              <Button
                style={{ color: "#7f7f7f" }}
                size='small'
                onClick={() => setCurrentId(post._id)}
              >
                <MoreHorizIcon fontSize='default' />
              </Button>
            </div>
          )}
        </div>
        <CardContents>
          <h5 className='message'>{post.message}</h5>
          <span className='tag'>{post.tags.map((tag) => `#${tag} `)}</span>

          {post?.selectedFile && (
            <img
              className='media'
              src={post.selectedFile || null}
              alt={post.title}
            />
          )}
        </CardContents>

        <CardActions className={classes.cardActions}>
          <Button
            size='small'
            color='primary'
            disabled={!user?.result}
            onClick={() => dispatch(likePost(post._id))}
          >
            <Likes />
          </Button>
          {(user?.result?.googleId === post?.creator ||
            user?.result?._id === post?.creator) && (
            <Button
              size='small'
              color='primary'
              onClick={() => dispatch(deletePost(post._id))}
            >
              <DeleteIcon fontSize='small' /> Delete
            </Button>
          )}
        </CardActions>
      </PostCard>
    );
}

export default Post

const PostCard = styled.article`
  height: 100%;

  .top {
    display: flex;
    justify-content: space-between;
  }

  .media {
    height: 300px;
    width: 100%;
    border-radius: 5px;
  }

  .user-info {
    display: flex;
    flex-direction: column;
  }

  .user {
    font-size: 1rem;
    color: #7c7b7b;
  }

  .time {
    font-size: 0.7rem;
    color: #bcbcbc;
  }
`;

const CardContents = styled.div`
  padding: 1rem 2rem;
  margin-bottom: 10px;

  .message {
    color: #7f7f7f;
    font-size: 1rem;
  }

  .tag {
    color: #009dff;
    cursor: pointer;
  }
`;
