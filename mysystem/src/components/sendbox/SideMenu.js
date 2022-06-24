import {
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
} from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './index.css'

const { Sider } = Layout;

const items = [
    {
        key: '/home',
        icon: <UserOutlined />,
        label: '首页',
    },
    {
        key: '/user-manage',
        icon: <VideoCameraOutlined />,
        label: '用户管理',
        children: [{
            key: '/user-manage/list',
            icon: <VideoCameraOutlined />,
            label: '用户列表',
        }]
    },
    {
        key: '/right-mange',
        icon: <UploadOutlined />,
        label: '权限管理',
        children: [
            {
                key: '/right-mange/role/list',
                icon: <UserOutlined />,
                label: '角色列表',
            },
            {
                key: '/right-manage/right/list',
                icon: <VideoCameraOutlined />,
                label: '权限列表',
            },
        ]
    },
]
export default function SideMenu() {
    const navigate=useNavigate()
    return (

        <Sider trigger={null} collapsible >
            <div className="logo">文章后台管理系统</div>
            <Menu
                mode="inline"
                defaultSelectedKeys={['1']}
                items={items}
                onClick={(e) => { navigate(e.key) }}
            />
        </Sider>
    )
}


