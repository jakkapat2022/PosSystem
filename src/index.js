import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './item.css'
import './product.css'
import './sele.css'
import './App.css'
import './payment.css'
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, Route, Router, RouterProvider } from 'react-router-dom'
import ItemPoint from './components/page/ItemPoint';
import { ItemManageItem , ItemManageType , ItemManageItemAdd } from './components/page/ItemManage';
import Bill from './components/page/Bill';
import BackSystem from './components/page/BackSystem';
import About from './components/page/About';
import Pos_seles from './components/page/Pos_seles';
import Payment from './components/page/Payment';
import { CookiesProvider } from 'react-cookie';
import Login from './components/page/auth/Login';
import { UserAuth } from './components/page/auth/UserAuth';
import Protected from './components/page/auth/Protected';
import Register from './components/page/auth/Register';
import Cateogry from './components/page/Cateogry';
import { Nav } from './components/layout/Nav';
import Dashboard from './components/adminMangement/page/Dashboard';
import AdminProtected from './components/adminMangement/auth/AdminProtected';
import AddProductStocks from './components/adminMangement/page/AddProductStocks';
import StockBill from './components/adminMangement/page/StockBill';
import StockAdjustment from './components/adminMangement/page/StockAdjustment';
import AddStockAdjustment from './components/adminMangement/page/AddStockAdjustment';
import SuccessStockAdjustment from './components/adminMangement/page/SuccessStockAdjustment';

import TotalBill from './components/adminMangement/component/dashbroad/TotalBills';

const router = createBrowserRouter([
  {
    path:"/",
    element:  <Protected>
                <CookiesProvider>
                  <Pos_seles/>
                </CookiesProvider> 
              </Protected>   
  },
  {
    path:"/login",
    element:  <Login/> 
              
  },
  {
    path:"/register",
    element:  <Register/> 
              
  },
  {
    path:"/payment",
    element:  <Protected><Payment/></Protected>    
              
  },
  {
    path:"/point",
    element:  <Protected><ItemPoint/></Protected>         
              
  },
  {
    path:"/bills",
    element:  <Protected><Bill/></Protected>         
              
  },
  {
    path:"admin/manage/item",
    element:  <AdminProtected><ItemManageItem/></AdminProtected>        
              
  },
  {
    path:"admin/manage/item/add",
    element:  <AdminProtected><ItemManageItemAdd/></AdminProtected>         
              
  },
  {
    path:"admin/manage/type",
    element:  <AdminProtected><Cateogry/></AdminProtected>         
              
  },
  {
    path:"/system",
    element:  <Protected><BackSystem/></Protected>         
              
  },
  {
    path:"/about",
    element:  <Protected><About/></Protected>         
              
  },
  {
    path: '/admin/dashboard',
    element: <AdminProtected><Dashboard/></AdminProtected>
  },
  {
    path: '/admin/stock',
    element: <AdminProtected><AddProductStocks/></AdminProtected>
  },
  {
    path: '/admin/stock/bill',
    element: <AdminProtected><StockBill/></AdminProtected>
  },
  {
    path: '/admin/stock/stockadjustment',
    element: <AdminProtected><StockAdjustment/></AdminProtected>
  },
  {
    path: '/admin/stock/stockadjustment/add',
    element: <AdminProtected><AddStockAdjustment/></AdminProtected>
  },
  {
    path: '/admin/stock/stockadjustment/success',
    element: <AdminProtected><SuccessStockAdjustment/></AdminProtected>
  },
  {
    path: '/test',
    element: <TotalBill/>
  },
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
  <React.StrictMode>
    <UserAuth>
          <Nav>
            <RouterProvider router={router} />
          </Nav>
    </UserAuth> 
  </React.StrictMode>
  </>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
