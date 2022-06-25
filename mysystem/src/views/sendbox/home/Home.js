import React, { useEffect } from 'react'
import axios from 'axios'

export default function Home() {
    const getAxios = () => {
        //  axios.get("http://localhost:8000/posts/1").then(res=>{
        //     console.log(res)
        // })
        // axios.post("http://localhost:8000/posts", {
        //     title: 'hahahah',
        //     author: 'qwe'
        // })
        // axios.put("http://localhost:8000/posts/8", {
        //     title: 'hahahah--修改',
        //     author: 'qwe'
        // })
        // axios.patch("http://localhost:8000/posts/8", {
        //     title: 'hahahah--修改--patch',
        // })
        // axios.delete("http://localhost:8000/posts/6")
        // axios.get("http://localhost:8000/posts?_embed=comments").then(res=>{
        //     console.log(res)
        // })
        // axios.get("http://localhost:8000/comments?_expand=post").then(res => {
        //     console.log(res)
        // })
    }
    return (
        <div onClick={() => { getAxios() }}>Home</div>
    )
}
