import React, { useContext, useEffect, useRef, useState } from 'react'
import { Button, message, Modal, Table, Form, Input, notification } from 'antd'
import axios from 'axios';
import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined
} from '@ant-design/icons';


export default function NewsCategory() {
  var [dataSource, setDataSource] = useState([])
  useEffect(() => {
    axios.get('/categories').then(res => {
      setDataSource(res.data)
    })
  }, [])
  const success = () => {
    message.success('This is a success message');
  };

  const EditableContext = React.createContext(null);

  const EditableRow = ({ index, ...props }) => {
    const [form] = Form.useForm();
    return (
      <Form form={form} component={false}>
        <EditableContext.Provider value={form}>
          <tr {...props} />
        </EditableContext.Provider>
      </Form>
    );
  };

  const EditableCell = ({
    title,
    editable,
    children,
    dataIndex,
    record,
    handleSave,
    ...restProps
  }) => {
    const [editing, setEditing] = useState(false);
    const inputRef = useRef(null);
    const form = useContext(EditableContext);
    useEffect(() => {
      if (editing) {
        inputRef.current.focus();
      }
    }, [editing]);

    const toggleEdit = () => {
      setEditing(!editing);
      form.setFieldsValue({
        [dataIndex]: record[dataIndex],
      });
    };

    const save = async () => {
      try {
        const values = await form.validateFields();
        toggleEdit();
        handleSave({ ...record, ...values });
      } catch (errInfo) {
        console.log('Save failed:', errInfo);
      }
    };

    let childNode = children;

    if (editable) {
      childNode = editing ? (
        <Form.Item
          style={{
            margin: 0,
          }}
          name={dataIndex}
          rules={[
            {
              required: true,
              message: `${title} is required.`,
            },
          ]}
        >
          <Input ref={inputRef} onPressEnter={save} onBlur={save} />
        </Form.Item>
      ) : (
        <div
          className="editable-cell-value-wrap"
          style={{
            paddingRight: 24,
          }}
          onClick={toggleEdit}
        >
          {children}
        </div>
      );
    }

    return <td {...restProps}>{childNode}</td>;
  };
  const handleSave = (row) => {
    // console.log(row)
    setDataSource(dataSource.map(item => {
      if (item.id === row.id) {
        return {
          id: item.id,
          title: row.title,
          value: row.title
        }
      }
      return item
    }))
    axios.patch(`/categories/${row.id}`, {
      title: row.title,
      value: row.title
    }).then(res=>{
      notification.info({
        message: `Notification`,
        description:
          `修改成功了哟😙~♥~`,
        placement: 'bottomRight',
      });
    })
  };
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      render: (id) => {
        return <b>{id}</b>
      }
    },
    {
      title: '栏目名称',
      dataIndex: 'title',
      onCell: (record) => ({
        record,
        editable: true,
        dataIndex: "title",
        title: '栏目名称',
        handleSave,
      }),

    },

    {
      title: '操作',
      render: (item) => {
        return <div>
          <Button
            onClick={() => myConfirm(item)}
            style={{ marginRight: '10px' }} danger shape='circle' icon={<DeleteOutlined />} />
        </div>
      }
    },
  ];
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
    axios.delete(`/categories/${item.id}`)

    success()
  }
  return (
    <div style={{ height: '100%', overflow: 'auto' }}>
      <Table
        // rowKey={item => item.id}
        components={{
          body: {
            row: EditableRow,
            cell: EditableCell,
          }
        }}
        pagination={{
          pageSize: 5
        }}
        rowClassName={() => 'editable-row'}
        bordered
        dataSource={dataSource}
        columns={columns}
      />
    </div>
  )
}
