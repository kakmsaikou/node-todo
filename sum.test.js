const sum = require('./sum')

test('add 1 + 2 to equal 3', ()=>{
  // 期望结果为 3
  expect(sum(1,2)).toBe(3)
})

test('to be true', ()=>{
  // 期望结果为 true
  expect(1).toBeTruthy()
})

