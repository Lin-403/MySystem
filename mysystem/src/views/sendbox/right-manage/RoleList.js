import React, { useState, useEffect } from 'react'
import { message, Table, Button, Modal, Tree } from 'antd'
import axios from 'axios'
import {
    DeleteOutlined,
    BarsOutlined,
    ExclamationCircleOutlined
} from '@ant-design/icons';


export default function RoleList() {
    var [dataSource, setDataSource] = useState([])
    var [isModalVisible, setIsModalVisible] = useState(false)
    var [treeData, setTreeData] = useState([])
    var [currentRights, setCurrentRights] = useState([])
    var [currentId, setCurrentId] = useState(0)
    useEffect(() => {
        axios.get('http://localhost:8000/roles').then(res => {
            setDataSource(res.data)
        })
    }, [])
    useEffect(() => {
        axios.get('http://localhost:8000/rights?_embed=children').then(res => {
            var list = res.data
            var s = JSON.parse(JSON.stringify(list).replace(/label/g, 'title'))
            setTreeData(s)
        })
    }, [])
    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            render: (id) => {
                return <b>{id}</b>
            }
        },
        {
            title: '角色名称',
            dataIndex: 'roleName',
        },
        {
            title: '操作',
            render: (item) => {
                return <div>
                    <Button
                        onClick={() => myConfirm(item)}
                        style={{ marginRight: '10px' }} danger shape='circle' icon={<DeleteOutlined />} />
                    <Button style={{ backgroundColor: '#1890FF', color: '#fff' }}
                        onClick={() => {
                            setIsModalVisible(true)
                            setCurrentRights(item.rights)
                            setCurrentId(item.id)
                        }} shape='circle' icon={<BarsOutlined />} />

                </div>
            }
        },
    ]
    const success = () => {
        message.success('This is a success message');
    };
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
        setDataSource(dataSource.filter(data => data.id !== item.id))
        axios.delete(`http://localhost:8000/roles/${item.id}`)
        success();
    }
    const handleOk = () => {
        setIsModalVisible(false);
        // console.log(currentId)
        //同步dataSource
        setDataSource(dataSource.map(item => {
            if (item.id === currentId) {
                return {
                    ...item,
                    rights: currentRights
                }
            }
            return item
        }))

        //同步数据库
        // console.log(currentRights)
        axios.patch(`http://localhost:8000/roles/${currentId}`, {
            rights: currentRights
        })
        success()
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };
    const onCheck = (checkKeys) => {
        // console.log(checkKeys)
        setCurrentRights(checkKeys.checked)
    }
    return (
        <div>
            <Table rowKey={(item) => item.id} dataSource={dataSource} columns={columns}
                pagination={{
                    pageSize: 5
                }} />

            <Modal title="Basic Modal" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                <Tree
                    checkable
                    treeData={treeData}
                    title={(item) => item.label}
                    checkedKeys={currentRights}
                    onCheck={onCheck}
                    checkStrictly={true}
                />
            </Modal>
        </div>
    )
}
