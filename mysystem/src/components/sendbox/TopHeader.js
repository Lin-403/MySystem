import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UserOutlined
} from '@ant-design/icons';

import React, { useState } from 'react'
import { Dropdown,Avatar, Layout, Menu } from 'antd'
import { useNavigate } from 'react-router-dom';

import {connect} from 'react-redux'


const { Header } = Layout;

function TopHeader(props) {
    console.log(props)
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
                props.isCollapsed ? <MenuUnfoldOutlined onClick={() => props.changeCollapsed()} /> : <MenuFoldOutlined onClick={() => props.changeCollapsed()} />
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

const mapStateToProps=(state)=>{
    console.log(state)
    return({
        isCollapsed:state.CollapsedReducer.isCollapsed
    })
}

const mapDispatchToProps={
    changeCollapsed(){
        return {
            type:'change-collapsed',
        }
    }
}

export default connect( mapStateToProps,mapDispatchToProps)(TopHeader)