import React, { useEffect, useRef, useState } from 'react'

import GridLayout from "react-grid-layout";
import '/node_modules/react-grid-layout/css/styles.css'
import '/node_modules/react-resizable/css/styles.css'
import { Tooltip, Card, Avatar, Drawer, List } from 'antd';
import { BarChartOutlined, EllipsisOutlined, PieChartOutlined } from '@ant-design/icons';
import axios from 'axios';
import * as echarts from 'echarts'
import _ from 'lodash'

const layout = [
    { i: "viewMost", x: 0, y: 0, w: 13, minH: 10.5, h: 10.5, maxH: 15, minW: 13, maxW: 16 },
    { i: "starMost", x: 14, y: 0, w: 13, minH: 10.5, h: 10.5, maxH: 15, minW: 13, maxW: 16 },
    { i: "mine", x: 28, y: 0, w: 13, minH: 10.5, h: 10.5, maxH: 15, minW: 13, maxW: 16 },

];

const { Meta } = Card;

export default function Home() {
    var [layoutPos, setLayoutPos] = useState(localStorage.getItem('layoutPos') ? JSON.parse(localStorage.getItem('layoutPos')) : layout)
    var [viewMostList, setViewMostList] = useState([])
    var [starMostList, setStarMostList] = useState([])
    // const [pieChart, setpieChart] = useState(null)
    const [allList, setAllList] = useState([])
    const [categoryPeiVisible, setCategoryPeiVisible] = useState(false);
    const [publishPeiVisible, setPublishPeiVisible] = useState(false);
    const [barVisible, setBarVisible] = useState(false);
    const [publishList, setPublishList] = useState([])
    const [categoryList, setCategoriesList] = useState([])
    const barRef = useRef()
    const categoryPeiRef = useRef()
    const publishPeiRef = useRef()
    const user = JSON.parse(localStorage.getItem('token'))
    const publishArr = ['未发布', '待发布', '已上线', '已下线']

    useEffect(() => {
        axios.get('/news?publishState=2&_expand=category&_sort=view&_order=desc&_limit=6').then(res => {
            // console.log(res.data)
            setViewMostList(res.data)
        })
    }, [])
    useEffect(() => {
        axios.get('/news?publishState=2&_expand=category&_sort=star&_order=desc&_limit=6').then(res => {
            // console.log(res.data)
            setStarMostList(res.data)
        })
    }, [])
    useEffect(() => {
        axios.get('/news?publishState=2&_expand=category').then(res => {
            setAllList(res.data)
            // console.log(_.groupBy(res.data, item => item.category.title))

            var currentList = res.data.filter(item => item.author === user.username)
            var groupObj = _.groupBy(currentList, item => item.category.title)
            var resList = []
            for (var i in groupObj) {
                resList.push({
                    name: i,
                    value: groupObj[i].length
                })
            }
            setCategoriesList(resList)
        })
        // return () => {                        //销毁窗口改变监听事件
        //     window.onresize = null
        // }

    }, [])
    useEffect(() => {
        axios.get('/news?publishState_ne=0&_expand=category').then(res => {
            var currentList = res.data.filter(item => item.author === user.username)
            var groupObj = _.groupBy(currentList, item => item.publishState)
            var resList = []
            for (var i in groupObj) {
                resList.push({
                    name: publishArr[i],
                    value: groupObj[i].length
                })
            }
            setPublishList(resList)
        })
    }, [])
    const handleLayoutChange = (l) => {
        // console.log(l)
        localStorage.setItem('layoutPos', JSON.stringify(l))
    }
    const renderBarView = (obj) => {
        var myChart = echarts.init(barRef.current);
        // console.log(Object.keys(obj))
        // console.log(barRef)
        // 指定图表的配置项和数据
        var option = {
            title: {
                text: '新闻分类图示'
            },
            tooltip: {},
            legend: {
                data: ['数量']
            },
            xAxis: {
                data: Object.keys(obj),
                axisLabel: {                //如果重叠，则翻转角度
                    rotate: "60",
                    interval: 0
                },
            },
            yAxis: {
                minInterval: 1
            },
            series: [
                {
                    name: '数量',
                    type: 'bar',
                    data: Object.values(obj).map(item => item.length)
                }
            ]
        };
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
        // window.onresize = () => {        //每次窗口改变，重新渲染
        //     // console.log("resize")
        //     myChart.resize()
        // }
    }

    const renderPeiView = (list, peiRef) => {
        console.log(list, peiRef)
        var myChart = echarts.init(peiRef.current);
        
        // console.log(Object.keys(obj))
        // 指定图表的配置项和数据
        var option = {
            title: {
                text: `${list.length===3?'新闻发布状态':'新闻分类图示'}`,
                subtext: 'Fake Data',
                left: 'center'
            },
            tooltip: {
                trigger: 'item'
            },
            legend: {
                orient: 'vertical',
                left: 'left'
            },
            series: [
                {
                    name: 'Access From',
                    type: 'pie',
                    radius: '50%',
                    data: list,
                    emphasis: {
                        itemStyle: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
        };
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
        // window.onresize = () => {        //每次窗口改变，重新渲染
        //     // console.log("resize")
        //     myChart.resize()
        // }
    }
    async function handlePeiShow(resList, peiRef) {

        if (resList.length === 3) {
            await setPublishPeiVisible(true)
        }
        else {
            await setCategoryPeiVisible(true)
        }

        await renderPeiView(resList, peiRef)

    }
    async function handleBarShow() {
        await setBarVisible(true)

        await renderBarView(_.groupBy(allList, item => item.category.title))

    }
    return (
        // <div onClick={() => { getAxios() }}>Home</div>
        <div style={{ height: '100%', overflow: 'auto' }}>
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
                            renderItem={item => <List.Item style={{ fontSize: '15px' }}>
                                <a href={`/news-manage/preview/${item.id}`}>{item.title}</a>
                            </List.Item>} />
                    </Card>
                </div>
                <div key="starMost" style={{}}>
                    <Card title="用户点赞最多" bordered={true}>
                        <List
                            size="small"
                            // bordered
                            dataSource={starMostList}
                            renderItem={item => <List.Item style={{ fontSize: '15px' }}>
                                <a href={`/news-manage/preview/${item.id}`}>{item.title}</a>
                            </List.Item>} />
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
                            <Tooltip color={'rgba(101,101,101,0.7)'} placement="bottom" title={"新闻分类饼状图"}>
                                <PieChartOutlined onClick={() => {
                                    handlePeiShow(categoryList, categoryPeiRef)
                                }} key="setting" />
                            </Tooltip>
                            ,
                            <Tooltip color={'rgba(101,101,101,0.7)'} placement="bottom" title={"新闻分类柱状图"}>
                                <BarChartOutlined onClick={() => {
                                    handleBarShow()
                                }} key="edit" />
                            </Tooltip>,
                            <Tooltip color={'rgba(101,101,101,0.7)'} placement="bottom" title={"新闻分类饼状图"}>
                                <EllipsisOutlined onClick={() => {
                                    handlePeiShow(publishList, publishPeiRef)
                                }} key="ellipsis" />
                            </Tooltip>,
                        ]}
                    >

                        <Meta
                            avatar={<Avatar src="https://lin-403.github.io/new-images/any4.png" />}
                            title={user.username}
                            description={
                                <div>
                                    <b style={{ marginRight: '10px' }}>{user.region ? user.region : '全球'}</b>
                                    {user.role.roleName}
                                </div>
                            }
                        />
                    </Card>
                </div>



            </GridLayout>
            <Drawer
                width="500px"
                title="个人新闻分类"
                placement="right"
                closable={true}
                onClose={() => {
                    setCategoryPeiVisible(false)
                }}
                visible={categoryPeiVisible}
            >
                <div ref={categoryPeiRef} style={{
                    width: '100%',
                    height: "400px",
                    marginTop: "30px"
                }}></div>
            </Drawer>
            <Drawer
                width="500px"
                title="个人新闻分类"
                placement="right"
                closable={true}
                onClose={() => {
                    setBarVisible(false)
                }}
                visible={barVisible}
            >
                <div ref={barRef} style={{ height: '450px', width: '100%', marginTop: '30px' }}>

                </div>
            </Drawer>
            <Drawer
                width="500px"
                title="新闻发布状态"
                placement="right"
                closable={true}
                onClose={() => {
                    setPublishPeiVisible(false)
                }}
                visible={publishPeiVisible}
            >
                <div ref={publishPeiRef} style={{
                    width: '100%',
                    height: "400px",
                    marginTop: "30px"
                }}></div>
            </Drawer>
        </div>
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
