import {

  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import React from 'react';
import './index.css'

const {  Sider } = Layout;

export default function SideMenu() {
    return (
        
        <Sider trigger={null} collapsible >
            <div className="logo">文章后台管理系统</div>
            <Menu
                // theme="light"
                mode="inline"
                defaultSelectedKeys={['1']}
                items={[
                    {
                        key: '1',
                        icon: <UserOutlined />,
                        label: 'nav 1',
                    },
                    {
                        key: '2',
                        icon: <VideoCameraOutlined />,
                        label: 'nav 2',
                    },
                    {
                        key: '3',
                        icon: <UploadOutlined />,
                        label: 'nav 3',
                        children:[
                            {
                                key: '11',
                                icon: <UserOutlined />,
                                label: 'nav 1',
                            },
                            {
                                key: '12',
                                icon: <VideoCameraOutlined />,
                                label: 'nav 2',
                            },
                        ]
                    },
                ]}
            />
        </Sider>
    )
}
