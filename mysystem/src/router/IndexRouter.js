import React from 'react'
import {BrowserRouter,Routes,Route, Navigate, Outlet} from 'react-router-dom'
import Login from '../views/login/Login.js'
import Detail from '../views/news/Detail.js'
import News from '../views/news/News.js'
import ArticleSendBox from '../views/sendbox/ArticleSendBox.js'

export default function IndexRouter() {
  return (

        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login/>} />
                <Route path='/news' element={<News/>} />
                <Route path='/detail/:id' element={<Detail />} />
                {/* <Route path="/" element={<ArticleSendBox />} /> */}
                <Route path='/*' element={localStorage.getItem('token')?<ArticleSendBox/>:<Navigate to="/login" />} />

            </Routes>
        </BrowserRouter>

  )
}
