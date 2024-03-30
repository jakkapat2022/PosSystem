import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from './UserAuth'

const Protected = ({ children }) => {

    const { user } = useAuth();

    if(user.ID == undefined && user.token == undefined || user.ID == '' && user.token == ''){
        return <Navigate to="/login"/>
    }

    //console.log(user.ID)

    return children; 
}

export default Protected
