import React,{ useEffect , useState} from 'react'
import { SideBar , Container} from '../../SideBar'
import { useNav } from '../../layout/Nav'
import TotalOparating from '../component/dashbroad/TotalOparating'
import SearchOparating from '../component/dashbroad/SearchOparating'
import './css/dashboard.css'

const Dashboard = () => {
    const {showSideBar} = useNav();
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();

  return (
    <>
    <SideBar state={true}/>
    <Container sideBar={showSideBar} className='container con-ani'>
        <div className='dash-con'>
          <div className='dash-grid'>
            <SearchOparating
              setEndDate={setEndDate}
              setStartDate={setStartDate}
              startDate={startDate}
              endDate={endDate}
            />
            <TotalOparating
              start={startDate}
              end={endDate}
            />
          </div>
        </div>
    </Container>
    </>
    
  )
}

export default Dashboard
