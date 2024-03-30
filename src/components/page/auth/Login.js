import React, { useEffect, useState } from 'react'
import './login.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './UserAuth'

const Login = () => {

  
  const { user , login_get_token , adminLogin} = useAuth();

  let navigate = useNavigate();
  let api_url = process.env.REACT_APP_API_URL;
  const [User , setUser] = useState('');
  const [password , setPass] = useState('');

  const login = async() => {

    

    if(User.length == 0 || password.length == 0) return alert('Please enter User and Password')
    try {
      
      const res = await axios.post(`${api_url}user/login`,{
        User : User,
        password : password
      })

      if (!res.data.token){
        return alert(res.data.message)
      }

      await login_get_token(res.data.token,res.data.res.id)
      navigate('/')
      
    } catch (error) {
      console.log(error)
    }
  }

  const redirect = () => {
    if(user.ID){
      navigate("/")
    }
  }
  useEffect(() => {
    redirect();
  },[user]);

  //console.log(api_url)
  //console.log(User,password)
  return (
    <div className='login-container'>
      <div className='login-box'>
        <div className='login-blog'>
          <input onChange={(e) => setUser(e.target.value)} id='user' type='text' placeholder='Username'/>
          <input onChange={(e) => setPass(e.target.value)} id='pass' type='password' placeholder='Password'/>
          <button onClick={login} >Login</button>
        </div>
      </div>
    </div>
  )
}

export default Login
