import React, { useEffect, useRef, useState } from 'react'
import { message, Button, Modal, Table, Switch, Select, Alert } from 'antd'
import axios from 'axios';


import {
    DeleteOutlined,
    EditOutlined,
    ExclamationCircleOutlined
} from '@ant-design/icons';
import UserForm from '../../../components/user-manage/UserForm';



export default function UserList() {
    var [dataSource, setDataSource] = useState([])
    var [isVisible, setIsVisible] = useState(false)

    const [regionList, setRegionList] = useState([])
    const [rolesList, setRolesList] = useState([])
    var addForm = useRef(null)

    var [isUpdateVisible, setIsUpdateVisible] = useState(false)
    var updateForm = useRef(null)
    var [isDisable, setIsDisabled] = useState(false)

    var [current, setCurrent] = useState(null)
    //根据token获取当前用户相关信息
    const { roleId, region, username } = JSON.parse(localStorage.getItem('token'))


    useEffect(() => {

        const roleObj = {
            "1": "superadmin",
            "2": 'admin',
            "3": 'editor'
        }
        axios.get('/users?_expand=role').then(res => {
            // console.log(res.data)
            const list = res.data
            setDataSource(roleObj[roleId] === "superadmin" ? list : [
                ...list.filter(item => item.username === username),
                ...list.filter(item => item.region === region && roleObj[item.roleId] === 'editor')
            ])
        })
    }, [roleId, region, username])
    useEffect(() => {
        axios.get('/regions').then(res => {
            // console.log(res.data)
            setRegionList(res.data)
        })
    }, [])

    useEffect(() => {
        axios.get('/roles').then(res => {
            // console.log(res.data)
            setRolesList(res.data)
        })
    }, [])

    const columns = [
        {
            title: '区域',
            dataIndex: 'region',
            filters: [
                ...regionList.map(item => ({
                    text: item.title,
                    value: item.value
                })),
                {
                    text: '全球',
                    value: '全球'
                }
            ],
            onFilter: (value, item) => item.region === value,
            render: (id) => {
                return <b>{id}</b>
            },


        },
        {
            title: '角色名称',
            dataIndex: 'role',
            render: (role) => {
                return role.roleName
            }

        },
        {
            title: '用户名',
            dataIndex: 'username',

        },
        {
            title: '用户状态',
            dataIndex: 'roleState',
            render: (roleState, item) => {

                return <Switch onChange={() => handleChange(item)} checked={roleState} disabled={item.default}></Switch>
            }
        },
        {
            title: '操作',
            render: (item) => {
                return <div>
                    <Button
                        disabled={item.default}
                        onClick={() => myConfirm(item)}
                        style={{ marginRight: '10px' }} danger shape='circle' icon={<DeleteOutlined />} />
                    <Button
                        onClick={() => handleUpdate(item)}
                        disabled={item.default} shape='circle' icon={<EditOutlined />} />

                </div>
            }
        },
    ];
    const check = (item) => {
        console.log(item)
        if (item.roleId === 1) {
            setIsDisabled(true)
        }
        else setIsDisabled(false)
    }
    async function handleUpdate(item) {
        // console.log(item)

        await setIsUpdateVisible(true)
        await check(item)
        await updateForm.current.setFieldsValue(item)
        await setCurrent(item)

    }
    const handleChange = (item) => {


        item.roleState = !item.roleState;


        // console.log(dataSource)
        setDataSource([...dataSource])
        axios.patch(`/users/${item.id}`, {
            roleState: item.roleState
        })
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

        setDataSource(dataSource.filter(data => data.id !== item.id))
        axios.delete(`/users/${item.id}`)
        success()
    }
    const addFormOk = () => {
        addForm.current.validateFields().then(res => {
            // console.log(res)
            setIsVisible(false)
            success()
            addForm.current.resetFields()
            if (res.region === "") {
                res.region = "全球"
            }
            //先存入数据库
            axios.post(`/users`, {
                ...res,
                "roleState": true,
                "default": false,
            }).then(res1 => {
                //  console.log(res1.data)
                setDataSource([...dataSource, {
                    ...res1.data,
                    role: rolesList.filter(item => item.id === res.roleId)[0],
                }])
            })
        }).catch(error => {
            console.log(error)
        })
    }
    const success = () => {
        message.success('This is a success message');
    };
    const updateFormOk = () => {
        updateForm.current.validateFields().then(res => {
            setIsUpdateVisible(false)
            success()
            if (res.region === "") {
                res.region = "全球"
            }
            setDataSource(dataSource.map(item => {
                if (item.id === current.id) {
                    return {
                        ...item,
                        ...res,
                        role: rolesList.filter(data => data.id === res.roleId)[0],

                    }
                }
                return item
            }))
            axios.patch(`/users/${current.id}`, res)
            //    console.log(res)
            setIsDisabled(!isDisable)

        }).catch(error => {
            console.log(error)
        })
    }
    return (
        <div style={{ height: '100%', overflow: 'auto' }}>
            <Button type="primary" onClick={() => setIsVisible(true)}>添加用户</Button>
            <Table dataSource={dataSource} columns={columns}
                rowKey={item => item.key}
                pagination={{
                    pageSize: 5
                }} />

            <Modal
                visible={isVisible}
                title="添加用户"
                okText="Add"
                cancelText="Cancel"
                onCancel={
                    () => setIsVisible(false)
                }
                onOk={() => {
                    // console.log('add',addForm)
                    addFormOk()

                }}
            >
                <UserForm ref={addForm} regionList={regionList} rolesList={rolesList} />

            </Modal>
            <Modal
                visible={isUpdateVisible}
                title="更新用户"
                okText="Update"
                cancelText="Cancel"
                onCancel={
                    () => {
                        setIsUpdateVisible(false)
                        setIsDisabled(!isDisable)
                    }
                }
                onOk={() => {
                    // console.log('add',addForm)
                    updateFormOk()

                }}
            >

                <UserForm isUpdate={true} isUpdateDisable={isDisable} ref={updateForm} regionList={regionList} rolesList={rolesList} />
            </Modal>
        </div>
    )
}
