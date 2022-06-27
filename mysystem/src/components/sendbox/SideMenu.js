import {
    HomeOutlined,
    UserOutlined,
    TeamOutlined,
    KeyOutlined,

    ApartmentOutlined,
    SnippetsOutlined,
    EditOutlined,
    DeleteOutlined,
    OrderedListOutlined,
    CloudServerOutlined,
    FileSearchOutlined,
    AlignLeftOutlined,
    CloudUploadOutlined,
    FileSyncOutlined,
    FileDoneOutlined,
    FileExcelOutlined
} from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import SubMenu from 'antd/lib/menu/SubMenu';
import axios from 'axios';
import React, { memo, useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './index.css'

const { Sider } = Layout;

// const items = [
//     {
//         key: '/home',
//         icon: <UserOutlined />,
//         label: '首页',
//     },
//     {
//         key: '/user-manage',
//         icon: <VideoCameraOutlined />,
//         label: '用户管理',
//         children: [{
//             key: '/user-manage/list',
//             icon: <VideoCameraOutlined />,
//             label: '用户列表',
//         }]
//     },
//     {
//         key: '/right-mange',
//         icon: <UploadOutlined />,
//         label: '权限管理',
//         children: [
//             {
//                 key: '/right-mange/role/list',
//                 icon: <UserOutlined />,
//                 label: '角色列表',
//             },
//             {
//                 key: '/right-manage/right/list',
//                 icon: <VideoCameraOutlined />,
//                 label: '权限列表',
//             },
//         ]
//     },
// ]


const iconList = {
    '/home': <HomeOutlined />,
    '/user-manage': <UserOutlined />,
    '/user-manage/list': <TeamOutlined />,
    '/right-manage': <KeyOutlined />,
    '/right-manage/role/list': <TeamOutlined />,
    '/right-manage/right/list': <ApartmentOutlined />,
    '/news-manage': <SnippetsOutlined />,
    "/news-manage/add": <EditOutlined />,
    '/news-manage/draft': <DeleteOutlined />,
    '/news-manage/category': <OrderedListOutlined />,
    '/audit-manage': <CloudServerOutlined />,
    '/audit-manage/audit': <FileSearchOutlined />,
    '/audit-manage/list': <AlignLeftOutlined />,
    '/publish-manage': <CloudUploadOutlined />,
    '/publish-manage/unpublished': <FileSyncOutlined />,
    '/publish-manage/published': <FileDoneOutlined />,
    '/publish-manage/sunset': <FileExcelOutlined />,
}

export default memo(function SideMenu() {
    const [items, setItems] = useState([])
    const {role:{rights}}=JSON.parse(localStorage.getItem('token'))
    useEffect(() => {
        axios.get("http://localhost:8000/rights?_embed=children").then(res => {
            // console.log(res)
            setItems(res.data)
        })
    },[])
    console.log(JSON.parse(localStorage.getItem('token')))
    const checkPagepermisson = (item) => {
        return item.pagepermisson && rights.includes(item.key)
    }
    const navigate = useNavigate()
    // console.log(navigate)
    const location = useLocation()
    // console.log(location)
    const renderMenu = (menuList) => {
        var newlist = []
        menuList.map(item => {
            if (checkPagepermisson(item)) {
                item.icon = iconList[item.key]
                if (item.children) {
                    item.children = item.children.filter(child => {
                        child.icon = iconList[child.key]
                        return checkPagepermisson(child)
                    })
                }
                if (item.children && item.children.length === 0) {
                    delete item.children
                }
                newlist = [...newlist, item]
            }
        })

        return newlist
    }
    return (

        <Sider trigger={null} collapsible >
            <div style={{ display: 'flex', 'flexDirection': 'column', height: '100%' }}>
                <div className="logo">全球新闻发布系统</div>
                <div style={{ flex: '1', overflow: 'auto' }}>
                    <Menu
                        mode="inline"
                        selectedKeys={location.pathname}
                        defaultOpenKeys={['/' + location.pathname.split('/')[1]]}
                        items={renderMenu(items)}
                        onClick={(e) => { navigate(e.key) }}
                    />
                </div>
            </div>
        </Sider>
    )
})


