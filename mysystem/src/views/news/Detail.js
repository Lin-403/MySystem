import React, { useEffect, useState } from 'react'
import { Button, Descriptions, PageHeader } from 'antd';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment'
import './news.css'
import '../sendbox/news-manage/NewPreviews.css'
import '@wangeditor/editor/dist/css/style.css' // 引入 css
import { HeartTwoTone, } from '@ant-design/icons';


export default function Detail() {
    var [newsDetail, setNewsDetail] = useState(null)
    const params = useParams()
    useEffect(() => {
        axios.get(`/news/${params.id}?_expand=category`).then(res => {
            console.log(res.data)
            setNewsDetail({
                ...res.data,
                view: res.data.view + 1
            })
            return res.data
        }).then(res => {
            axios.patch(`/news/${params.id}?_expand=category`, {
                view: res.view + 1
            })
        })
    }, [params.id])
    const handleStar = async() => {
        await setNewsDetail({
            ...newsDetail,
            star: newsDetail.star + 1
        })
        await axios.patch(`/news/${params.id}?_expand=category`, {
            star: newsDetail.star + 1
        })
    }
    // console.log(params)
    return (
        <div style={{ width: '90%', height: '90%', margin: '0 auto', zIndex: '1000' }}>
            {
                newsDetail !== null && <div>
                    <PageHeader
                        ghost={false}
                        style={{ zIndex: '1000' }}
                        onBack={() => window.history.back()}
                        title={newsDetail.title}
                        subTitle={<div>
                            {newsDetail.category.title}
                            <HeartTwoTone style={{ marginLeft: '5px' }} onClick={() => {
                                handleStar()
                            }} twoToneColor="#eb2f96" />

                        </div>}
                    >
                        <Descriptions size="small" column={3}>
                            <Descriptions.Item label="创建者">{newsDetail.author}</Descriptions.Item>
                            <Descriptions.Item label="发布时间">{newsDetail.publishTime ? moment(newsDetail.publishTime).format('YYYY-MM-DD HH:mm:ss') : '--'}</Descriptions.Item>
                            <Descriptions.Item label="区域">{newsDetail.region}</Descriptions.Item>
                            <Descriptions.Item label="访问数量"><span style={{ color: "#34CB39" }}>{newsDetail.view}</span></Descriptions.Item>
                            <Descriptions.Item label="点赞数量"><span style={{ color: "#34CB39" }}>{newsDetail.star}</span></Descriptions.Item>
                            <Descriptions.Item label="评论数量"><span style={{ color: "#34CB39" }}>0</span></Descriptions.Item>

                        </Descriptions>
                    </PageHeader>
                    <div className='editor-content-view' dangerouslySetInnerHTML={{
                        __html: newsDetail.content
                    }} style={{
                        border:'1px solid #BAC0BA',
                        // border: 'none',
                        margin: '0px 24px',
                        height: '550px',
                        overflow: 'auto',
                        padding: '5px 10px',
                        zIndex: '1000',
                        background:'#fff'
                    }} />
                </div>

            }
        </div>
    )
}
