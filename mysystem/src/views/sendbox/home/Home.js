import React, { useEffect } from 'react'
// import axios from 'axios'
import GridLayout from "react-grid-layout";

export default function Home() {
    const layout = [
        { i: "a", x: 0, y: 0, w: 1, h: 2, static: true },
        { i: "b", x: 1, y: 0, w: 3, h: 2, minW: 2, maxW: 4 },
        { i: "c", x: 4, y: 0, w: 1, h: 2 }
    ];
    // const getAxios = () => {
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
    // }
    return (
        // <div onClick={() => { getAxios() }}>Home</div>
        <GridLayout
            className="layout"
            layout={layout}
            cols={12}
            rowHeight={30}
            width={1200}
        >
            <div key="a" style={{background:'lightgreen'}}>a</div>
            <div key="b">b</div>
            <div key="c">c</div>
        </GridLayout>
    )
}
