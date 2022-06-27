import React, { forwardRef, useState ,useEffect} from 'react'
import {  Form, Input ,Select} from 'antd'
const { Option } = Select;
const UserForm=forwardRef((props,ref)=> {
    const {regionList,rolesList}=props
    var [isDisabled,setIsDisabled]=useState(false)


    // console.log(props.isUpdateDisable)
    useEffect(() => {
        setIsDisabled(props.isUpdateDisable)
    }, [props.isUpdateDisable])

      //根据token获取当前用户相关信息
      const { roleId, region, username } = JSON.parse(localStorage.getItem('token'))
    //   console.log(roleId)
      const roleObj = {
        "1": "superadmin",
        "2": 'admin',
        "3": 'editor'
    }
    const checkRegion=(item)=>{
        if(props.isUpdate){
            // console.log('gengxin')
             if(roleObj[roleId]==='superadmin'){
                // console.log('12313123123123123213')
                 return false;
             }
             else {
                return true;
             }
        }
        else {
            if(roleObj[roleId]==='superadmin'){
                // console.log('12313123123123123213')
                 return false;
             }
             else {
                console.log(item,'----',region)
                if(item.title===region) return false;
                else return true;
             }
        }
    }
    const checkRole=(item)=>{
        if(props.isUpdate){
            // console.log('gengxin')
             if(roleObj[roleId]==='superadmin'){
                // console.log('12313123123123123213')
                 return false;
             }
             else {
                return true;
             }
        }
        else {
            console.log('addd')
            if(roleObj[roleId]==='superadmin'){
                console.log('12313123123123123213')
                 return false;
             }
             else {
                console.log('1111111111111111')
                console.log(item.id)
                return roleObj[item.id]!=='editor'
             }
        }
    }
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
                <Input />
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
                            return <Option disabled={checkRegion(item)} key={item.id} value={item.value}>{item.title}</Option>
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
                            return <Option disabled={checkRole(item)} key={item.id} value={item.id}>{item.roleName}</Option>
                        })
                    }
                </Select>
            </Form.Item>
        </Form>
    )
})

export default UserForm