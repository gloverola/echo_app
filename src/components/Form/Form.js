import React, {useState, useEffect} from 'react';
import useStyles from './styles';
import FileBase from 'react-file-base64';
import { useDispatch } from "react-redux";
import { createPost, updatePost } from "../../actions/posts";
import { useSelector } from "react-redux"; 
import styled from 'styled-components';

const Form = ({currentId, setCurrentId}) => {
     const [postData, setPostData] = useState({
       message: "",
       tags: "",
       selectedFile: "",
     });
    const post = useSelector( ( state ) => currentId ? state.posts.find((p) => p._id === currentId) : null );

    const dispatch = useDispatch();

    const user = JSON.parse(localStorage.getItem("profile"));

    useEffect( () => {
        if ( post ) setPostData( post );
   }, [post])

    const classes = useStyles();

    const handleSubmit = (e) => {
        e.preventDefault();

        if ( currentId )
        {
            dispatch(
              updatePost(currentId, { ...postData, name: user?.result?.name })
            );
        } else
        {
            dispatch(createPost({ ...postData, name: user?.result?.name }));
        }

        clear();
    };

    const clear = () => {
        setCurrentId( null );
        setPostData( { message: "", tags: '', selectedFile: '' } );
    };

    return (
      <FormWrapper>
        <form
          autoComplete='off'
          noValidate
          className={`${classes.root} ${classes.form}`}
          onSubmit={handleSubmit}
        >
          <textarea
            rows='3'
            placeholder='Echo something...'
            name='message'
            label='Message'
            value={postData.message}
            onChange={(e) =>
              setPostData({ ...postData, message: e.target.value })
            }
          />

          <input
            placeholder='#tags'
            type='text'
            name='tags'
            label='Tags'
            value={postData.tags}
            onChange={(e) =>
              setPostData({ ...postData, tags: e.target.value.split(",") })
            }
          />

          <div className='bottom'>
            <FileBase
              className='custom-file-input'
              type='file'
              multiple={false}
              onDone={({ base64 }) =>
                setPostData({ ...postData, selectedFile: base64 })
              }
            />
            <EchoButton
              
              type='submit'
            >
              Echo
            </EchoButton>
          </div>
        </form>
      </FormWrapper>
    );
}

export default Form;

const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 40%;

  @media screen and (max-width: 768px) {
    width: 96%;
  }

  form {
    width: 100%;
    display: flex;
    flex-direction: column;
    border: 1px solid #eee;

    @media screen and (max-width: 768px) {
      width: 100%;
    }

    textarea {
      background: transparent;
      border: none;
      outline: none;
      padding: 5px;
      border-top: 1px solid #eee;
    }

    input {
      background: transparent;
      border: none;
      outline: none;
      padding: 5px;
      border-bottom: 1px solid #eee;
    }

    .bottom {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 10px;
      width: 100%;
      height: 100%;

      @media screen and (max-width: 768px) {
        display:grid;
        grid-template-columns: 1fr;
      }
    }

    
  }
`;

const EchoButton = styled.button`
  background: rgba(63, 98, 252, 0.2);
  padding: .5rem 1rem;
  color: #3f62fc;
  border: none;
  border-radius: 5px;
  font-weight: bold;
  margin-bottom: 5px;
  margin-right: 5px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(63, 98, 252, 0.4);
  }
`;