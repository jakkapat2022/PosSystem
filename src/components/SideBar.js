import React, {useState} from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { FaBars } from "react-icons/fa6";
import { GrClose } from "react-icons/gr";
import { SidebarData } from './SideBarData';
import { AdminSidebarData } from './adminMangement/component/AdminsidebarData';
import { IconContext } from 'react-icons';
import SubMenu from './SubMenu';
import { useAuth } from './page/auth/UserAuth'
import { Navigate , useNavigate} from 'react-router-dom';
import { useCookies } from 'react-cookie'
import { useNav } from './layout/Nav';
import './sidebar.css'

const SidebarNav = styled.nav`
    left: ${({ sidebar }) => (sidebar ? '0' : '-100%')};
`;

export const Container = styled.div`
    margin-left: ${({ sideBar }) => (sideBar ? '210px' : '0')};
`

export const SideBar = ({ state=false }) => {

    let navigate = useNavigate();
    const { showSideBar , setShowSideBar } = useNav();
    const {datauser, setcheckCount} = useAuth();
    const [sidebar , setSidebar] = useState(false);
    const [cookie, setCookie] = useCookies(['ID']);
    const showSidebar = () => {
        setShowSideBar(!showSideBar)
        console.log(showSideBar)
    }

    console.log(state)

    const logOut = async() => {
        try {
            setCookie('ID', '', { path: '/' });
            setCookie('token', '', { path: '/' });
            setCookie('tokenAdmin', '', { path: '/' });
            return <Navigate to="/login"/>
        } catch (error) {
            console.log(error)
        }
    }
  return (
    <>
    <IconContext.Provider value={{ color: '#fff'}}>
    <nav className='nav'>
        <div className='nav-icon'>
            <FaBars onClick={showSidebar}/>
        </div>
    </nav>
    <SidebarNav sidebar={showSideBar} className='sidebar-nav'>
        <div className='sidebar-wrap'>
            <div className='nav-icon'>
                <GrClose onClick={showSidebar}/>
            </div>
            {state ? 
            <>
            {AdminSidebarData.map((item,index) => {
                return <SubMenu  item={item} id={index} key={index}/>
            })}
            </> :
            <>
            {SidebarData.map((item,index) => {
                return <SubMenu item={item} id={index} key={index}/>
            })}
            </>
             }
            
        </div>
        <div className='sidebar-user'>
            <div className='user'>
                <div className='user-img'>
                    <img src='https://images.unsplash.com/photo-1500048993953-d23a436266cf?q=80&w=1469&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' alt='person'/>
                </div>
                <h3>{datauser?.data?.id}</h3>
                
            </div>
            <button onClick={logOut}>Logout</button>
            {/* <button onClick={logOut}>Logout</button> */}
        </div>
        
    </SidebarNav>
    </IconContext.Provider>
    </>
  )
}
