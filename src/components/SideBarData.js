import React from "react";
import { TiArrowSortedDown } from "react-icons/ti";
import { TiArrowSortedUp } from "react-icons/ti";

export const SidebarData = [
    {
        title: 'การขาย',
        path: '/', 
    },
    {
        title: 'บิลที่ขาย',
        path: '/bills', 
    },
    {
        title: 'สินค้า',
        path: '/manage/item'
    },
    {
        title: 'ระบบจัดการหลังบ้าน',
        path: '/admin/dashboard'
    }
]

/*
{
        title: 'จัดการสินค้า',
        iconClosed: <TiArrowSortedDown/>,
        iconOpened: <TiArrowSortedUp/>,
        subNav: [
            {
                title: 'สินค้า',
                path: '/manage/item',
            },
            {
                title: 'เพิ่มสินค้า',
                path: '/manage/item/add',
            },
            {
                title: 'หมวดหมู่',
                path: '/manage/type',
            }
        ]
    },
    */