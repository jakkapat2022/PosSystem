
import React,{ useEffect ,useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { getdataDashBroad } from './getdataDashBroad';
let api_url = process.env.REACT_APP_API_URL

const TotalBill = ({ start , end }) => {
 

  const [income,setIncome] = useState({});
  const [seclec,setSelec] = useState("day");

    const result = {}

    const getApi = async () => {
        const _class = new getdataDashBroad(api_url,start,end,seclec)
        const result = await _class.getTotalOpaSelected();
        setIncome(result.data)
        
    }

    const totals = Object.keys(income).map(index => (
        result[index] = {
            income:income[index].reduce((acc, curr) => parseFloat(acc) + parseFloat(curr.total), 0)
        }
    ))

    console.log(income)

    const chartData = Object.keys(result).map(date => ({ date, income: result[date].income }));

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
        <strong onClick={() => handle_change("year")} className={seclec === "year" ? "stronged" : ""}>รายปี</strong>
        <strong onClick={() => handle_change("month")} className={seclec === "month" ? "stronged" : ""}>รายเดือน</strong>
        <strong onClick={() => handle_change("day")} className={seclec === "day" ? "stronged" : ""}>รายวัน</strong>
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
      <Bar dataKey="income" fill="#8884d8" />
    </BarChart>
    </div>
    </>
  );
}

export default TotalBill;
