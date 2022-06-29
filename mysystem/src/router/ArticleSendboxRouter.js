import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {BrowserRouter, Routes ,Route, Navigate} from 'react-router-dom'
import NoPermission from '../views/nopermission/NoPermission'
import Audit from '../views/sendbox/audit-manage/Audit'
import AuditList from '../views/sendbox/audit-manage/AuditList'
import Home from '../views/sendbox/home/Home'
import NewsAdd from '../views/sendbox/news-manage/NewsAdd'
import NewsCategory from '../views/sendbox/news-manage/NewsCategory'
import NewsDraft from '../views/sendbox/news-manage/NewsDraft'
import NewsPreview from '../views/sendbox/news-manage/NewsPreview'
import NewsUpdate from '../views/sendbox/news-manage/NewsUpdate'
import NotFound from '../views/sendbox/notfound/NotFound'
import Published from '../views/sendbox/publish-manage/Published'
import Sunset from '../views/sendbox/publish-manage/Sunset'
import Unpublished from '../views/sendbox/publish-manage/Unpublished'
import RightList from '../views/sendbox/right-manage/RightList'
import RoleList from '../views/sendbox/right-manage/RoleList'
import UserList from '../views/sendbox/user-manage/UserList'

const dataRoutes={
    '/home': <Home />,
    '/user-manage/list': <UserList />,
    '/right-manage/role/list': <RoleList />,
    '/right-manage/right/list': <RightList />,
    "/news-manage/add": <NewsAdd />,
    '/news-manage/draft': <NewsDraft />,
    '/news-manage/category': <NewsCategory />,
    '/news-manage/preview/:id': <NewsPreview />,
    '/news-manage/update/:id': <NewsUpdate />,
    '/audit-manage/audit': <Audit/>,
    '/audit-manage/list': <AuditList/>,
    '/publish-manage/unpublished': <Unpublished />,
    '/publish-manage/published': <Published />,
    '/publish-manage/sunset': <Sunset />,

}

export default function ArticleSendboxRouter() {
    var [backRouteData,setBackRouteData] = useState([])
    useEffect(()=>{
        Promise.all([
            axios.get('/rights'),
            axios.get('/children')
        ]).then(res=>{
            // console.log(res)
            // console.log([...res[0].data,...res[1].data])
            setBackRouteData([...res[0].data,...res[1].data])
        })
    },[])
    const checkRoute=(item)=>{
        // console.log(item)
        //判断是否有这个路径，并判断其pagepermisson是否为1，即开关是否打开
        return dataRoutes[item.key] && (item.pagepermisson|| item.routepermisson )
    }
    const checkUserPermission=(item)=>{
        return rights.includes(item.key)
    }
    const {role:{rights}} = JSON.parse(localStorage.getItem('token'))

    return (
        <Routes>
            {
                backRouteData.map(item=>{
                   if(checkRoute(item) && checkUserPermission(item)){
                    return <Route key={item.key} path={item.key} element={dataRoutes[item.key]} />
                   }
                   else return null
                })
            }
            <Route path="/" element={<Navigate to="/home" />} />
            {
                backRouteData.length>0 && <Route path="*" element={<NotFound />} />
            }
        </Routes>
    )
}
