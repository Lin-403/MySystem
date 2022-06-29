import React, { useEffect, useState } from 'react'
import { Button, Descriptions, PageHeader } from 'antd';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment'

export default function NewsPreview() {
    var [newsDetail, setNewsDetail] = useState(null)
    const params = useParams()
    const auditList=['未审核','审核中','已通过','未通过']
    const publishList=['未发布','待发布','已上线','已下线']
    useEffect(() => {
        axios.get(`/news/${params.id}?_expand=category`).then(res => {
            console.log(res.data)
            setNewsDetail(res.data)
        })
    }, [params.id])

    console.log(params)
    return (
        <div>
            {
                newsDetail!==null &&  <div>
                    <PageHeader
                        ghost={false}
                        onBack={() => window.history.back()}
                        title="返回"
                        subTitle={newsDetail.category.title}
                    >
                        <Descriptions size="small" column={3}>
                            <Descriptions.Item label="创建者">{newsDetail.author}</Descriptions.Item>
                            <Descriptions.Item label="创建时间">{moment(newsDetail.createTime).format('YYYY-MM-DD HH:mm:ss')}</Descriptions.Item>
                            <Descriptions.Item label="发布时间">{newsDetail.publishTime ?moment(newsDetail.publishTime).format('YYYY-MM-DD HH:mm:ss') :'--'}</Descriptions.Item>
                            <Descriptions.Item label="区域">{newsDetail.region}</Descriptions.Item>
                            <Descriptions.Item label="审核状态"><span style={{color:"red"}}>{auditList[newsDetail.auditState]}</span></Descriptions.Item>
                            <Descriptions.Item label="发布状态"><span style={{color:"red"}} >{publishList[newsDetail.publishState]}</span></Descriptions.Item>
                            <Descriptions.Item label="访问数量"><span style={{color:"#34CB39"}}>{newsDetail.view}</span></Descriptions.Item>
                            <Descriptions.Item label="点赞数量"><span style={{color:"#34CB39"}}>{newsDetail.star}</span></Descriptions.Item>
                            <Descriptions.Item label="评论数量"><span style={{color:"#34CB39"}}>0</span></Descriptions.Item>
    
                        </Descriptions>
                    </PageHeader>
                    <div dangerouslySetInnerHTML={{
                        __html:newsDetail.content
                    }} style={{
                        border:'1px solid #BAC0BA',
                        margin:'0px 24px',
                        height:'300px',
                        overflow:'auto',
                        padding:'5px 10px'
                    }} />
                </div>
                
            }
        </div>
    )
}
