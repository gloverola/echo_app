import React, {useState, useEffect} from 'react';
import { Avatar } from "@material-ui/core";
import {Link} from 'react-router-dom'
import useStyles from "./styles";
import echo from "../../images/echo.png";
import { useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import decode from 'jwt-decode';
import styled from 'styled-components'

const Navbar = () => {

    const classes = useStyles();

    const [ user, setUser ] = useState( JSON.parse( localStorage.getItem( 'profile' ) ) );
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();

    const logout = () => {
        dispatch( { type: 'LOGOUT' } );

        history.push( '/' );

        setUser( null );
    }

    useEffect( () => {
        const token = user?.token;

      if ( token )
      {
        const decodedToken = decode( token );

        if ( decodedToken.exp * 1000 < new Date().getTime() ) logout();
      }
         // JWT
        setUser(JSON.parse( localStorage.getItem( 'profile')))
    }, [location] );

    return (
      <Nav>
      
          <img src={echo} alt='echo' height='40' />
        {location.pathname === "/" && (
          <div>
            {user ? (
              <Profile>
                <Avatar
                  className={classes.purple}
                  alt={user.result.name}
                  src={user.result.imageUrl}
                >
                  {user?.result.name.charAt(0)}
                </Avatar>
                <LogoutButton
                  onClick={logout}
                >
                  Logout
                </LogoutButton>
              </Profile>
            ) : (
              <SigninButton
                to='/auth'
              >
                Sign In
              </SigninButton>
            )}
          </div>
        )}
      </Nav>
    );
}

export default Navbar;

const Nav = styled.nav`
  display: flex;
  background: #000;
  width: 100vw;
  height: 60px;
  z-index: 100;
  align-items: center;
  justify-content: space-around;

  @media screen and (max-width: 768px) {
    width: 100vw;
  }
`;

const Profile = styled.div`
display: flex;
margin-left: 30px;
`

const LogoutButton = styled.button`
  border: none;
  background: rgba(252, 63, 63, 0.2);
  color: rgba(252, 63, 63, 1);
  padding: 0.5rem 0.8rem;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-left: 10px;

  &:hover {
    background: rgba(252, 63, 63, 0.4);
  }
`;

const SigninButton = styled(Link)`
  background: rgba(63, 98, 252, 0.2);
  padding: 0.8rem 1rem;
  color: #3f62fc;
  border: none;
  border-radius: 5px;
  font-weight: bold;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(63, 98, 252, 0.4);
  }
`;
