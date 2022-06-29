// import { WebSocketServer } from "ws";
import ws from "nodejs-websocket";
// const server = new WebSocketServer({port: 8088});

// 链接成功
// server.on('connection',function(socket){
const server = ws.createServer(function(socket){
    socket.send(JSON.stringify({type:'server',content:'hello from server'}))
    console.log(server.connections,'server')

    // 监听消息
    // socket.on('message',function(data){
    socket.on('text',function(data){
        const msg = JSON.parse(data);
        switch (msg.type){
            case 'server' :
                // console.log(msg,'msg')
                server.connections.forEach(item=>{
                    item.send(JSON.stringify({type:'server',content:'server 转发 client消息'}))
                    // socket.send(JSON.stringify({type:'server',content:'server 转发 client消息'}))
                })
                break;
        }
    })
})
.listen(8088,()=>{})

console.log('%c wsServer执行完毕','color:blue')


// 注释代码为失败方案,无法实现聊天,只能实现客户端、服务端的收发数据