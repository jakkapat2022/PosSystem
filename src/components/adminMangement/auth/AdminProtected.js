import React, { useEffect, useState } from 'react'
import { useAuth } from '../../page/auth/UserAuth'
import { Navigate } from 'react-router-dom';
import { useCookies } from 'react-cookie'

const AdminProtected = ({ children }) => {

    const { user , setError } = useAuth();
    const [admin, setAdmin] = useCookies(['tokenAdmin']);

    if(admin.tokenAdmin == 'undefined' || admin.tokenAdmin == ''){
        setError('not admin')
        return <Navigate to={'/'}/>
    } 
    
    return children

}

export default AdminProtected
