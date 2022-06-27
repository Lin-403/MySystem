import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UserOutlined
} from '@ant-design/icons';

import React, { useState } from 'react'
import { Dropdown,Avatar, Layout, Menu } from 'antd'
import { useNavigate } from 'react-router-dom';
const { Header } = Layout;

export default function TopHeader() {
    var [collapsed, setCollapsed] = useState(false)
    const navigate=useNavigate()
    const {role:{roleName},username}=JSON.parse(localStorage.getItem('token'))
    const menu = (
        <Menu>
            <Menu.Item>{roleName}</Menu.Item>
            <Menu.Item danger onClick={()=>{
                localStorage.removeItem('token')
                navigate('/login')
            }}>退出</Menu.Item>
        </Menu>
      );
    return (
        <Header
            className="site-layout-background"
            style={{
                padding: '0 20px',
            }}
        >
            {
                collapsed ? <MenuUnfoldOutlined onClick={() => setCollapsed(!collapsed)} /> : <MenuFoldOutlined onClick={() => setCollapsed(!collapsed)} />
            }
            <div style={{ float: 'right' }}>
                <span style={{marginRight:'10px'}}>欢迎 <span style={{color:'#4266DC',fontSize:'16px'}}>{username}</span> 回来 </span>
                <Dropdown overlay={menu}>
                    <span><Avatar size="large" icon={<UserOutlined />} /></span>
                </Dropdown>
            </div>
        </Header>
    )
}
