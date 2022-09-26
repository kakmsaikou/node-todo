const db = require('../db.js')
const fs = require('fs')
jest.mock('fs')

describe('db', () => {
  // 清空 mocks 防止调用相同路径，不同测试代码之间相互干扰
  afterEach(()=>{
    fs.clearMocks()
  })

  it('can read', async () => {
    const data = [{title: 'hi', done: true}]
    fs.setReadFileMock('/xxx', null, JSON.stringify(data))
    const list = await db.read('/xxx')
    // 对比对象，要使用 toStrictEqual()
    expect(list).toStrictEqual(data)
  })

  it('can write', async () => {
    let fakeFile
    fs.setWriteFileMock('/yyy', (path, data, callback) => {
      fakeFile = data
      callback(null)
    })
    const list = [{title: 'cook', done: true}, {title: 'eat', done: true}]
    await db.write(list, '/yyy')
    expect(fakeFile).toBe(JSON.stringify(list) + '\n')
  })
})