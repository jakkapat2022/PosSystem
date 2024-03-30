import React, { useEffect, useState } from 'react'
import './ctg.css'
import DataTable from 'react-data-table-component';
import axios from 'axios';
import styled from 'styled-components';
import { SideBar,Container } from '../SideBar';
import { useNav } from '../layout/Nav';
import { useLocation } from 'react-router-dom';

let api_url = process.env.REACT_APP_API_URL

const columns = [
	{
		name: 'ลำดับ',
        sortable: true,
    cell: (row,index) => index + 1,
    grow: 0
	},
    {
		name: 'รหัส',
		selector: row => row.cateogry_code,
        sortable: true,
	},
	{
		name: 'ชื่อหมวด',
		selector: row => row.cateogry_name,
        sortable: true,

	},
];

const TextField = styled.input`
	height: 32px;
	width: 200px;
	border-radius: 3px;
	border-top-left-radius: 5px;
	border-bottom-left-radius: 5px;
	border-top-right-radius: 0;
	border-bottom-right-radius: 0;
	border: 1px solid #e5e5e5;
	padding: 0 32px 0 16px;
  outline: none;
	&:hover {
		cursor: pointer;
	}
`;

const FilterComponent = ({ filterText, onFilter, onClear }) => (
	<>
		<TextField
			id="search"
			type="text"
			placeholder="Filter By Name"
			aria-label="Search Input"
			value={filterText}
			onChange={onFilter}
		/>
		<button className='filter-btn' type="button" onClick={onClear}>
			X
		</button>
	</>
);

const Header = ({ setCtg }) => {

  return (
  <>
    <div className='ctg-table-header'>
        <div className='ctg-header'>
          <h3>หมวดหมู่สินค้า</h3>
        </div>
        <div className='ctg-add'>
          <button onClick={() => setCtg(true)}>เพิ่มหมวดหมู่</button>
        </div>
    </div>
  </>
  )
  
}

const Create_ctg = ({ setCtg }) => {

  const [name,setName] = useState('');
  const [code, setCode] = useState('');

  const create = async () => {
    if(name.length == 0 || code.length == 0) return alert('please enter value');
    try {
      const res = await axios.post(`${api_url}productstocks/post/cateogry`,{
        name,
        code
      })
      if(res?.data?.message){
        return alert("cateogry name alredy exit")
      }

      console.log(res)
      setCtg(false)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <div className='ctg-input-box'>
        <div className='input-blog'>
          <input onChange={(e) => setName(e.target.value)} placeholder='ชื่อหมวดหมู่'/>
          <input onChange={(e) => setCode(e.target.value)} placeholder='รหัสหมวดหมู่'/>
          <button onClick={create}>เพิ่มหมวดหมู่</button>
        </div>
      </div>
    </>
  )
}

const Cateogry = () => {

    const { showSideBar , setPageCurrent } = useNav();
    const state = useLocation();
    setPageCurrent(state.state)
    const [ctg, setCtg] = useState([]);
    const [createState, setCreateState] = useState(false);
    const dataM = [];

    const [filterText, setFilterText] = React.useState('');
    const [resetPaginationToggle, setResetPaginationToggle] = React.useState(false);
    

    const get = async() => {
        try {
            const res = await axios.get(`${api_url}productstocks/get/cateogry`)
            //console.log(res)
            setCtg(res)
        } catch (error) {
            console.log(error)
        }
    }

    const filteredItems = ctg?.data?.filter(
      item => item.cateogry_name && item.cateogry_name.toLowerCase().includes(filterText.toLowerCase()),
    );

    //filteredItems.data.map((val,idx) => {
      //dataM[idx] = {id: idx + 1, cateogry_name:val.cateogry_name , cateogry_code:val.cateogry_code}
    //})

    const subHeaderComponentMemo = React.useMemo(() => {
      const handleClear = () => {
        if (filterText) {
          setResetPaginationToggle(!resetPaginationToggle);
          setFilterText('');
        }
      };
  
      return (
        <>
        <FilterComponent onFilter={e => setFilterText(e.target.value)} onClear={handleClear} filterText={filterText} />
        </>
        
      );
    }, [filterText, resetPaginationToggle]);
  

    useEffect(() =>{
        get();
    },[createState])

  return (
    <>
    <SideBar state={true}/>
    <Container sideBar={showSideBar} className='container con-ani'>
      <div className='ctg-container'>
        {createState ? <Create_ctg setCtg={setCreateState}/> : <>
          <Header setCtg={setCreateState}/> 
            <div className='ctg-box'>       
              <DataTable className='ctg-table'
                columns={columns}
                data={filteredItems}
                pagination
                paginationResetDefaultPage={resetPaginationToggle}
                subHeader
                subHeaderComponent={subHeaderComponentMemo}
                persistTableHead
              />
          </div>
        </>}
      </div>
    </Container>
    </>
    
  )
}

export default Cateogry
