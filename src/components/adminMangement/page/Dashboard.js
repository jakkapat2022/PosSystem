import React from 'react'
import { SideBar , Container} from '../../SideBar'
import { useNav } from '../../layout/Nav'
import './css/dashboard.css'

const Dashboard = () => {
    const {showSideBar} = useNav();
  return (
    <>
    <SideBar state={true}/>
    <Container sideBar={showSideBar} className='container con-ani'>
        <div className='dash-con'>
            <div className='dash-content'>
                <h2>welcome to admin</h2>
            </div>
        </div>
    </Container>
    </>
    
  )
}

export default Dashboard
