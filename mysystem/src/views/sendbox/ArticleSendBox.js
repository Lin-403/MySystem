import React, { useEffect } from 'react'
import './ArticleSendBox.css'
import SideMenu from '../../components/sendbox/SideMenu'
import TopHeader from '../../components/sendbox/TopHeader'
import ArticleSendboxRouter from '../../router/ArticleSendboxRouter'
import { Layout } from 'antd'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

const { Content } = Layout;



export default function ArticleSendBox() {
    // useEffect(() => {
    //     NProgress.start()
    //     return () => {
    //       NProgress.done()
    //     }
    //   }, [])
    return (
        <Layout style={{baclground:'rgba(255,255,255,0)'}}>
            <SideMenu></SideMenu>
            <Layout className="site-layout">
                <TopHeader></TopHeader>
                <Content
                    className="site-layout-background"
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 280,
                    }}
                >
                    <ArticleSendboxRouter />
                </Content>

            </Layout>

        </Layout>
    )
}
