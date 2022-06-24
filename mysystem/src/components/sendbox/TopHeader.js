import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UserOutlined
} from '@ant-design/icons';

import React, { useState } from 'react'
import { Dropdown,Avatar, Layout, Menu } from 'antd'
const { Header } = Layout;

export default function TopHeader() {
    var [collapsed, setCollapsed] = useState(false)
    const menu = (
        <Menu>
            <Menu.Item>超级管理员</Menu.Item>
            <Menu.Item danger>退出</Menu.Item>
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
                <span>欢迎admin回来</span>
                <Dropdown overlay={menu}>
                    <span><Avatar size="large" icon={<UserOutlined />} /></span>
                </Dropdown>
            </div>
        </Header>
    )
}
