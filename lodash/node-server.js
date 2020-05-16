class EventEmitter {
  constructor(){
    this.stack = {}
  }

  on(str,f){
    if(str in this.stack){
      this.stack[str].push(f)
    } else{
      this.stack[str] = [f]
    }
  }

  off(str,f){
    if(str in this.stack){
      this.stack[str] = this.stack[str].filter(it => it != f)
    }
  }

  //once

  emit(str,...args){
    this.stack[str].forEach(func=>func.call(this,...args))
  }
  }

  function readFilePromise(path) {
    return new Promise((resolve,reject)=>{
      fs.readFile(path,function(err,res){
        if(err == null){
          resolve(res)
        } else{
          reject(err)
        }
      })
    })
  }

  function writeFilePromise(path,content) {
    return new Promise((resolve,reject)=>{
      fs.writeFile(path,content,function(err,result){
        if(err){
          reject(err)
        } else{
          resolve(reject)
        }
      })
    })
  }
  
  //f的最后一个参数肯定是回调
  function promiseify(f) {
    return function(...args){
      return new Promise((resolve,reject)=>{
         f.call(this,...args,function(err,result){
           if(err){
             reject(err)
           }else{
             resolve(result)
           }
         })
      })
    }
    
  }
  
  //把promise函数变成一个callback函数
  function callbackify(f) {
    return function(...args){
      var callback = args.pop()
      f.call(this,...args).then(result=>{
        callback(null,result)
      },reason=>{callback(reason,null)})
    }
  }

//自己建一个文件访问服务器，要求如下
//在浏览器中直接打开文件夹会显示里面的index.html
//如果没有index.html文件，那么会显示文件目录，并且用a标签包起来显示在页面中
//建立http服务器和发送http请求都可以使用node里面的axios模块，好像只有发送能用


var http = require("http")
var url = require("url")

const httpServer = http.createServer((req,res) =>{
  res.write("<a>helli</a>")
  res.end
})

httpServer.listen("8080",()=>console.log(listening on 8080))
