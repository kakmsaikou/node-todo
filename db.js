// 把本地的 home 目录作为数据库存储
const homedir = require('os').homedir()
const home = process.env.HOME || homedir
const p = require('path')
const fs = require('fs')
// join() 会根据不同 os 自动拼接路径
const dbPath = p.join(home, '.todo')

const db = {
  read(path = dbPath) {
    return new Promise((resolve, reject) => {
      // {flag: 'a+'} 读取文件，若不存在则创建文件
      fs.readFile(path, {flag: 'a+'}, (error, data) => {
        if (error) return reject(error)
        let list
        try {
          list = JSON.parse(data.toString())
        } catch (error2) {
          list = []
        }
        resolve(list)
      })
    })
  },

  write(list, path = dbPath) {
    return new Promise((resolve, reject) => {
      const str = JSON.stringify(list)
      fs.writeFile(path, str + '\n', (error) => {
        if (error) return reject(error)
        resolve()
      })
    })
  }
}

module.exports = db