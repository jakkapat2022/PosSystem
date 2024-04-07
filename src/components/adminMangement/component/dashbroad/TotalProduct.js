
import React,{ useEffect ,useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { getdataDashBroad } from './getdataDashBroad';
let api_url = process.env.REACT_APP_API_URL

const TotalProduct = ({ start , end }) => {
 

  const [income,setIncome] = useState({});
  const [seclec,setSelec] = useState("day");

    const getApi = async () => {
        const _class = new getdataDashBroad(api_url,start,end,seclec)
        const result = await _class.getProductCount();
        setIncome(result.data)
        
    }
    
    console.log(income)

    const chartData = Object.keys(income).map(date => ({ date, value: income[date].value }));

    const handle_change = (seclec) => {
        setSelec(seclec)
    }

    useEffect(() => {
        getApi();
    },[start,end,seclec])

  return (
    <>
    <div className='table-income'>
    <section>
        <strong  className={seclec === "year" ? "stronged" : ""}>มากกว่า 5</strong>
        <strong  className={seclec === "month" ? "stronged" : ""}>มากกว่า 50</strong>
        <strong  className={seclec === "day" ? "stronged" : ""}>มากกว่า 100</strong>
    </section>
    <BarChart 
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
      <XAxis dataKey="date" label={{ position: 'insideBottom', offset: -5 }} tick={{ fontSize: 12 }} />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="value" fill="#8884d8" />
    </BarChart>
    </div>
    </>
  );
}

export default TotalProduct;
