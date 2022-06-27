import React, { useEffect } from 'react'
import axios from 'axios'

export default function Home() {
    const getAxios = () => {
        //  axios.get("/posts/1").then(res=>{
        //     console.log(res)
        // })
        // axios.post("/posts", {
        //     title: 'hahahah',
        //     author: 'qwe'
        // })
        // axios.put("/posts/8", {
        //     title: 'hahahah--修改',
        //     author: 'qwe'
        // })
        // axios.patch("/posts/8", {
        //     title: 'hahahah--修改--patch',
        // })
        // axios.delete("/posts/6")
        // axios.get("/posts?_embed=comments").then(res=>{
        //     console.log(res)
        // })
        // axios.get("/comments?_expand=post").then(res => {
        //     console.log(res)
        // })
    }
    return (
        <div onClick={() => { getAxios() }}>Home</div>
    )
}
