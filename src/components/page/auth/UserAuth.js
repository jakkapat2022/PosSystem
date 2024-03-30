import { createContext, useContext ,useState ,useEffect } from "react";
import axios from "axios";
import { useCookies } from 'react-cookie'
import { checkIsAdmin } from "../../adminMangement/auth/AdminLogin";
import { Navigate } from "react-router-dom";

const UserAuthContext = createContext();

export function UserAuth ({ children }){

    const [cookies, setCookie] = useCookies(['token']);
    const [user, setID] = useCookies(['ID']);
    const [admin, setAdmin] = useCookies(['tokenAdmin']);
    let api_url = process.env.REACT_APP_API_URL;
    const [datauser,setDataUser] = useState([]);
    const [error ,setError] = useState('');
    const [checkcount ,setcheckCount] = useState(0);
   

    const getauth = async () =>{
        if(!user.ID && !user.token) return 

        try {
            const admin = new checkIsAdmin(user.token,api_url)
            const check = await admin.checkAdmin();
            setAdmin('tokenAdmin', check?.data?.token , { path: '/'});
            const res = await axios.post(`${api_url}user/get`,{},{
                headers: {
                    "x-access-token": user.token 
                }
            });

            if(res.data.message){
                setCookie('token', '', { path: '/' });
                setID('ID', '', { path: '/' });
            }

            //console.log(res.data?.message)
            setDataUser(res);
        } catch (error) {
            console.log(error)
        }
    }

    const adminLogin = async () => {
        try {
            
        } catch (error) {
            console.log(error)
        }
    }

    const login_get_token = async (tokened,id) => {
            console.log(id)
            setCookie('token', tokened, { path: '/' });
            setID('ID', id, { path: '/' });
            setcheckCount(checkcount + 1);
    }

    useEffect(() => {
        getauth();
    },[checkcount])

    console.log(checkcount)

  return (
    <UserAuthContext.Provider value={{checkcount , setcheckCount, error,setError ,adminLogin , user , datauser , login_get_token}}>
        { children }
    </UserAuthContext.Provider>
  )
}

export function useAuth (){
    return useContext(UserAuthContext);
}

