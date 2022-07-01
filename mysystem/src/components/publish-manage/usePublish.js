import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { notification} from 'antd'

import { useNavigate } from 'react-router-dom';

export default function usePublish(type) {
    var [dataSource, setDataSource] = useState([])
    const user = JSON.parse(localStorage.getItem('token'))
    const navigate = useNavigate()
    const handelPublish=(id)=>{
        // console.log(id)
        setDataSource(dataSource.filter(data => data.id !== id))

        if(type!==3){
            axios.patch(`/news/${id}`, {
                publishState:type+1
            }).then(res => {
              notification.info({
                message: `Notification`,
                description:
                  `${type===1?'发布':'下线'}成功了哟😙~♥~`,
                placement: 'bottomRight',
              });
            })
        }
        else {
            axios.delete(`/news/${id}`).then(res => {
              notification.info({
                message: `Notification`,
                description:
                  `删除成功了哟😙~♥~`,
                placement: 'bottomRight',
              });
            })
        }
    }
    
    useEffect(() => {
        axios.get(`/news?author=${user.username}&publishState=${type}&_expand=category`).then(res => {
            // console.log(res.data)
            setDataSource(res.data)
        })
    }, [user.username])
    return {
        dataSource,
        handelPublish
    }
}
