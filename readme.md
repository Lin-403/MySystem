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

> 整个项目选择路由地址作为每个数据对象的key值，在侧边栏功能显示，不同角色权限展示、上都应用到了key，

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

   （1）向下关联   _embed   用来获取包含下级资源的数据

   > 比如我**json-server**服务器的端口号是**8081**,然后我的请求路径是**http://localhost:8081/posts/2?_embed=comments**
   > 这个路径获取的就是posts下的id为2的数据和它关联的comments的数据：**{ "id": 1, "body": "some comment1111", "postId": 2 }**

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

   （2）向上关联  （根据某个评论查看文章相关信息 ）  _expand   获取的是包含上级资源的数据

   > 路径：**http://localhost:8081/comments/2?_expand=post**
   > 上面这个路径获取的就是**comments**下**id**为2的数据和它关联的上级资源**post**，也就是**posts**下的：
   > **{ "id": 1, "title": "post的第一个title", "author": "typicode" }**

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

### 记忆化显示SideMenu

当选中侧边栏某一选项时，刷新后希望还是之前那栏被选中，并保证展开显示并且重定向时也是被选中显示的

首先获取当前路由：useLocation获取当前路由

```
const location=useLocation()

```

然后设置Meu中属性：

```
defaultSelectedKeys={location.pathname}
```

然后将其父栏展开并保证：

```
selectedKeys={location.pathname}
defaultOpenKeys={['/'+location.pathname.split('/')[1]]}
```

### 权限列表

1. Table

   column可以添加属性render，内部可以写样式

   ```
   const columns = [
           {
               title: 'ID',
               dataIndex: 'id',
               render:(id)=>{
                   return <b>{id}</b>
               }
           },
   ```

   分页：

   ```jsx
   <Table dataSource={dataSource} columns={columns}
       pagination={{
           pageSize:5
       }} />
   ```

   子数据展示：树形数据展示（有children，自动显示树形数据）

   ```jsx
   useEffect(() => {
       axios.get('http://localhost:8000/rights?_embed=children').then(res => {
           var list=res.data;
           list[0].children=''
           setDataSource(list)
       })
   })
   ```

   

2. 删除提示框

   ```js
   const deleteMethod=(item)=>{
       console.log(item)
       setDataSource(dataSource.filter(data=>data.id!==item.id))
       axios.delete(`http://localhost:8000/rights/${item.id}`)
   }
   ```

   但是遇到子级权限，删除不好使，所以根据grade进行判断是第几层的权限，然后做出相应操作

   ```js
    const deleteMethod = (item) => {
        console.log(item)
        if (item.grade === 1) {
            setDataSource(dataSource.filter(data => data.id !== item.id))
            axios.delete(`http://localhost:8000/rights/${item.id}`)
        }
        else {
            //将同一父级item.rightId下的子权限全部提取出来
            var list=dataSource.filter(data=>data.id===item.rightId)
            // console.log(list)
            //删除子级权限
            list[0].children=list[0].children.filter(data=>data.id!==item.id)
            console.log(list)
            // list浅拷贝，所以dataSource内部也会跟着改变
            // 因为改变的是第二级，所以需要在setDataSource时进行展开赋值
            setDataSource([...dataSource])
            axios.delete(`http://localhost:8000/children/${item.id}`)
   
        }
    }
   ```

3. 页面配置项

   对于页面侧边栏不显示的权限禁用处理，权限开关设置等

### 角色列表

注意：表格内部渲染，也是需要key值的，但是我们请求的角色列表的返回值是没有key值的，所以可以使用Table的`rowKey`属性，（`rowKey` ：表格行 key 的取值，可以是字符串或一个函数）



角色列表右边按钮权限选择，之前SideMenu使用的label，但是TreeNode识别的是title，使用序列化转换

思想如下（替换使用正则配合replace替换，正常情况下，replace只能替换一次）

```js
var list={'qwe':123,'qqq':111}
var s=JSON.stringify(list) 
s                       // '{"qwe":123,"qqq":111}'
s.replace('qwe','aaa')  // '{"aaa":123,"qqq":111}'
s                       // '{"qwe":123,"qqq":111}'
JSON.parse(s)           // {qwe: 123, qqq: 111}


var list=res.data
var s=JSON.parse(JSON.stringify(list).replace(/label/g,'title'))
```

对于点击权限的取消和添加，获取当前选中权限的id，然后map遍历查找覆盖成新的的currentsRights，（每次点击后，受控属性currentsRights就会发生改变）

```
    const handleOk = () => {
        setIsModalVisible(false);
        // console.log(currentId)
        //同步dataSource
        setDataSource(dataSource.map(item=>{
            if(item.id===currentId){
                return {
                    ...item,
                    rights:currentRights
                }
            }
            return item
        }))

        //同步数据库
        axios.patch(`http://localhost:8000/roles/${currentId}`,{
            rights:currentRights
        })
    };

```

### 用户列表

> 注意：columns在定义时，可以通过render改变渲染，其传入的第二个参数就是包含所有属性的状态item（请求得到的所有数据）



添加用户时，使用到了**forwardRef**透传，这样通过父组件的ref就能拿到子组件的ref相关输入数据

> 使用forwardRef包裹子组件，父组件定义状态（通过useRef）创建ref传递给子组件



添加用户时选择角色，如果选择了超级管理员，则区域选择栏为空并且禁用，使用定义状态isDisable，值传给region使用，然后改变方法给role角色选择处理，如果是超级管理员则改变isDisable的值并调用ref下方法将region的值设为空

（注意：点击添加时，需要对region的rules进行修改，不然会因为是空而无法提交，校验不成功）

```js
rules={isDisabled?[]:[{ required: true, message: 'Please input the title of collection!' }]}

```



```js
 onChange={(value)=>{
     if(value===1){
         ref.current.setFieldsValue({
             region:''
         })
         setIsDisabled(true)

     }
     else {
         setIsDisabled(false)
     }
 }}
```





上面处理后我们可以拿到表单提交的数据，如果要将其存入数据库并且同步到页面中，我们需要考虑id的问题，后续删除和更新都是依据id进行操作，所以需要先存入数据库，生成id后再拿到前端页面展示

```jsx
 const addFormOk = () => {
     addForm.current.validateFields().then(res => {
         // console.log(res)
         setIsVisible(false)
         addForm.current.resetFields()
         if (res.region === "") {
             res.region = "全球"
         }
         //先存入数据库
         axios.post(`http://localhost:8000/users`, {
             ...res,
             "roleState": true,
             "default": false,
         }).then(res1 => {
             //  console.log(res1.data)
             setDataSource([...dataSource, {
                 ...res1.data,
                 role: rolesList.filter(item => item.id === res.roleId)[0],
             }])
         })
     }).catch(error => {
         console.log(error)
     })
 }
```





用户状态改变（即是否允许登录）,给开关Switch挂载onChange事件

```js
 const handleChange = (item) => {
     item.roleState = !item.roleState;
     setDataSource([...dataSource])
     axios.patch(`http://localhost:8000/users/${item.id}`, {
         roleState:item.roleState
     })
 }
```





更新功能：要先显示原有数据，然后在原有数据上进行更新操作

```js
//获取原有数据并设置到ref上
updateForm.current.setFieldsValue(item)
```

！！！！！注意：这里上面操作一旦刷新就不会获取到数据了，因为是异步操作，所以需要转成同步

React17有setTimout，但是React18更新舍弃，但可以使用async/await

```js
async function handleUpdate(item){
    // console.log(item)
    await setIsUpdateVisible(true)
    await updateForm.current.setFieldsValue(item)
}
```





更新操作的时候，点下ok我们需要获取相关item，这个item是在handleUpdate中可以获取，所以额外定义一个状态进行存储

遍历dataSource获取当前点击的那个属性，（根据id判断）然后覆盖值（记得覆盖role）





### 登录页面

1. 页面顶部退出，添加点击事件，然后使用useNavigate

   ```js
   const navigate=useNavigate()
   
   navigate(`/login`)
   ```

2. 粒子效果引入（github搜react particle）

   ```
   https://github.com/wufe/react-particles-js
   ```

   这里注意层级问题；当粒子效果的层级提升后，会影响下级层级的点击事件，

   > 其实方法很简单只要设置样式： pointer-events: none;如果你已经设置一个元素的css属性为pointer-events: none。它将不会捕获任何click事件，而是让事件穿过该元素到达下面的元素Pointer-events原本来bai源于SVG，目前在很多浏览器中已经得到体现du。不过，要让任何zhiHTML元素生效还得借助于一点点css。该属性称之为pointer-events，基本上可以将它设置为auto，这是正常的行为，而“none”是一个有趣的属性

3. json-server限制

   正常表单登录验证，需要发送post请求，但是json-server本身认为post请求是在添加数据，所以这里表单提交验证使用get请求

4. token

   token设置直接采用明文` res.data`

5. 不同角色登录页不同展示

   数据存储时设置相应用户有相应权限，路由、侧边栏权限展示都与存储的key值有关，即每个数据对象都有一个属性key，这个key对应的是路由值，所以在每个角色的存储中，会有一项rights，内部是其所具有的权限（以路由形式存储）

   而区分不同角色的属性则是users数据对象中存储了roleId，根据roleId判断是哪一类角色

   然后显示时只需根据不同的角色中不同的rights属性进行显示渲染到侧边栏

6. 权限分配问题

   到现在为止，如果是区域管理员，其可以操作用户列表，但是注意，用户列表此时是包含超级管理员的，并且，对于区域管理员，是不能选择超级管理员这个一身份的。这里会出现权限混乱情况

   我们需要的是一个角色具有自己及比自己等级低的角色的权限

   ***（即区域管理员只能管理、编辑、删除同一区区域下的区域编辑）***

   然后再一个问题：创建和更新时，也需要注意以上权限问题，所以决定将创建和跟新在Form中分别针对不同的身份进行处理（注意还要对区域选择和角色选择分开处理，但两者逻辑一样）

### 路由权限

虽然我们可以根据角色的身份控制访问页面的相关权限显示，但是如果我们知道某个权限的路径，则可以直接通过访问地址跳转到相关页面而不受侧边栏的控制，也就是说我们可以通过地址栏访问所有路由

所以我们需要设置路由权限控制上面的问题

1. 权限数据扁平化

   想要设计一个动态的路由，我们希望后端给我们的是一个路由的一维的表，而不是一个多层的数组，我们还要逐层取数据，所以需要将权限的第1、2级合并处理，这里的合并需要进行两次请求，并将请求的结果合并没所以可以进行 

   ```js
   useEffect(()=>{
       Promise.all([
           axios.get('http://localhost:8000/rights'),
           axios.get('http://localhost:8000/children')
       ]).then(res=>{
           console.log(res)
           setBackData([...res[0].data,...res[1].data]) //得到扁平化数据
       })
   },[])
   
   //得到一个数组，数组中有两个数据分别是那两个请求
   //Array(2)
   //0: {data: Array(6), status: 200, statusText: 'OK', headers: {…}, config: {…}, …}
   //1: {data: Array(21), status: 200, statusText: 'OK', headers: {…}, config: {…}, …}
   
   ```

   然后就可以使用map遍历将路由表遍历出来，并在map中判断是否有权限，根据token获取数据

   > 判断有两种情况：
   >
   > 1. 当前用户的某些权限是否被关上（开关控制）
   > 2. 当前用户身份
   >
   > ```js
   >  const checkRoute=(item)=>{
   >      console.log(item)
   >      //判断是否有这个路径，并判断其pagepermisson是否为1，即开关是否打开
   >      return dataRoutes[item.key] && item.pagepermisson
   >  }
   >  const checkUserPermission=(item)=>{
   >      return rights.includes(item.key)
   >  }
   > ```
   >
   > 

### 进度条

```js
https://www.npmjs.com/search?q=nprogress
https://www.npmjs.com/package/nprogress

npm install --save nprogress

NProgress.start();
NProgress.done();

import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

使用axios拦截器
axios.interceptors.request.use(
    config => {
        NProgress.start() // 设置加载进度条(开始..)
        return config
    },
    error => {
        return Promise.reject(error)
    }
)
// axios响应拦截器
axios.interceptors.response.use(
    function (response) {
        NProgress.done() // 设置加载进度条(结束..)
        return response
    },
    function (error) {
        return Promise.reject(error)
    }
)
```

### axios拦截器（一）

```
import axios from 'axios'

axios.defaults.baseURL="http://localhost:8000"

```

### 新闻发布

新闻的发布有四种情况，：

```js
未发布（publishState=0）
待发布（publishState=1) 
已发布（publishState=2）
已下线（publishState=3)
```

#### 1.撰写新闻

引入pageHeader页头，Steps步骤组件

根据逻辑判断按钮显示，表单（Form）校验是否可以进入下一步（为空没有输入则不行）

> (引入富文本编辑器)
>
> 
>
> ~~github搜 react draft~~
>
> ```
> https://github.com/jpuri/react-draft-wysiwyg
> 
> npm install --save react-draft-wysiwyg draft-js
> ```
>
> ~~然后以html文件形式存储~~
>
> ```
> cnpm i --save draftjs-to-html  
> ```
>
> ```
>  // "react": "^18.2.0",
>  // "react-dom": "^18.2.0",
>  
> ```
>
> 使用 wangeditor
>
> 编辑器输出或者生成的 HTML 都是**纯标签**，没有内联样式。所以，显示 HTML 时需要你自定义样式。可参考以下示例
>
> ```
> https://github.com/wangfupeng1988/react-wangeditor-demo
> ```
>
> 

提交到草稿箱或者审核列表，定义两种状态为0，1，发起axios请求

```js
const handleNews = (e) => {
    axios.post('/news', {
        ...info,
        "content": content,
        "region": user.region?user.region:'全球',
        "author": user.username,
        "roleId": user.roleId,
        "auditState": e,
        "publishState": 0,
        "createTime": Date.now(),
        "star": 0,
        "view": 0,
    }).then(res=>{
        // console.log(res)
        navigate(`${e===0?'/news-manage/draft':'/audit-manage/list'}`)
        notification.info({
            message: `Notification`,
            description:
            `你可以到${e===0?'草稿箱':'审核列表'}中查看新闻`,
            placement:'bottomRight',
        });
    })
}

```

### 草稿箱

1. momentjs：创建时间显示

   ```
   cnpm i --save moment
   
   {moment(newsDetail.createTime).format('YYYY-MM-DD HH-mm-ss')}
   // HH是24时间制度  hh是12时间
   ```

2. html内容显示，防止XSS（跨站脚本攻击）

   为了防止XSS，所以{}是不支持html文件解析的

   如果非要解析：
   
   ```
   <div dangerouslySetInnerHTML={{
           __html:newsDetail.content
       }}></div>
   ```
   
3. 更新草稿

   首先获取原有信息，通过对news发起请求获取线管数据和分类，然后使用ref对Form表单进行初始化数据

   ```js
   useEffect(() => {
       axios.get(`/news/${params.id}?_expand=category`).then(res => {
           console.log(res.data)
           const {title,categoryId}=res.data
           newsForm.current.setFieldsValue({
               title,
               categoryId
           })
       })
   }, [params.id])
   ```

   对于富文本编辑器，注意判断useEffect的执行时间，依赖step，

   ```js
    useEffect(() => {
        setTimeout(() => {
            // console.log(props.content)
            if (props.content) {
                setHtml(props.content)
            }
        }, 0)
    }, [props.step])
   ```

   

### 审核列表

1. 请求的几个注意点

   这里会像news发起请求，筛选出，作者本人的、非草稿箱的、需要审核的

   > ​	1.username
   >
   > 2. **auditState**_ne=0    _ne表示不等于
   > 3. **publishState**_lte=1  表示小于等于

审核主要改变auditState，即文章发布前的一系列流程

发布则是改变publishedState，即文章发布后的状态（下线）

### 审核新闻

> 审核新闻需要判断当前用户角色（权限问题）
>
> 审核主要操作就是进行通过与不通过的处理，修改suditState状态值
>
> 审核新闻列表的数据必须都是suditState=1即处于审核中的数据

### 新闻分类

使用可编辑的单元格进行修改操作

### 发布管理

根据publishState=1/2/3进行区分是 【待发布/已发布/已下线】

## 状态管理

```
cnpm i --save redux react-redux
```

> Provider中传入整体store给所有组件使用
>
> 通过createStore创建store，传入reducer
>
> reducer创建传入prevState和action，通过combineReducer合并多个reducer
>
> 后续事件触发，调用dispatch({action})将这个action传递给reducer，reducer根据不同行为switch处理后，将结果返回，
>
> 如果想要获取store中定义的状态，引入connect，包裹组件connect（[store中所需]）（组件）
>
> ```
> connect(mapStateToProps,mapDispatchToProps)
> ```
>
> 以上同步处理
>
> 对于异步，redux和react-redux是无法直接处理的，可以引入中间件或redux-saga

## 加载中拦截器设置

github上搜axios

> https://github.com/axios/axios
>
> https://github.com/axios/axios#interceptors

```js
axios.interceptors.request.use(function (config) {
  // Do something before request is sent
  NProgress.done() // 设置加载进度条(结束..)
  store.dispatch({
    type:'change-loading',
    payload:true
  })
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});


// Add a response interceptor
axios.interceptors.response.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  NProgress.done() // 设置加载进度条(结束..)
  store.dispatch({
    type:'change-loading',
    payload:false
  })
  return response;
}, function (error) {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  store.dispatch({
    type:'change-loading',
    payload:false
  })
  return Promise.reject(error);
});
```

## 状态持久化存储

> 就是将想持久存储的状态存储在localStorage中，下面的插件可以很好的将redux和本地结合

github搜redux-persist

> https://github.com/rt2zz/redux-persist
>
> npm install redux-persist

应用步骤（按网上来）

> 1. 引入
>
>    ```
>    import { persistStore, persistReducer } from 'redux-persist'
>    import storage from 'redux-persist/lib/storage' 
>    ```
>
> 2. 创建
>
>    ```js
>    const persistConfig = {    //配置
>        key: 'persistData',
>        storage,
>    }
>    
>    const reducer = combineReducers({       //reducer
>        CollapsedReducer,
>        LoadingReducer,
>          whitelist: ['CollapsedReducer'] ,  //设置黑/白名单，选择性存储状态
>        // blacklist: ['LoadingReducer']
>    })
>    const persistedReducer = persistReducer(persistConfig, reducer)  
>      
>    
>    const store = createStore(persistedReducer);
>    const persistor = persistStore(store)
>    export {
>        store,
>        persistor
>    }
>    ```
>
> 3. 修改导出
>
>    ```js
>    import {axios} from '../../路径'
>    ```
>
> 4. 组件包裹
>
>    ```jsx
>     <Provider store={store}>
>        <PersistGate loading={null} persistor={persistor}>
>            <IndexRouter />
>        </PersistGate>
>    
>    </Provider>
>    ```
>
>    

## 动态布局

