import React from 'react'
import './ArticleSendBox.css'
import SideMenu from '../../components/sendbox/SideMenu'
import TopHeader from '../../components/sendbox/TopHeader'
import ArticleSendboxRouter from '../../router/ArticleSendboxRouter'
import { Layout } from 'antd'
const { Content } = Layout;



export default function ArticleSendBox() {
    return (
        <Layout>
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
