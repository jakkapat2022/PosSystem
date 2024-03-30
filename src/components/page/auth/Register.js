import React,{ useState , useEffect } from 'react'
import './register.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './UserAuth'


const Register = () => {

    const { user , login_get_token } = useAuth();
    let navigate = useNavigate();
    let api_url = process.env.REACT_APP_API_URL;
    const [User , setUser] = useState('');
    const [email , setEmail] = useState('');
    const [name , setName] = useState('');
    const [password , setPass] = useState('');

    const register = async () => {
        if(User.length == 0 || password.length == 0 || email.length == 0 || name.length == 0) return alert('Please enter value');

        try {
            const regis = await axios.post(`${api_url}user/register`,{
                User,
                password,
                name,
                email
            },{
                withCredentials: true
            })

            if (!regis.data.token){
                return alert(regis.data?.message)
            }

            console.log(regis)
            await login_get_token(regis.data.token,regis.data.res.id)
            navigate("/")
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

    console.log(User)
    console.log(name)
    console.log(email)
    console.log(password)

  return (
    <div className='regis-container'>
      <div className='regis-box'>
        <div className='regis-blog'>
          <input onChange={(e) => setUser(e.target.value)} id='user' type='text' placeholder='ID'/>
          <input onChange={(e) => setName(e.target.value)} id='name' type='text' placeholder='Username'/>
          <input onChange={(e) => setEmail(e.target.value)} id='email' type='email' placeholder='Email'/>
          <input onChange={(e) => setPass(e.target.value)} id='pass' type='password' placeholder='Password'/>
          <button onClick={register} type='submit'>Register</button>
        </div>
      </div>
    </div>
  )
}

export default Register
