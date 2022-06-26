import React from 'react'
import {BrowserRouter, Routes ,Route, Navigate} from 'react-router-dom'
import Home from '../views/sendbox/home/Home'
import NotFound from '../views/sendbox/notfound/NotFound'
import RightList from '../views/sendbox/right-manage/RightList'
import RoleList from '../views/sendbox/right-manage/RoleList'
import UserList from '../views/sendbox/user-manage/UserList'


export default function ArticleSendboxRouter() {
    return (
        <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/user-manage/list" element={<UserList />} />
            <Route path="/right-manage/role/list" element={<RoleList />} />
            <Route path='/right-manage/right/list' element={<RightList />} />
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    )
}
