# MySystem项目

## 项目概况

功能模块：

> 1. 登录模块 – 有了令牌，天下就是我的
>
>    登录验证拦截
>
>    粒子特效。
>
>    面板娘
>
> 2. 权限管理模块 – 此路是我开，此树是我栽。
>
>    权限列表，以及权限的增删改查
>
>    角色列表，以及角色的增删改查
>
> 3. 用户管理模块 – 单丝不成线， 是兄弟就一起来。
>
>    用户列表，以及用户信息的增删改查
>
> 4. 文章管理模块 – 广发英雄帖
>
>    富文本撰写文章
>
>    草稿箱
>
>    文章分类
>
> 5. 审核管理模块 – 过不过都是武林盟主说了算。
>
>    审核文章
>
>    审核列表
>
> 6. 发布管理模块 –  八百里加急，全球发布
>
>    待发布
>
>    已发布
>
>    已下线
>
> 7. 文章大数据分析 – 这就是朕为你打下的江山

## 项目起步

### 问题1

​      正常书写`css`文件样式问题，子组件样式会覆盖父组件样式，因为两者的样式最后会显示在一个 `<style></style>`标签下，发生样式覆盖问题。

解决：使用加后缀module   ，使用 `style.[类名]`

​           或者直接定义不同类名就可 

### 应用sass

```
cnpm i --save sass
```

> 好处：
>
> 可以写变量
>
> ```scss
> $fount-size:90px;
> 
> li{
> color:rebeccapurple;
> font-size: $fount-size;
> }
> ```
>
> 

### 反向代理

1. src目录下新建 `setupProxy.js` 配置文件

2. 安装模块`http-proxy-middleware`

   ```
   cnpm i --save-dev http-proxy-middleware
   ```

3. 截取请求路径，将目标地址设为代理

   ```js
   const {createProxyMiddleware}=require('http-proxy-middleware')
   
   module.exports=function(app){
       app.use(
           '/ajax',
           createProxyMiddleware({
               target:'https://i.maoyan.com',
               changeOrigin:true,
           })
       )
   }
   ```

4. 重启！！！！！！

## 搭建项目

### 路由

![image-20220623211033515](C:\Users\ASUS\Desktop\MySystem\images\image-20220623211033515.png)

### 安装

```
cnpm i --save react-router-dom
```

### 路由拦截

```jsx
<BrowserRouter>
    <Routes>
        <Route path="/login" element={<Login/>} />
        {/* <Route path="/" element={<ArticleSendBox />} /> */}
        <Route path='/' element={localStorage.getItem('token')?<ArticleSendBox/>:<Navigate to="/login" />} />
    </Routes>
</BrowserRouter>
```

### 路由搭建

涉及到嵌套路由，子路由如下：

```jsx
<div>
    <SideMenu></SideMenu>
    <TopHeader></TopHeader>
    <Routes>
        <Route path="/home" element={<Home/>} />
        <Route path="/user-manage/list" element={<UserList/>} />
        <Route path="/right-mange/role/list" element={<RoleList/>} />
        <Route path='/right-manage/right/list' element={<RightList/>} />
        <Route path="/" element={<Navigate to="/home" />}/>
        <Route path="*" element={<NotFound/>}/>
    </Routes>

</div>
```

父级路由书写如下： 路径为：` /*`

```
<Route path='/*' element={localStorage.getItem('token')?<ArticleSendBox/>:<Navigate to="/login" />} />

```

### AntD引入+鸿蒙字体

```
cnpm i --save antd  

import 'antd/dist/antd.css';
```

鸿蒙字体添加

```
@font-face {
  font-family: HarmonyOS;
  src: url('../public/HarmonyOS_Sans_SC_Regular.ttf');
}
* {
  font-family: HarmonyOS;
}
```

### 动态SideMenu

v20.0.0

items定义基本内容，防于Menu的items属性中，然后给Menu添加onClick事件，获取key值，进行路由跳转

```jsx
<Menu
    mode="inline"
    defaultSelectedKeys={['1']}
    items={items}
    onClick={(e) => { console.log(e.key) }}
/>
```

### `withRouter`解决无路由组件（v5)

对于没有被Route包裹的组件没有相关路由API，所以使用`withRouter`包裹

### **useNavigate** 解决无路由组件（v6)

```
const navigate=useNavigate()

navigate(`/detail/${filmId}`)
```

### Json-Server

基于node封装的一个2框架，本身解决了跨域问题

并带有数据库相关操作 RestApi

1. 查询（get）：查询posts下id=2的数据  

   ```js
   axios.get("http://localhost:8000/posts/2").then(res=>{
       console.log(res)
   })
   
   //http://localhost:8000/posts?id=1 查询id=1
   ```

2. 增加（post）：(id自增)

   ```js
   axios.post("http://localhost:8000/posts",{
       title:'hahahah',
       author:'qwe'
   })
   ```

3. 更新（全部更新put）：修改id=8的数据   -------需要将老数据都写入，不然会被舍弃

   ```js
   axios.put("http://localhost:8000/posts/8", {
       title: 'hahahah--修改',
       author: 'qwe'
   })
   ```

   更新（局部更新patch）： 修改id=8的数据   -------不会影响老数据

   ```js
   axios.patch("http://localhost:8000/posts/8", {
       title: 'hahahah--修改--patch',
   })
   ```

4. 删除（delete）：级联删除

   ```js
   axios.delete("http://localhost:8000/posts/6")
   ```

5. 级联查询（多表查询）

   向下关联

   ```js
    axios.get("http://localhost:8000/posts?_embed=comments").then(res=>{
        console.log(res)
    })
   
   //结果：能查出相同id下另一个表中的comments
   data: Array(5)
   0: {id: 1, title: '1111-修改-11111', author: 'kerwin', comments: Array(1)}
   1: {title: '33333', author: 'xiaoming', id: 3, comments: Array(0)}
   2: {title: 'hahahah', author: 'qwe', id: 4, comments: Array(0)}
   3: {title: 'hahahah', author: 'qwe', id: 7, comments: Array(0)}
   4: {title: 'hahahah--修改--patch', author: 'qwe', id: 8, comments: Array(0)}
   length: 5
   ```

   向上关联  （根据某个评论查看文章相关信息）

   ```js
   axios.get("http://localhost:8000/comments?_expand=post").then(res => {
       console.log(res)
   })
   
   //结果  :会拿到相关post相关信息
   data: Array(1)
   0: {id: 1, body: '11111-comment', postId: 1, post: {…}}
   length: 1
   ```

   

6. 



```
网址：https://www.npmjs.com/package/json-server
```

下载安装：

```
npm install -g json-server
```

服务器启动

```
json-server --watch .\db.json --port 8000
```

对于下面json文件

```
{
  "posts": [
    { "id": 1, "title": "json-server", "author": "typicode" }
  ],
  "comments": [
    { "id": 1, "body": "some comment", "postId": 1 }
  ],
  "profile": { "name": "typicode" }
}
```

posts、comments、profile会被当作是接口

上面程序运行之后出现一个网址，点击Resources下面的接口即可跳转到相应数据上

