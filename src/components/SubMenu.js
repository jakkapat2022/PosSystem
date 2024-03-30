import React,{useState} from 'react'
import { Link } from 'react-router-dom'
import { useNav } from './layout/Nav'
import styled from 'styled-components'
import { useAuth } from './page/auth/UserAuth'

const SubMenuLink = styled(Link)`
  background: ${({ currentid, idx }) => (currentid == idx ? '#202020' : '#353535')};
  border-left: ${({ currentid, idx }) => (currentid == idx && '8px solid #632ce4' )};
`

const SubMenu = ({item ,id }) => {

    const { pageCurent } = useNav();
    const {setcheckCount ,checkcount} = useAuth();
    const [subnav, setSubnav] = useState(false);

    const showSubnav = () => {
      setcheckCount(checkcount + 1)
      setSubnav(!subnav)
    };

  return (
    <>
      <SubMenuLink currentid={pageCurent} idx={id} className='sidebarLink' to={item.path} state={id} onClick={item.subNav && showSubnav}>
        <div onClick={() => setcheckCount(checkcount + 1)}>
            <span className='sidebarLable'>{item.title}</span>
        </div>
        <div>
            {item.subNav && subnav
                ? item.iconOpened
                : item.subNav
                ? item.iconClosed
                : null}
        </div>
      </SubMenuLink>
      {subnav && item.subNav.map((item,index) => {
        return (
            <Link className='dropdownLink' to={item.path} state={id} key={index}>
                <span>{item.title}</span>
            </Link>
        )
      })}
    </>
  )
}

export default SubMenu
