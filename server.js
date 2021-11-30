// server.js
const http = require('http')
const port = 8000;

http.createServer(function (req, res) {

  res.writeHead(200, {   // 開啟Cors
    //設置允許跨域的域名，也可設置*允許所有域名
    'Access-Control-Allow-Origin': '*',
    //跨域允許的請求方法，也可設置*允許所有方法
    "Access-Control-Allow-Methods": "DELETE,PUT,POST,GET,OPTIONS",
    //允許的header類型
    'Access-Control-Allow-Headers': 'Content-Type'
  })
  let list = []
  let num = 0

  // 生成 10萬條 data的 list
  for (let i = 0; i < 100000; i++) {
    num++
    list.push({
      src: 'https://www.dora-world.com.tw/dist/images/character_3.png',
      text: `我是${num}號大雄`,
      tid: num
    })
  }
  res.end(JSON.stringify(list));
}).listen(port, function () {
  console.log('server is listening on port ' + port);
})