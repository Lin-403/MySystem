import React from 'react'
import {BrowserRouter,Routes,Route, Navigate, Outlet} from 'react-router-dom'
import Login from '../views/login/Login.js'
import ArticleSendBox from '../views/sendbox/ArticleSendBox.js'

export default function IndexRouter() {
  return (

        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login/>} />
                {/* <Route path="/" element={<ArticleSendBox />} /> */}
                <Route path='/*' element={localStorage.getItem('token')?<ArticleSendBox/>:<Navigate to="/login" />} />

            </Routes>
        </BrowserRouter>

  )
}
