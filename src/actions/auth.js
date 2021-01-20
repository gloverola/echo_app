import { AUTH } from '../constants/actionTypes';
import * as api from '../api/index';

export const signin = ( formData, history ) => async ( dispatch ) => {
    try
    {
        // login the user...
        const { data } = await api.signin( formData );

        dispatch( { type: AUTH, data } );
        
        history.push( "/" );
    } catch ( error )
    {
        
    }
};

export const signup = ( formData, history ) => async ( dispatch ) => {
    try
    {
      // sign up the user...
        const { data } = await api.signup(formData);

        dispatch({ type: AUTH, data });

      history.push("/");
    } catch ( error )
    {
        
    }
};