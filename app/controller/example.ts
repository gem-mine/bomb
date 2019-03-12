import { Authorized, Body, Ctx, Delete, Get, Controller, Param, QueryParam, Post, Put, Render } from '@gem-mine/routing-controllers'
import Example from '../service/example'
import { toJSON, pagination, LIMIT } from '../util/model'

// 示例
@Controller('/examples')
export default class {
  // 渲染页面
  @Render('example.html')
  @Get('/page/home')
  async page() {
    return {
      name: 'tom'
    }
  }

  // 从数据库中获取列表数据
  @Get('/')
  async getList(@QueryParam('name') name: string = '', @QueryParam('offset') offset: number = 0, @QueryParam('limit') limit: number = LIMIT) {
    const query = await Example.getList({ name, offset, limit })
    const result = pagination({ query, offset, limit })
    return result
  }

  // 往数据库添加一条数据
  @Post('/')
  async createOne(@Body() { name }: { name: string }) {
    const data = await Example.createOne({ name })
    return toJSON({
      data,
      exclude: ['_delete']
    })
  }

  // 从数据库获取一条数据
  @Get('/:id')
  async getOne(@Param('id') id: number) {
    const data = await Example.getOne(id)
    return toJSON({ data })
  }

  // 从数据库修改一条数据
  @Put('/:id')
  async updateOne(@Param('id') id: number, @Body() { name }: { name: string }) {
    const data = await Example.updateOne(id, { name })
    return toJSON({ data })
  }

  // 从数据库删除一条数据
  @Delete('/:id')
  async deleteOne(@Param('id') id: number) {
    const data = await Example.deleteOne(id)
    return toJSON({ data })
  }

  // 数据库事务操作
  @Post('/database/transaction')
  async transaction(@Body() { index, flag }: { index: number; flag: boolean }) {
    await Example.transaction(index, flag)
    return { done: true }
  }

  // redis 取值
  @Get('/redis/get/age')
  async getAgeCache() {
    const value = await Example.getAgeCache()
    let age: number | undefined
    if (value) {
      age = parseInt(value, 10)
    }
    return { value: age }
  }

  // redis 设值
  @Post('/redis/set/age')
  async setAgeCache(@Body() { value }: { value: number }) {
    await Example.setAgeCache(value)
    return { done: true }
  }

  // session set 示例
  @Get('/session/set')
  async setSession(@Ctx() ctx) {
    ctx.session.name = 'poly'
    // 删除整个 session
    // ctx.session = null
    // 删除单个 session 的 key
    // delete ctx.session.name
    return {
      message: '请访问 /examples/session/get 查看'
    }
  }

  // session get 示例
  @Get('/session/get')
  async getSession(@Ctx() ctx) {
    return {
      name: ctx.session.name
    }
  }

  // cookie set 示例
  @Get('/cookie/set')
  async setCookie(@Ctx() ctx) {
    // 全局过期时间
    ctx.cookies.set('token', 'abcdefg')
    //  自定义过期时间
    ctx.cookies.set('salt', 'haha', {
      maxAge: 4 * 1000
    })
    return {
      message: '请访问 /examples/cookie/get 查看'
    }
  }

  // cookie get 示例
  @Get('/cookie/get')
  async getCookie(@Ctx() ctx) {
    return {
      token: ctx.cookies.get('token'),
      salt: ctx.cookies.get('salt')
    }
  }

  // 权限验证示例
  @Authorized()
  @Get('/auth/verify')
  async authVerify(@Ctx() ctx) {
    return ctx.user
  }
}
