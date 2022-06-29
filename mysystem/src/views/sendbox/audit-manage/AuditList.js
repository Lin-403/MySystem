import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Table, Button, Tag, notification } from 'antd'
import { useNavigate } from 'react-router-dom'

export default function AuditList() {
  var [dataSource, setDataSource] = useState([])
  const { username } = JSON.parse(localStorage.getItem('token'))
  useEffect(() => {
    axios.get(`news?author=${username}&auditState_ne=0&publishState_lte=1&_expand=category`).then(res => {
      // console.log(res.data)
      setDataSource(res.data)
    })
  }, [username])
  const auditList = ['未审核', '审核中', '已通过', '未通过']
  const publishList = ['未发布', '待发布', '已上线', '已下线']
  const colorList = ['blue', 'orange', 'green', 'red']

  const handleRevert = (item) => {
    setDataSource(dataSource.filter(data => data.id !== item.id))
    axios.patch(`/news/${item.id}`, {
      auditState: 0
    }).then(res => {
      notification.info({
        message: `Notification`,
        description:
          `撤销成功，可以到草稿箱中查看哟😙~♥~`,
        placement: 'bottomRight',
      });
    })
  }
  const navigate = useNavigate()
  const handleUpdate = (item) => {
    navigate(`/news-manage/update/${item.id}`)
  }
  const handlePublish = (item) => {
    setDataSource(dataSource.filter(data => data.id !== item.id))

    axios.patch(`/news/${item.id}`, {
      publishState: 2
    }).then(res => {
      notification.info({
        message: `Notification`,
        description:
          `发布成功，可以到发布列表中查看哟😙~♥~`,
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
      title: '审核状态',
      dataIndex: 'auditState',
      render: (category) => {
        return <Tag color={colorList[category]}>{auditList[category]}</Tag>
      }
    },
    {
      title: '操作',
      render: (item) => {
        return <div>
          {
            item.auditState === 1 && <Button onClick={() => { handleRevert(item) }} >撤销</Button>
          }
          {
            item.auditState === 2 && <Button onClick={() => { handlePublish(item) }} danger >发布</Button>
          }
          {
            item.auditState === 3 && <Button onClick={() => { handleUpdate(item) }} type="primary" >更新</Button>
          }

        </div>
      }
    },
  ]
  return (
    <div>
      <Table rowKey={(item) => item.id} dataSource={dataSource} columns={columns}
        pagination={{
          pageSize: 5
        }}
        rowkey={item => item.id}
      />

    </div>
  )
}
