
import React,{ useEffect ,useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { getdataDashBroad } from './getdataDashBroad';
let api_url = process.env.REACT_APP_API_URL

const TotalBill = ({ start , end }) => {
 

  const [income,setIncome] = useState({})

    const result = {}

    const getApi = async () => {
        const _class = new getdataDashBroad(api_url,start,end)
        const result = await _class.getTotalOpaSelected();
        setIncome(result.data)
        
    }

    const totals = Object.keys(income).map(index => (
        result[index] = {
            income:income[index].reduce((acc, curr) => parseFloat(acc) + parseFloat(curr.total), 0)
        }
    ))

    const chartData = Object.keys(result).map(date => ({ date, income: result[date].income }));

    useEffect(() => {
        getApi();
    },[start,end])

  return (
    <BarChart className='table-income'
      width={500}
      height={300}
      data={chartData}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="date" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="income" fill="#8884d8" />
    </BarChart>
  );
}

export default TotalBill;
