import React , { useState , useContext , createContext } from 'react'
import { SideBar } from '../SideBar';

const NavContext = createContext();

export const Nav = ({ children }) => {

    const [showSideBar, setShowSideBar] = useState(false);
    const [pageCurent, setPageCurrent] = useState(null);

  return (
    <NavContext.Provider value={{showSideBar,setShowSideBar , pageCurent , setPageCurrent}}>
        {children}
    </NavContext.Provider>
  )
}

export function useNav(){
    return useContext(NavContext);
}


