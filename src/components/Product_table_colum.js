import React, { useEffect, useState } from 'react'
import './product_table.css'
import Paginate from './paginate';
import { useDataProduct } from './page/ItemManage';
let api_url = process.env.REACT_APP_API_URL;

const Product_table_colum = () => {

    const { handle_show_product_page , productData , pages } = useDataProduct();

  return (
    <div className='product-table-box'>
      <table>
        <tr>
            <th>ไอดีสินค้า</th>
            <th>รูปสินค้า</th>
            <th>ชื่อสินค้า</th>
            <th>บาร์โค้ด</th>
            <th>หมวดหมู่</th>
            <th>ราคาต้นทุน</th>
            <th>ราคาขาย</th>
            <th>จำนวนสินค้า</th>
        </tr>
        {productData[0]?.data?.data?.data.map((d,idx) => (
            <tr onClick={() => handle_show_product_page(d)} key={idx} className='item-colum'>
                <td id='id'>{d.id}</td>
                <td id='img'>
                    <img src={`${api_url}product/img/${d.pdt_img}`}/>
                </td>
                <td>{d.pdt_name}</td>
                <td id='barcode'>{d.pdt_barcode}</td>
                <td id='ctg'>{d.pdt_cateogry}</td>
                <td id='cost'>{d.pdt_cost}</td>
                <td id='price'>{d.pdt_price}</td>
                <td id='stock'>{d.pdt_stock}</td>
            </tr>
        ))}
      </table>
      <Paginate currentPage={productData[0]?.data?.data?.totalPages} pages={pages}/>
    </div>
  )
}

export default Product_table_colum
