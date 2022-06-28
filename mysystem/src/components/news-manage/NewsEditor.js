import React, { useState, useEffect, Component } from 'react'


import { Button, Card, Modal } from 'antd'

// import { Editor } from "react-draft-wysiwyg";
// import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
// import { EditorState, convertToRaw } from 'draft-js';
// import draftToHtml from 'draftjs-to-html';
// import draftjs from 'draftjs-to-html'

import '@wangeditor/editor/dist/css/style.css' // 引入 css
import { Editor, Toolbar } from '@wangeditor/editor-for-react'



export default function NewsEditor(props) {
    const [editor, setEditor] = useState(null) // 存储 editor 实例
    const [html, setHtml] = useState('<p></p>') // 编辑器内容

    // 模拟 ajax 请求，异步设置 html
    useEffect(() => {

    }, [])

    const toolbarConfig = {}
    const editorConfig = {
        placeholder: '请输入内容...',
    }
    // editorConfig.onBlur = (editor) => {
    //     // editor blur
    //     setHtml(editor.getHtml())
    //     console.log(editor.getHtml())
    // }
    // 及时销毁 editor ，重要！

    useEffect(() => {
        return () => {
            if (editor == null) return
            editor.destroy()
            setEditor(null)
        }
    }, [editor])
    useEffect(() => {
        // console.log(props.isBlur)
        if (props.isBlur) {
            props.getContent(html)
        }
        return () => {
            props.setIsBlur(false)
            // console.log(props.isBlur)
        };
    }, [props.isBlur])
    const handleChange = (editor) => {
        setHtml(editor.getHtml())
    }
    return (
        <>
            <div style={{ border: '1px solid #ccc', zIndex: 1000 }}>
                <Toolbar
                    editor={editor}
                    defaultConfig={toolbarConfig}
                    mode="default"
                    style={{ borderBottom: '1px solid #ccc' }}
                />
                <Editor
                    defaultConfig={editorConfig}
                    value={html}
                    onCreated={setEditor}
                    onChange={editor => {
                        return handleChange(editor)
                    }}
                    mode="default"
                    style={{ height: '200px', overflow: 'hidden' }}
                />
            </div>
            {/* <div style={{ marginTop: '15px' }}>
                {html}
            </div> */}
        </>
    )
}