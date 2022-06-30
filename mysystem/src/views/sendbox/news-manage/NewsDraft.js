import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button, message, Modal, Table, notification} from 'antd'

import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
  VerticalAlignTopOutlined
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

export default function NewsDraft() {
  var [dataSource, setDataSource] = useState([])
  const user = JSON.parse(localStorage.getItem('token'))
  const navigate = useNavigate()

  useEffect(() => {
    axios.get(`/news?author=${user.username}&auditState=0&_expand=category`).then(res => {
      // console.log(res.data)
      setDataSource(res.data)
    })
  }, [])
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
    axios.delete(`/news/${item.id}`)
    success();
  }

  const handleSubmit = (item) => {
    console.log(item)
    axios.patch(`/news/${item.id}`, {
      auditState: 1
    }).then(res => {
      navigate('/audit-manage/list')
      notification.info({
        message: `Notification`,
        description:
          `提交审核成功，可以到审核列表中查看哟😙~♥~`,
        placement: 'bottomRight',
      });
    })
  }
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      render: (id) => {
        return <b>{id}</b>
      }
    },
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
          <Button
            onClick={() => myConfirm(item)}
            style={{ marginRight: '10px' }} danger shape='circle' icon={<DeleteOutlined />} />

          <Button style={{ marginRight: '10px' }}
            onClick={() => { navigate(`/news-manage/update/${item.id}`) }}
            shape='circle' icon={<EditOutlined />} />

          <Button
            onClick={() => {
              handleSubmit(item)
            }}
            style={{ backgroundColor: '#1890FF', color: '#fff' }} shape='circle' icon={<VerticalAlignTopOutlined />} />
        </div>
      }
    },
  ];
  return (
    <div style={{ height: '100%', overflow: 'auto' }}>
      <Table dataSource={dataSource} columns={columns}
      rowKey={item=>item.id}
        pagination={{
          pageSize: 5
        }} />
    </div>
  )
}
