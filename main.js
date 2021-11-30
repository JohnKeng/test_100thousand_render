// 獲取container對象
const container = document.getElementById('container')
const getList = () => {
  return new Promise((resolve, reject) => {
      //步驟一: 創建 XMLHttpRequest 對象
      var ajax = new XMLHttpRequest();
      //步驟二: 設置請求參數 ,arg[0] 是請求方法,arg[1] 是請求 url,可以帶參數
      ajax.open('get', 'http://127.0.0.1:8000');
      //步驟三:發送請求
      ajax.send();
      //步驟四:註冊事件 onreadystatechange 狀態改變就會調用
      ajax.onreadystatechange = function () {
          if (ajax.readyState == 4 && ajax.status == 200) {
              //步驟五 如果能夠進到這個判斷 說明 data 完美的回來了,並且請求的頁面是存在的
              resolve(JSON.parse(ajax.responseText))
          }
      }
  })
}
// 方法一 直接渲染
const renderList1 = async () => {
  console.time('列表時間')
  const list = await getList()
  list.forEach(item => {
      const div = document.createElement('div')
      div.className = 'sunshine'
      div.innerHTML = `<img src="${item.src}" /><span>${item.text}</span>`
      container.appendChild(div)
  })
  console.timeEnd('列表時間')
}
// 方法二 setTimeout 分頁渲染
const renderList2 = async () => {
  console.time('列表時間')
  const list = await getList()
  console.log(list)
  const total = list.length
  const page = 0
  const limit = 200
  const totalPage = Math.ceil(total / limit)

  const render = (page) => {
      if (page >= totalPage) return
      setTimeout(() => {
          for (let i = page * limit; i < page * limit + limit; i++) {
              const item = list[i]
              const div = document.createElement('div')
              div.className = 'sunshine'
              div.innerHTML = `<img src="${item.src}" /><span>${item.text}</span>`
              container.appendChild(div)
          }
          render(page + 1)
      }, 0)
  }
  render(page)
  console.timeEnd('列表時間')
}
// 方法三 requestAnimationFrame
const renderList3 = async () => {
  console.time('列表时间')
  const list = await getList()
  console.log(list)
  const total = list.length
  const page = 0
  const limit = 200
  const totalPage = Math.ceil(total / limit)

  const render = (page) => {
      if (page >= totalPage) return
      // 使用requestAnimationFrame代替setTimeout
      requestAnimationFrame(() => {
          for (let i = page * limit; i < page * limit + limit; i++) {
              const item = list[i]
              const div = document.createElement('div')
              div.className = 'sunshine'
              div.innerHTML = `<img src="${item.src}" /><span>${item.text}</span>`
              container.appendChild(div)
          }
          render(page + 1)
      })
  }
  render(page)
  console.timeEnd('列表时间')
}
// 方法四 fragment + requestAnimationFrame
const renderList4 = async () => {
  console.time('列表時間')
  const list = await getList()
  console.log(list)
  const total = list.length
  const page = 0
  const limit = 200
  const totalPage = Math.ceil(total / limit)

  const render = (page) => {
      if (page >= totalPage) return
      requestAnimationFrame(() => {
          // 創建一個 fragment
          const fragment = document.createDocumentFragment()
          for (let i = page * limit; i < page * limit + limit; i++) {
              const item = list[i]
              const div = document.createElement('div')
              div.className = 'sunshine'
              div.innerHTML = `<img src="${item.src}" /><span>${item.text}</span>`
              // 先塞進 fragment
              fragment.appendChild(div)
          }
          // 一次性 appendChild
          container.appendChild(fragment)
          render(page + 1)
      })
  }
  render(page)
  console.timeEnd('列表時間')
}
