import { BelongsTo, BelongsToMany, Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";
import { Book } from "../../book/model/book.model";

interface CategoryAttributes{
  name:string;
}

@Table({ tableName: 'Category' })
export class Category extends Model<Category, CategoryAttributes> {
  @ApiProperty({ example: 1, description: 'Unique Id'})
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({example:"someCategory", description:"Category name"})
  @Column({
    type: DataType.STRING(100),
    allowNull: false,
  })
  name: string;

  @HasMany(() => Book)
  category_books: Book[];
}