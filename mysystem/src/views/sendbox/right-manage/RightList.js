import React, { useEffect, useState } from 'react'
import { Button, Modal, Table, Tag,Popover, Switch } from 'antd'
import axios from 'axios';
import {
    DeleteOutlined,
    EditOutlined,
    ExclamationCircleOutlined
} from '@ant-design/icons';


export default function RightList() {
    var [dataSource, setDataSource] = useState([])
    useEffect(() => {
        axios.get('http://localhost:8000/rights?_embed=children').then(res => {
            var list = res.data;
            list.map(item => {
                if (item.children && item.children.length === 0) {
                    item.children = ""
                }
            })
            setDataSource(list)
        })
    })

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            render: (id) => {
                return <b>{id}</b>
            }
        },
        {
            title: '权限名称',
            dataIndex: 'label',
        },
        {
            title: '权限路径',
            dataIndex: 'key',
            render: (title) => {
                return <Tag color='blue'>{title}</Tag>
            }
        },
        {
            title: '操作',
            render: (item) => {
                return <div>
                    <Button
                        onClick={() => myConfirm(item)}
                        style={{ marginRight: '10px' }} danger shape='circle' icon={<DeleteOutlined />} />
                    <Popover
                        content={<div>
                            <Switch checked={item.pagepermisson} onChange={()=>switchMethod(item)}></Switch>
                        </div>}
                        title="页面配置项"
                        trigger={item.pagepermisson===undefined?'':'click'}
                    ><Button style={{backgroundColor:`${item.pagepermisson===1?'#1890FF':''}`,color:`${item.pagepermisson===1?'#fff':''}`}}
                     disabled={item.pagepermisson===undefined} shape='circle' icon={<EditOutlined />} />
                    </Popover>
                </div>
            }
        },
    ];
    const switchMethod=(item)=>{
        item.pagepermisson=item.pagepermisson===1?0:1;
        setDataSource([...dataSource])
        if(item.grade===1){
            axios.patch(`http://localhost:8000/rights/${item.id}`,{
                pagepermisson:item.pagepermisson
            })
        }
        else {
            axios.patch(`http://localhost:8000/children/${item.id}`,{
                pagepermisson:item.pagepermisson
            })
        }
        
    }
    const myConfirm = (item) => {
        Modal.confirm({
            title: 'Confirm',
            icon: <ExclamationCircleOutlined />,
            content: '确定要删除嘛？亲♥~',
            okText: '确认',
            cancelText: '取消',
            onOk() {
                deleteMethod(item)
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    };
    const deleteMethod = (item) => {
        console.log(item)
        if (item.grade === 1) {
            setDataSource(dataSource.filter(data => data.id !== item.id))
            axios.delete(`http://localhost:8000/rights/${item.id}`)
        }
        else {
            //将同一父级item.rightId下的子权限全部提取出来
            var list = dataSource.filter(data => data.id === item.rightId)
            // console.log(list)
            //删除子级权限
            list[0].children = list[0].children.filter(data => data.id !== item.id)
            console.log(list)
            // list浅拷贝，所以dataSource内部也会跟着改变
            // 因为改变的是第二级，所以需要在setDataSource时进行展开赋值
            setDataSource([...dataSource])
            axios.delete(`http://localhost:8000/children/${item.id}`)

        }
    }
    return (
        <div style={{ height: '100%', overflow: 'auto' }}>
            <Table dataSource={dataSource} columns={columns}
                pagination={{
                    pageSize: 5
                }} />
        </div>
    )
}
