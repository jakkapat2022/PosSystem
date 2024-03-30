import React,{ useState , useEffect } from 'react'
import axios from 'axios';
import { BiSearchAlt2 } from "react-icons/bi";
import { TiArrowSortedDown } from "react-icons/ti";
import { TiArrowSortedUp } from "react-icons/ti";

const AddCateogry = ({isProductPointActive=false, option , all , getProductPoint}) => {
    const [cateogry_data ,setCateogry] = useState([]);
    let api_urls = process.env.REACT_APP_API_URL;
    const api_url = `${api_urls}productstocks/get/cateogry`

    //dropdown state 
    const [isActive, setIsActive] = useState(false);
    const [selected ,setSelected] = useState(null);
    //const option_value = ["ขนม", "นม" , "เนย","เบียร", "ของใช้" , "บะหมี่กึ่งสำเร็จรูป"];
    const [search, setSearch] = useState('');

    const get_data = async () => {
        try {
            const data = await axios.get(api_url)
            return setCateogry([data])
        } catch (error) {
            console.log(error)
        }
    }

    const selecteds = (e) => {
        if(all){
            isProductPointActive(false);
        }
        setSelected(e.target.textContent);
        setIsActive(false);
        option(e.target.textContent)
    }

    useEffect(() => {
        get_data();
    },[]);

    //console.log(cateogry_data);

  return (
    <div className='dropdown'>
        <div className='dropdown-btn' onClick={(e) => setIsActive(!isActive)}>
            {selected || 'หมวดหมู่สินค้า'}
            { isActive ? <TiArrowSortedUp/> : <TiArrowSortedDown/>}
        </div>
        {isActive && (
            <div className='dropdown-input'>
                <input onChange={(e) => setSearch(e.target.value)} id='search' type='text' placeholder='ค้นหา' />
                <BiSearchAlt2 className='sea-icon'/>
            </div>
        )}
        {isActive && (
        <div className='dropdown-blog' >
                
                <div className='dropdown-content'>
                {all && 
                <>
                <div onClick={(e) => {
                    isProductPointActive(false);
                    setSelected('');
                    setIsActive(false);
                    option('')
                    }} className='dropdown-item'>สินค้าทั้งหมด
                </div>
                <div onClick={(e) => {
                    setSelected('สินค้าปักหมุด');
                    setIsActive(false);
                    getProductPoint();
                    option('สินค้าปักหมุด');
                    isProductPointActive(true);
                    }} className='dropdown-item'>สินค้าปักหมุด
                </div>
                </>
                }
                    {cateogry_data[0]?.data?.filter((data) => data.cateogry_name.startsWith(search)).map((val,id) => (
                        <div key={id} 
                        onClick={selecteds}
                        className='dropdown-item'>
                        {val.cateogry_name}
                        </div>
                    ))}
                </div>
        </div>
        )}
    </div>
  )
}

export default AddCateogry
