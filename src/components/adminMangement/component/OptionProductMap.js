import React,{ useState , useEffect} from 'react'
import axios from 'axios'

const OptionProductMap = ({ optionSelect , stateinput }) => {
    let api_url = process.env.REACT_APP_API_URL;
    const [keyword , setKeyword] = useState('');
    const [opdata , setopdate] = useState([])
    const query = `productstocks/get?keyword=${keyword}&orderBy=pdt_name`

    const search_product = async () => {
        try {
            const productList = await axios.post(api_url +query);
            setopdate([productList]);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        search_product();
    },[keyword])

    //console.log(opdata);

    return (
      <div className='Option'>
        <div className='option-search'>
            <div id='input-search' className='wrapper'>
                <div className='input-data'>
                        <input onChange={(e) => setKeyword(e.target.value)}  id='pdt_price' type='text' required/>
                        <div className='underline'></div>
                        <label>ค้นหา</label>
                </div>
            </div>
        </div>
          <div className='option-box'>
          {opdata[0]?.data?.data?.data?.map((data,idx) => (
              <div key={idx} onClick={() => optionSelect(data) & stateinput(false)} className='option-dropdown'>
                 <img src={`${api_url}product/img/${data.pdt_img}`} alt={data.pdt_name} width={50}/>
                  <strong>{data.pdt_name}</strong>
              </div>
          ))}
          </div> 
      </div>
    )
}

export default OptionProductMap
