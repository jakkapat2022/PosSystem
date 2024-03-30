import React from 'react'
import '../product.css'

const Product_search = ({ option }) => {

  return (
    <div className='product-search-wrapper'>
        <div className='product-search-input'>
            <label>ค้นหา</label>
            <input onChange={(e) => {
                option(e)
            }} type='text'/>
        </div>
    </div>
  )
}

export default Product_search
