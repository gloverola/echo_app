import React, { useState } from "react";
import {
  Button,
  Grid,
} from "@material-ui/core";
import useStyles from "./styles";
import Input from "./Input";
import { GoogleLogin } from "react-google-login";
import Icon from './icon'
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { signin, signup } from '../../actions/auth';
import styled from 'styled-components';
import crowd from '../../images/crowd.jpg';
import echo from '../../images/echo.png'

const initialState = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: ''
}

const Auth = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [ isSignup, setIsSignup ] = useState( false );
  const [ formData, setFormData ] = useState( initialState );
    
    const dispatch = useDispatch();
    const history = useHistory();

  const classes = useStyles();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isSignup)
    {
      dispatch(signup(formData, history))
    } else
    {
      dispatch(signin(formData, history));
    }
  };

  const handleChange = ( e ) => {
    setFormData( { ...formData, [ e.target.name ]: e.target.value } );
  };

  const handleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const switchMode = () => {
    setIsSignup((prevIsSignup) => !prevIsSignup);
    setShowPassword(false);
  };
    
    const googleSuccess = async (res) => {
        const result = res?.profileObj;
        const token = res?.tokenId;

        try {
            dispatch( { type: 'AUTH', data: { result, token } } );
            history.push( '/' );
        } catch (error) {
            console.log(error);
        }
    }

    const googleFailure = ( error ) => {
        console.log(error);
        console.log("Google Sign In was unsuccessful. Try Again Later");
    };

  return (
    <Container>
      <LeftSide img={ crowd }>
        <h2>Your Space To Be Social.</h2>
        <span>See what people are up to, and join the conversation.</span>
      </LeftSide>
      <FormWrapper>
        <img src={echo} alt="logo" height="50px"/>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {isSignup && (
              <>
                <Input
                  name='firstName'
                  label='First Name'
                  handleChange={handleChange}
                  autoFocus
                  half
                ></Input>
                <Input
                  name='lastName'
                  label='Last Name'
                  handleChange={handleChange}
                  half
                ></Input>
              </>
            )}
            <Input
              name='email'
              label='Email Address'
              handleChange={handleChange}
              type='email'
            />
            <Input
              name='password'
              label='Password'
              handleChange={handleChange}
              type={showPassword ? "text" : "password"}
              handleShowPassword={handleShowPassword}
            />
            {isSignup && (
              <Input
                name='confirmPassword'
                label='Confirm Password'
                handleChange={handleChange}
                type='password'
              />
            )}
          </Grid>

          <LoginButton
            type='submit'
            fullWidth
            variant='contained'
            color='primary'
            className={classes.submit}
          >
            {isSignup ? "Sign Up" : "Login"}
          </LoginButton>
          <GoogleLogin
            clientId='716651834642-m3468l1utbd8qd33ss7u3f456abf81o5.apps.googleusercontent.com'
            render={(renderProps) => (
              <GoogleButton
                className={classes.googleButton}
                color='primary'
                fullWidth
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
                startIcon={<Icon />}
                variant='contained'
              >
                Google Sign In
              </GoogleButton>
            )}
            onSuccess={googleSuccess}
            onFailure={googleFailure}
            cookiePolicy='single_host_origin'
          />
          <Grid container justify='center'>
            <Grid item>
              <Button onClick={switchMode}>
                {isSignup
                  ? "Already have an account? Sign In"
                  : "Don't have an account? Sign Up"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </FormWrapper>
    </Container>
  );
};

export default Auth;

const Container = styled.main`
height: 100vh;
width: 100vw;
display: flex;
flex-direction: row;

@media screen and (max-width: 768px) {
  flex-direction: column;
  width: 100%;
}

`

const LeftSide = styled.div`
  display: flex;
  flex-direction: column;
  width: 70%;
  height: 100vh;
  background: url(${(props) => props.img});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  align-items: center;
  justify-content: center;

  @media screen and (max-width: 768px) {
    height: 30%;
    width: 100%;
  }

  h2 {
    color: #fff;
    font-size: 4rem;

    @media screen and (max-width: 768px) {
      font-size: 2rem;
    }
  }

  span {
    color: rgba(223, 223, 223, 0.5);
    font-size: 2rem;
    margin: 0;
    text-align: center;

    @media screen and (max-width: 768px) {
      font-size: 1rem;
    }
  }
`;

const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  align-items: center;
  justify-content: center;
  background: #fff;
  padding: 0 2rem;

  @media screen and (max-width: 768px) {
    height: 100%;
    width: 100%;
    padding: 0;
  }
`;

const LoginButton = styled.button`
  background: rgba(63, 98, 252, 0.2);
  width: 100%;
  padding: 0.8rem;
  color: #3f62fc;
  border: none;
  border-radius: 5px;
  font-weight: bold;
  cursor: pointer;
  transition: all .3s ease;

  &:hover {
    background: rgba(63, 98, 252, 0.4);
  }
`;

const GoogleButton = styled.button`
  background: rgba(252, 63, 63, 0.2);
  width: 100%;
  padding: 0.8rem;
  color: #fc3f3f;
  border: none;
  border-radius: 5px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(252, 63, 63, 0.4);
  }
`;