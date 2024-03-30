import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Read_bill = ({  bills_data, setBill , billId , count , setCount ,total}) => {

    let api_url = process.env.REACT_APP_API_URL;
    const apiUrl = `${api_url}bills/getproduct`
    const query = `?bill_id=${billId}`
    const [data, setData] = useState([]);

    const get_data = async () => {
        try {
          const data = await axios.post(apiUrl + query)
          setData([data]);
          total(data?.data?.total)
          bills_data([data?.data?.data2]);
        } catch (error) {
          console.log({ error : error})
        }
    }
    
    const handle_delete = async (data) => {
      //console.log(test)
      let date = new Date();
      let newbill = Date.now() + date.getDate();
      let countt = 1;
      try {
        await axios.delete(`${api_url}bills/delete/${billId}/${data.id}/${data.id_pdt}`).then((response) => {
          
          countt = response?.data?.data
          if(countt == 0){
            setBill(newbill)
          }
        })

        setCount(count + 1)
      } catch (error) {
        console.log({ error : error})
      }
    }

    //data[0]?.data?.rows.map(add_price);

    useEffect(() => {
        get_data();
    },[count])
    
    //console.log(data[0]?.data?.data.length)
  return (
    <div className='box'>
      <div className='box-item-header'>
          <div className='box-name'>
            <h3>ลำดับ</h3>
          </div>  
            <h3>ราคา</h3>
        </div>
     { data[0]?.data?.data.map((data,idx) => (
        <div onClick={() => handle_delete(data)} id={data.id} key={idx} className='box-item'>
          <div id={data.id} className='box-name'>
            <h3 id={data.id}>{idx + 1}</h3>
            <h4 id={data.id}>{data.name}</h4>
          </div>  
            <h3 id={data.id}>{(data.price).toFixed(2)}</h3>
        </div>
     ))}
    </div>
  )
}

export default Read_bill 
