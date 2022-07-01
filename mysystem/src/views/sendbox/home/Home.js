import React, { useEffect, useRef, useState } from 'react'
// import axios from 'axios'
import GridLayout from "react-grid-layout";
import '/node_modules/react-grid-layout/css/styles.css'
import '/node_modules/react-resizable/css/styles.css'
import { Card, Avatar,List } from 'antd';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import axios from 'axios';

const layout = [
    { i: "viewMost", x: 0, y: 0, w: 13, minH: 10.5, h: 10.5, maxH: 15, minW: 13, maxW: 16 },
    { i: "starMost", x: 14, y: 0, w: 13, minH: 10.5, h: 10.5, maxH: 15, minW: 13, maxW: 16 },
    { i: "mine", x: 28, y: 0, w: 13, minH: 10.5, h: 10.5, maxH: 15, minW: 13, maxW: 16 }
];

const { Meta } = Card;

export default function Home() {
    var [layoutPos, setLayoutPos] = useState(localStorage.getItem('layoutPos') ? JSON.parse(localStorage.getItem('layoutPos')) : layout)
    var [viewMostList, setViewMostList] = useState([])
    var [starMostList, setStarMostList] = useState([])
    
    const user=JSON.parse(localStorage.getItem('token'))
    useEffect(() => {
        axios.get('http://localhost:8000/news?publishState=2&_expand=category&_sort=view&_order=desc&_limit=6').then(res => {
            // console.log(res.data)
            setViewMostList(res.data)
        })
    }, [])
    useEffect(() => {
        axios.get('http://localhost:8000/news?publishState=2&_expand=category&_sort=star&_order=desc&_limit=6').then(res => {
            // console.log(res.data)
            setStarMostList(res.data)
        })
    }, [])
    const handleLayoutChange = (l) => {
        console.log(l)
        localStorage.setItem('layoutPos', JSON.stringify(l))
    }
    return (
        // <div onClick={() => { getAxios() }}>Home</div>
        <GridLayout
            className="layout"
            style={{ width: '100%', overflow: 'hidden' }}
            layout={layoutPos}
            cols={43}
            rowHeight={25}
            width={1200}
            onLayoutChange={handleLayoutChange}

        >
            <div key="viewMost" style={{}}>
                <Card title="用户最常浏览" bordered={true}>
                    <List
                        size="small"
                        // bordered
                        dataSource={viewMostList}
                        renderItem={item => <List.Item style={{fontSize:'15px'}}>
                            <a href={`/news-manage/preview/${item.id}`}>{item.title}</a>
                        </List.Item>}/>
                </Card>
            </div>
            <div key="starMost" style={{}}>
                <Card title="用户点赞最多" bordered={true}>
                <List
                        size="small"
                        // bordered
                        dataSource={starMostList}
                        renderItem={item => <List.Item style={{fontSize:'15px'}}>
                            <a href={`/news-manage/preview/${item.id}`}>{item.title}</a>
                        </List.Item>}/>
                </Card>
            </div>
            <div key="mine" style={{}}>
                <Card
                    cover={
                        <img
                            alt="example"
                            src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                        />
                    }
                    actions={[
                        <SettingOutlined key="setting" />,
                        <EditOutlined key="edit" />,
                        <EllipsisOutlined key="ellipsis" />,
                    ]}
                >

                    <Meta
                        avatar={<Avatar src="https://lin-403.github.io/new-images/any4.png" />}
                        title={user.username}
                        description={
                            <div>
                               <b style={{marginRight:'10px'}}>{user.region?user.region:'全球'}</b>
                               {user.role.roleName}
                            </div>
                        }
                    />
                </Card>
            </div>
        </GridLayout>
    )
}





 // const getAxios = () => {
    //  axios.get("/posts/1").then(res=>{
    //     console.log(res)
    // })
    // axios.post("/posts", {
    //     title: 'hahahah',
    //     author: 'qwe'
    // })
    // axios.put("/posts/8", {
    //     title: 'hahahah--修改',
    //     author: 'qwe'
    // })
    // axios.patch("/posts/8", {
    //     title: 'hahahah--修改--patch',
    // })
    // axios.delete("/posts/6")
    // axios.get("/posts?_embed=comments").then(res=>{
    //     console.log(res)
    // })
    // axios.get("/comments?_expand=post").then(res => {
    //     console.log(res)
    // })
    // }
