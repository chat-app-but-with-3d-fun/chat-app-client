import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { selectUserId } from '../features/user/userSlice'
import {useSelector} from 'react-redux'


const PrivateRoute = ({component: Component, ...rest}) => {
    
    const userId = useSelector(selectUserId)

    return (
        <Route {...rest} render={props => (
            userId ?
                <Component {...props} />
            : <Redirect to="/sign-in" />
        )} />
    );
};

export default PrivateRoute;