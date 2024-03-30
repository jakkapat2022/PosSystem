import React from "react";
import { TiArrowSortedDown } from "react-icons/ti";
import { TiArrowSortedUp } from "react-icons/ti";

export const AdminSidebarData = [
    {
        title: 'Dashboard',
        path: '/admin/dashboard', 
    },
    {
        title: 'จัดการสินค้า',
        iconClosed: <TiArrowSortedDown/>,
        iconOpened: <TiArrowSortedUp/>,
        subNav: [
            {
                title: 'สินค้า',
                path: '/admin/manage/item',
            },
            {
                title: 'เพิ่มสินค้า',
                path: '/admin/manage/item/add',
            },
            {
                title: 'เพิ่มบิลรับสินค้า',
                path: '/admin/stock',
            },
            {
                title: 'หมวดหมู่',
                path: '/admin/manage/type',
            },
            {
                title: 'ปรับสต๊อกสินค้า',
                path: '/admin/stock/stockadjustment'
            }
        ]
    },
    {
        title: 'กลับหน้าขายสินค้า',
        path: '/', 
    },
]