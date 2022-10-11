const webSocket = require('ws');

// 引用Server类:
const WebSocketServer = webSocket.Server;

// 实例化:
const wss = new WebSocketServer({
  port: 3000
});
wss.on('connection', function (ws :any) {
  console.log(`连接websocket成功`);
  let data ="90,80,false"
  ws.send(data)
  ws.on('message', function (message: string) {
    console.log(`[SERVER] Received: ${message}`);
    ws.send(`ECHO: ${message}`, (err:string) => {
      if (err) {
        console.log(`[SERVER] error: ${err}`);
      }
    });
  })
  setInterval(() => {
    let d="10,10,true"
    ws.send(d)
  },5000)
});
