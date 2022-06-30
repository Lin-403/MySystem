import React from 'react'
import { Button, message, Modal, Table, notification} from 'antd'


export default function PublishTable(props) {

    const handleArr=['发布','下线','删除']
    const publishList = ['未发布', '待发布', '已上线', '已下线']
   
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
                onClick={() => {
                    // console.log(props.handlePublish)
                    // console.log(item)
                    props.handlePublish(item.id)
                }}
                type='primary' >{handleArr[props.pState]}</Button>
            </div>
          }
        },
      ];
  return (
    <Table dataSource={props.dataSource} columns={columns}
        rowKey={item=>item.id}
        pagination={{
          pageSize: 5
        }} />
  )
}
