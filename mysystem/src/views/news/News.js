import axios from 'axios'
import React, { useEffect ,useState} from 'react'
import { PageHeader, Card, Col, Row, List } from 'antd'
import './news.css'
import _ from 'lodash'


export default function News() {
    const [list, setList] = useState([])
    useEffect(() => {
        axios.get('/news?publishState=2&_expand=category').then(res => {
            console.log(Object.entries(_.groupBy(res.data,item=>item.category.title)))
            setList(Object.entries(_.groupBy(res.data, item => item.category.title)))
        })
    }, [])
    return (
        <div style={{ width: '100%', height: '100%', background: 'rgba(148,207,215,0.5)' }}>
            <div style={{ width: '90%', height: '100%', margin: '0px auto' }}>
                <PageHeader
                    style={{ zIndex: '1000' }}
                    className="site-page-header"
                    title="全球新闻发布系统"
                    subTitle="可以查看新闻了呦😙~♥~"
                />
                <div className="site-card-wrapper">
                    <Row gutter={[20, 20]}>
                        {
                            
                            list.map(item => {
                               return <Col span={8} key={item[0]}>
                                    <Card hoverable={true} style={{ zIndex: '1000' }} title={item[0]} bordered={true}>
                                        <List
                                            size="small"
                                            dataSource={item[1]}
                                            pagination={{
                                                pageSize: 3
                                            }}
                                            renderItem={data => <List.Item><a href={`/detail/${data.id}`}>{data.title}</a></List.Item>}
                                        />
                                    </Card>
                                </Col>
                            })
                        }
                    </Row>

                </div>
            </div>
        </div>
    )
}
