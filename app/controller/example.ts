import { Body, Delete, Get, Controller, Param, QueryParam, Post, Put, Render } from '@gem-mine/routing-controllers'
import Example from '../service/example'
import { toJSON, pagination, LIMIT } from '../util/model'

@Controller('/examples')
export default class {
  @Get('/page/home')
  @Render('example.html')
  async page() {
    return {
      name: 'tom'
    }
  }

  @Get('/')
  async getList(@QueryParam('name') name: string = '', @QueryParam('offset') offset: number = 0, @QueryParam('limit') limit: number = LIMIT) {
    const query = await Example.getList({ name, offset, limit })
    const result = pagination({ query, offset, limit })
    return result
  }

  @Post('/')
  async createOne(@Body() { name }: { name: string }) {
    const data = await Example.createOne({ name })
    return toJSON({
      data,
      exclude: ['_delete']
    })
  }

  @Get('/:id')
  async getOne(@Param('id') id: number) {
    const data = await Example.getOne(id)
    return toJSON({ data })
  }

  @Put('/:id')
  async updateOne(@Param('id') id: number, @Body() { name }: { name: string }) {
    const data = await Example.updateOne(id, { name })
    return toJSON({ data })
  }

  @Delete('/:id')
  async deleteOne(@Param('id') id: number) {
    const data = await Example.deleteOne(id)
    return toJSON({ data })
  }
}
