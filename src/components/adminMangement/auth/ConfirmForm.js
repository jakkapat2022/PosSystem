import React,{ useState } from 'react'
import { useAuth } from '../../page/auth/UserAuth'
import '../page/css/confirmform.css'
import axios from 'axios';
let api_url = process.env.REACT_APP_API_URL

const ConfirmForm = ({ functionNext , handleShow}) => {

    const { user } = useAuth();
    const [pass,setPass] = useState('');

    const handle_next = async (functionNext,User,password) => {

        try {
            const data = await axios.post(`${api_url}user/login`,{
                User,
                password
            })

            if(data.data.token){
                return await functionNext()
            } else {
                return alert('รหัสผิด')
            }
            
        } catch (error) {
            console.log(error)
        }
    }

  return (
    <>
    <div id='back-drop' onClick={() => handleShow(false)}></div>
    <div className='admin-confirm'>
      <div className='form'>
        <strong>Admin: {user.ID}</strong>
        <input onChange={(e) => setPass(e.target.value)} placeholder='password.....' type='password' autoComplete='off'/>
        <button onClick={() => handle_next(functionNext,user.ID,pass)}>ยืนยัน</button>
      </div>
    </div>
    </>
  )
}

export default ConfirmForm
