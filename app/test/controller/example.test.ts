import app from '../../app'
import request = require('supertest')
import faker = require('faker')

interface Example {
  id: number
  name: string
}

describe('test case: example controller', () => {
  let item: Example
  let total: number

  test('page/home', async () => {
    const response = await request(app.callback()).get('/examples/page/home')

    const { text } = response
    expect(text.includes('hello, tom'))
  })

  test('createOne', async () => {
    const n = 10
    for (let i = 0; i < n; i++) {
      const name = faker.name.findName()
      const response = await request(app.callback())
        .post('/examples')
        .send({
          name
        })
      const { body } = response
      expect(body.name).toEqual(name)
      expect(body.id > 0).toBe(true)
    }
  })

  test('getList', async () => {
    const { body } = await request(app.callback()).get('/examples')
    expect(body.data.length >= 10).toBe(true)
    item = body.data[0]
    total = body.pagination.total
  })

  test('getOne', async () => {
    const { body } = await request(app.callback()).get(`/examples/${item.id}`)
    expect(body.id).toBe(item.id)
    expect(body.name).toBe(item.name)
  })

  test('updateOne', async () => {
    const name = faker.name.findName()
    const { body } = await request(app.callback())
      .put(`/examples/${item.id}`)
      .send({
        name
      })
    expect(body.id).toBe(item.id)
    expect(body.name).toBe(name)
  })

  test('deleteOne', async () => {
    await request(app.callback()).delete(`/examples/${item.id}`)
    const {
      body: { pagination }
    } = await request(app.callback()).get('/examples')
    expect(pagination.total).toEqual(total - 1)
  })
})
