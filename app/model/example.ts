import { Column, DefaultScope, Length, Model, Table, DataType } from 'sequelize-typescript'

@DefaultScope({
  attributes: {
    exclude: ['_delete']
  }
})
@Table({ tableName: 'example' })
export default class Example extends Model<Example> {
  @Column({ comment: '自增 ID', autoIncrement: true, primaryKey: true })
  id: number

  @Length({ min: 3, max: 32 })
  @Column({ comment: '姓名', type: DataType.STRING(32) })
  name: string

  @Column({ comment: '是否删除', defaultValue: false })
  _delete: boolean
}
