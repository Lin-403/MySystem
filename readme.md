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

## 路由

![image-20220623211033515](C:\Users\ASUS\Desktop\MySystem\images\image-20220623211033515.png)

### 安装

```
cnpm i --save react-router-dom
```

