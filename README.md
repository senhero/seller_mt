> 一直对vue很感兴趣，最近使用vue2.0开发了高仿美团商家页面来练练手，不得不说vue2.*一个很不错的框架，但是也遇到过一些坑，在这里和大家分享一下

# **商家详情页面**
> vue2.0、vue-router、axios、webpack2.*、better-scroll、Velocity、fontawesome 

## 功能/组件
- [x] 购物车
- [x] 购买物品小球飞入动画（自定义动画）
- [x] 评价star组件
- [x] 商品添加、删除组件
- [x] 目录、列表联动滚动
- [x] 画廊
- [x] 评论的内容页面上拉加载新数据
- [x] 商品详情页面
- [x] 商家介绍页面
## 构建
vue有自己的脚手架构建工具vue-cli,使用起来非常方便，使用webpack来集成各种开发便捷工具
- 代码热更新，修改代码之后网页无刷新改变，对前端开发来说非常的方便
- PostCss，再也不用去管兼容性的问题了，只针对chrome写css代码，会自动编译生成支持多款浏览器的css代码
- bable，ES2015出来已经有一段时间了，但是不少浏览器还没有兼容ES6.有了bable，放心使用ES6语法，它会自动转义成ES5语法。
- 除此之外，vue-cli已经使用node配置了一套本地服务器和安装命令等，本地运行和打包只需要一个命令就可以搞定，非常的方便
- mock的数据采用了后端代理的方式 本地搭建一个服务器同过express路由地址请求数据
## 开发
vue融合了react和angular 指令的思想，一个vue组件将html 、js、css代码写到一个页面里面，这样既方便开发，又方便修改和更新。
### Axios
在vue1.0中，官方推荐的HTTP请求工具是vue-resource，但是在vue2.0的时候将推荐工具改成了[axios](https://www.npmjs.com/package/axios)。
最初是想用内置[fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)，但是测试完在移动端（uc，内置浏览器，qq）(微信内置浏览器支持) 没法发送请求，所以放弃fetch （虽然是很好用）。


使用方式都差不多，但需要注意的是：接口返回的res并不直接是返回的数据，而是经过axios本身处理过的json对象。真正的数据在res.data里：

```javascript
axios.get(url).then((res)=>{
  this.data = res.data
})
```
### Vue-Router
vue-router是vue的路由系统，可以用来创建单页应用。基本思想是在主页面中引入标签，然后定义路由，把router挂在到app上，然后把各个子页面渲染到view里面。使用起来还是很方便的， 跳转页面只需要

```javascript
router.push('page1')
```
### 获取元素节点
vue2.0废除了v-el指令，所有的节点指令修改为ref，然后通过refs对象来获取元素节点（element），如:
```html
<div ref="testHook">test</div>
...js code
this.$ref.testHook
```
### 组件间的通信
- 如果父级和子组件通信，则使用ref就可以实现，如：
```html
<test ref="testHook"></test>
...js code
this.$ref.testHook.add() //调用test子组件的add方法
```
- 使用emit来发送广播

    vue2提供了一套广播机制，即一边发送广播，一边接收广播来执行相应操作。使用方法如下：
```javascript
  export default {
  method:{
  	click(){
  	  Vue.$emit('add',{}) //第二个参数可作为传递数据传送到监听端口，不需要则传空对象
  	}
  }
}
```
那么test组件中就需要监听，在created方法里写:
```javascript
export default {
  created(){
   Vue.$on('add',this.add)
  },
  method:{
  	add(){
  	  this.count++
  	}
  }
}
```
### webpack2.*(采用后端代理加载数据)
[webpack](http://webpack.github.io/docs/) 配置项 config目录 index.js文件
```javascript
proxyTable: {
    '/api':{
        target:'http://localhost:9000',
        pathRewrite:{
            '^/api':'/api'
        }
    }
},
```


# 安装步骤
```text
# install dependencies
npm install

# serve proxy localhost:9000
node prodsever.js

# server will run localhost:8181
npm run dev

```
