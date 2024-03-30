import React, { useState } from 'react'
import styled from 'styled-components'
import axios from 'axios';
let api_url = process.env.REACT_APP_API_URL

const ModalActive = styled.div`
    visibility: ${({ show }) => (show ? 'visible' : 'hidden')};
`;

const Callbill = ({ setCookie, setState, show , bill ,setBill ,sethidden , setCount ,count ,current}) => {

    const handle_setbill = async (e) => {

        setBill(e.target.id)
        sethidden(false)
        current(e.target.id)
        setCookie('bill', e.target.id, { path: '/' })
        setCount(count + 1)
        setState(0)
        
        try {
            await axios.post(`${api_url}bills/update/status`,{
                bill_id:  e.target.id,
                status : 2
            });

           

        } catch (error) {
            console.log(error)
        }
       
    }

  return (
    <ModalActive show={show} className='modal'>
      <div className='modal-header'>
        <h3>บิลเลขที่</h3>
        <h3>จำนวนเงิน</h3>
      </div>
      <div className='modal-item'>
        {bill[0]?.data?.rows.length == 0 && 
            <div className='modal-content'>
                <h3>ไม่มีบิลที่พักไว้</h3>
            </div>
        }
        {bill[0]?.data?.rows.map((d,index) => (
            <div key={index} className='modal-content'>
                <h3>{d.name}</h3>
                <h3>{d.total}</h3>
                <button id={d.name} onClick={handle_setbill}>เรียกบิล</button>
            </div>
        ))}
      </div>
    </ModalActive>
  )
}

export default Callbill
