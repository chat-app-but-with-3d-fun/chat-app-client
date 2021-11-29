import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { selectUserId } from '../features/user/userSlice'
import {useSelector} from 'react-redux'

const PublicRoute = ({component: Component, restricted, ...rest}) => {
    
    const userId = useSelector(selectUserId)
  
    return (
         <Route {...rest} render={props => (
            userId && restricted ?
                <Redirect to="/" />
            : <Component {...props} />
        )} />
    );
};

export default PublicRoute;