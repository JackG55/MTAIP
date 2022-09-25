import React from 'react'
import { Navigate } from 'react-router-dom'
//import isAuthenticated from './isAuthenticated'


const isAuthenticated = () => {
    if(localStorage.getItem('account')!==null || localStorage.getItem('account')!== '')
    {
        return true;
    }
    else
    {
        return false;
    }
}

function PrivateRoute({ children, ...rest }) {
    if(isAuthenticated===true)
    {
        console.log('da ket noi')
        return children
    }
    else
    {
        console.log('chua ket noi')
        return <Navigate to = "/create" />
    }
   
}

export default PrivateRoute;

