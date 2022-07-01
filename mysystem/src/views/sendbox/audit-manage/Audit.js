import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Table, Button, Tag, notification } from 'antd'


export default function Audit() {
  var [dataSource, setDataSource] = useState([])
  const { roleId, region, username } = JSON.parse(localStorage.getItem('token'))

  useEffect(() => {
    const roleObj = {
      "1": "superadmin",
      "2": 'admin',
      "3": 'editor'
    }
    
    axios.get('/news?auditState=1&_expand=category').then(res => {
      const list = res.data
      // console.log(list.filter(item => {
      //   console.log(item,region)
      //   console.log(roleObj[item.roleId])
      //   return item.region === region && roleObj[item.roleId] === 'editor'
      // }))
      setDataSource(roleObj[roleId] === "superadmin" ? list : [
        ...list.filter(item => item.region === region && roleObj[item.roleId] === 'editor')
      ])
    })
  },[])
  const handleAudit=(item,auditState,publishState)=>{
    setDataSource(dataSource.filter(data => data.id !== item.id))
    axios.patch(`/news/${item.id}`,{
      auditState,publishState
    }).then(res=>{
      notification.info({
        message: `Notification`,
        description:
          `操作成功哟😙~♥~`,
        placement: 'bottomRight',
      });
    })
  }
 
  const columns = [
    {
      title: '新闻标题',
      dataIndex: 'title',
      render: (title, item) => {
        return <a href={`/news-manage/preview/${item.id}`}>{title}</a>
      }
    },
    {
      title: '作者',
      dataIndex: 'author',
    },
    {
      title: '新闻分类',
      dataIndex: 'category',
      render: (category) => {
        return <div>{category.title}</div>
      }
    },
    {
      title: '操作',
      render: (item) => {
        return <div>
          <Button onClick={()=>handleAudit(item,2,1)} success type="primary" style={{marginRight:'10px'}}>通过</Button>
          <Button onClick={()=>handleAudit(item,3,0)} danger type="primary">驳回</Button>

        </div>
      }
    },
  ]
  return (
    <div>
      <Table rowKey={(item) => item.id} dataSource={dataSource} columns={columns}
        pagination={{
          pageSize: 5
        }} />
    </div>
  )
}
