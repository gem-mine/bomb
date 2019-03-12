import app from '../../app'
import './global'
import request = require('supertest')
import faker = require('faker')
const waitForExpect = require('wait-for-expect')

const instance = app.callback()

interface Example {
  id: number
  name: string
}

describe('test case: example controller', () => {
  let item: Example
  let total: number

  test('response page: page/home', async () => {
    const response = await request(instance).get('/examples/page/home')

    const { text } = response
    expect(text.includes('hello, tom'))
  })

  test('restful: createOne', async () => {
    const n = 10
    for (let i = 0; i < n; i++) {
      const name = faker.name.findName()
      const response = await request(instance)
        .post('/examples')
        .send({
          name
        })
      const { body } = response
      expect(body.name).toEqual(name)
      expect(body.id > 0).toBe(true)
    }
  })

  test('restful: getList', async () => {
    const { body } = await request(instance).get('/examples')
    expect(body.data.length >= 10).toBe(true)
    item = body.data[0]
    total = body.pagination.total
  })

  test('restful: getOne', async () => {
    const { body } = await request(instance).get(`/examples/${item.id}`)
    expect(body.id).toBe(item.id)
    expect(body.name).toBe(item.name)
  })

  test('restful: updateOne', async () => {
    const name = faker.name.findName()
    const { body } = await request(instance)
      .put(`/examples/${item.id}`)
      .send({
        name
      })
    expect(body.id).toBe(item.id)
    expect(body.name).toBe(name)
  })

  test('restful: deleteOne', async () => {
    await request(instance).delete(`/examples/${item.id}`)
    const {
      body: { pagination }
    } = await request(instance).get('/examples')
    expect(pagination.total).toEqual(total - 1)
  })

  test('database transaction', async () => {
    const res1 = await request(instance).get('/examples')
    const res2 = await request(instance)
      .post(`/examples/database/transaction`)
      .send({
        index: 50,
        flag: true
      })
    expect(res2.body.code).toBe(500)

    const res3 = await request(instance).get('/examples')
    expect(res1.body.pagination.total).toEqual(res3.body.pagination.total)
    const res4 = await request(instance)
      .post(`/examples/database/transaction`)
      .send({
        index: 60
      })
    expect(res4.body.done).toBe(true)
    const res5 = await request(instance).get('/examples')
    expect(res1.body.pagination.total + 2).toEqual(res5.body.pagination.total)
  })

  test('session', async () => {
    // 使用 session、cookie 的需要使用 agent
    // see: https://github.com/visionmedia/supertest/issues/46
    const agent = request.agent(instance)
    await agent.get('/examples/session/set')
    const res = await agent.get('/examples/session/get')
    expect(res.body.name).toEqual('poly')
  })

  test('cookie', async done => {
    const agent = request.agent(instance)
    await agent.get('/examples/cookie/set')
    let salt
    setTimeout(async () => {
      const res = await agent.get('/examples/cookie/get')
      salt = res.body.salt
      done()
    }, 2000)
    await waitForExpect(() => {
      expect(salt).toEqual('haha')
    })
  })

  test('cookie but expired', async done => {
    const agent = request.agent(instance)
    await agent.get('/examples/cookie/set')

    let salt
    setTimeout(async () => {
      const res = await agent.get('/examples/cookie/get')
      salt = res.body.salt
      done()
    }, 4000)
    await waitForExpect(() => {
      expect(salt).toEqual(undefined)
    })
  })

  test('authorization decorator', async () => {
    const res1 = await request(instance).get('/examples/auth/verify')
    expect(res1.body.code).toEqual(401)

    const res2 = await request(instance).get('/examples/auth/verify').set('authorization', 'it_is_a_mock_token')
    expect(res2.body.id).toEqual(1000)
    expect(res2.body.name).toEqual('jerry')
  })

  test('redis', async () => {
    const age = Math.ceil(Math.random() * 100)
    const res1 = await request(instance).post('/examples/redis/set/age').send({
      value: age
    })
    expect(res1.body.done).toEqual(true)

    const res2 = await request(instance).get('/examples/redis/get/age')
    expect(res2.body.value).toEqual(age)
  })
})
