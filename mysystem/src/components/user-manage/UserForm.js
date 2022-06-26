import React, { forwardRef, useState ,useEffect} from 'react'
import {  Form, Input ,Select} from 'antd'
const { Option } = Select;
const UserForm=forwardRef((props,ref)=> {
    const {regionList,rolesList}=props
    var [isDisabled,setIsDisabled]=useState(false)
    console.log(props.isUpdateDisable)
    useEffect(() => {
        setIsDisabled(props.isUpdateDisable)
    }, [props.isUpdateDisable])
    return (
        <Form
            layout="vertical"
            ref={ref}
        >
            <Form.Item
                name="username"
                label="用户名"
                rules={[{ required: true, message: 'Please input the title of collection!' }]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                name="password"
                label="密码"
                rules={[{ required: true, message: 'Please input the title of collection!' }]}
            >
                <Input type="password" />
            </Form.Item>
            <Form.Item
                name="region"
                label="区域"
                rules={isDisabled?[]:[{ required: true, message: 'Please input the title of collection!' }]}
                
            >
                <Select disabled={isDisabled}
                // onChange={handleChange}
                >
                    {
                        regionList.map(item => {
                            return <Option key={item.id} value={item.value}>{item.title}</Option>
                        })
                    }
                </Select>
            </Form.Item>
            <Form.Item
                name="roleId"
                label="角色"
                rules={[{ required: true, message: 'Please input the title of collection!' }]}
            >
                <Select onChange={(value)=>{
                    if(value===1){
                        ref.current.setFieldsValue({
                            region:''
                        })
                        setIsDisabled(true)
                        
                    }
                    else {
                        setIsDisabled(false)
                    }
                }}>
                    {
                        rolesList.map(item => {
                            return <Option key={item.id} value={item.id}>{item.roleName}</Option>
                        })
                    }
                </Select>
            </Form.Item>
        </Form>
    )
})

export default UserForm