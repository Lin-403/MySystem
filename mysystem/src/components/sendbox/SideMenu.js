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
import {connect} from 'react-redux'

const { Sider } = Layout;


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

 function SideMenu(props) {
    const [items, setItems] = useState([])
    const {role:{rights}}=JSON.parse(localStorage.getItem('token'))
    useEffect(() => {
        axios.get("/rights?_embed=children").then(res => {
            // console.log(res)
            setItems(res.data)
        })
    },[])
    // console.log(JSON.parse(localStorage.getItem('token')))
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

        <Sider trigger={null} collapsible collapsed={props.isCollapsed} >
            <div style={{ display: 'flex', 'flexDirection': 'column', height: '100%' }}>
                
                    <div className="logo">{props.isCollapsed?'HI':'全球新闻发布系统'}</div>
                
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
}
const mapStateToProps=(state)=>{
    // console.log(state)
    return({
        isCollapsed:state.CollapsedReducer.isCollapsed
    })
}

export default connect(mapStateToProps)(memo(SideMenu))