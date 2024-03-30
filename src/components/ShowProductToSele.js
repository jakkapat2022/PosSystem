import React from 'react'
let api_url = process.env.REACT_APP_API_URL

const ShowProductToSele = ({ product , add_product_to_bill}) => {
  return (
    <div className='item'>
    {product[0]?.data?.data?.data.length != 0 ? 
    <>
        { product[0]?.data?.data?.data.map((value ,idx) => (
        <div key={idx} className='item-blog' id={idx}
            onClick={() => add_product_to_bill(value)}>
            <div id={idx} className='blog-content'>
                
                <div id={idx} className='item-img'>
                    <img id={idx} src={`${api_url}product/img/${value.pdt_img}`}/>
                </div>
                <div id={idx} className='item-text'>
                    <div id={idx} className='price'>
                        <h3 id={idx}>{(value.pdt_price).toFixed(2)}</h3>
                    </div>
                    <div className='warn'>
                        {value.pdt_stock < 1 && <h3 id='warning'>สินค้าหมด</h3>}
                    </div>
                    <h3 id={idx}>{value.pdt_barcode}</h3>
                    <h3 id={idx}>{value.pdt_name}</h3>
                </div>
            </div>
        </div>
        ))}

    </> :
    <>
        <h1>ไม่พบสินค้า</h1>
    </>
    }
  </div>
  )
}

export default ShowProductToSele
