import React, { useState, useEffect, useRef } from 'react'
import { PageHeader, Steps, Button, Input, Form, Select, message, notification } from 'antd'
import axios from 'axios';
import './NewsAdd.css'
import NewsEditor from '../../../components/news-manage/NewsEditor';
import { useNavigate } from 'react-router-dom';
import '@wangeditor/editor/dist/css/style.css'

const { Step } = Steps;
const { Option } = Select;


export default function NewsAdd() {
    var [step, setStep] = useState(0)
    var [categoriesList, setCategoriesList] = useState([])
    var [isBlur, setIsBlur] = useState(false)
    var [content, setContent] = useState("")
    var [info, setInfo] = useState(null)

    var user=JSON.parse(localStorage.getItem('token'))
    useEffect(() => {
        axios.get('/categories').then(res => {
            setCategoriesList(res.data)
        })
    }, [])
    var newsForm = useRef(null)

    const handleNext = () => {
        if (step === 1) {
            setIsBlur(true)
        }
        if (step === 0) {
            newsForm.current.validateFields().then(res => {
                console.log(res)
                setInfo(res)
                setStep(step + 1)
            }).catch(error => {
                console.log(error)
            })
        }
        else {
            console.log(info, content)
            if (content === '') {
                message.error('新闻内容不能为空！')

            }
            else {

                setStep(step + 1)
            }
        }
    }
    const handlePrevious = () => {
        setStep(step - 1)
    }
    
    const navigate=useNavigate()
    const handleNews = (e) => {
        axios.post('/news', {
            ...info,
            "content": content,
            "region": user.region?user.region:'全球',
            "author": user.username,
            "roleId": user.roleId,
            "auditState": e,
            "publishState": 0,
            "createTime": Date.now(),
            "star": 0,
            "view": 0,
        }).then(res=>{
            // console.log(res)
            navigate(`${e===0?'/news-manage/draft':'/audit-manage/list'}`)
            notification.info({
                message: `Notification`,
                description:
                  `你可以到${e===0?'草稿箱':'审核列表'}中查看新闻哟😙~♥~`,
                placement:'bottomRight',
              });
        })
    }
   
    return (
        <div>
            <PageHeader
                className="site-page-header"
                title="撰写新闻"
            />
            <Steps style={{ width: '90%', marginLeft: '5%' }} current={step}>
                <Step title="基本信息" description="新闻标题，新闻分类" />
                <Step title="新闻内容" description="新闻主题内容" />
                <Step title="新闻提交" description="保存草稿或提交审核" />
            </Steps>
            <div style={{ width: '90%', margin: '30px 5% ', }} className={step === 0 ? '' : 'newsAddHidden'}>
                <Form ref={newsForm}>
                    <Form.Item
                        label="新闻标题"
                        name="title"
                        rules={[{ required: true, message: 'Please input your username!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="新闻分类"
                        name="categoryId"
                        rules={[{ required: true, message: 'Please input your category!' }]}
                    >
                        <Select>
                            {
                                categoriesList.map(item => {
                                    return <Option value={item.id} key={item.id}>{item.title}</Option>
                                })
                            }
                        </Select>
                    </Form.Item>
                </Form>
            </div>
            <div style={{ width: '90%', margin: '30px 5%', }} className={step === 1 ? '' : 'newsAddHidden'}>
                <NewsEditor setIsBlur={() => { setIsBlur() }} isBlur={isBlur} getContent={(data) => {
                    //  console.log(content)  
                    setContent(data)
                }} />
            </div>
            <div style={{ marginLeft: '5%' }}>
                {
                    step === 2 ? <span>
                        <Button onClick={() => handleNews(0)} type='primary' style={{ marginRight: '10px' }}>保存草稿</Button>
                        <Button onClick={() => handleNews(1)} style={{ marginRight: '10px' }} danger >提交审核</Button>
                    </span> : ''
                }
                {
                    step > 0 ? <Button style={{ marginRight: '10px' }} onClick={handlePrevious} type='primary'>上一步</Button> : ''
                }

                {
                    step < 2 ? <Button onClick={handleNext}>下一步</Button> : ''

                }
            </div>

        </div>
    )
}
