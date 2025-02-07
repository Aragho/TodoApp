import React from 'react';
import Header from '../components/Header';
import SideBar from '../components/SideBar';
import {Outlet} from "react-router-dom"
const Layout = ()=>{
    return (
        <>
        <Header />
        <Outlet/>
        <SideBar />
        </>
    )
}
export default Layout;
