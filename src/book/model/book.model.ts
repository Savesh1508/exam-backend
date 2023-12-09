import { BelongsTo, BelongsToMany, Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";
import { Author } from "../../author/model/author.model";
import { Category } from "../../category/model/category.model";

interface BookAttributes{
  name:string;
  pages:number;
  year:number;
  price:number;
  country:string;
  rating:number;
  description:string;
  categoryId:number;
  image:string;
  authorId:number;
}

@Table({ tableName: 'Book' })
export class Book extends Model<Book, BookAttributes> {
  @ApiProperty({ example: 1, description: 'Unique Id'})
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({example:"someBook", description:"Book name"})
  @Column({
    type: DataType.STRING(100),
    allowNull: false,
  })
  name: string;

  @ApiProperty({example:"100", description:"Book pages"})
  @Column({
    type: DataType.INTEGER,
  })
  pages: number;

  @ApiProperty({ example: "1973", description: "Book date" })
  @Column({
    type: DataType.INTEGER,
  })
  year: number;

  @ApiProperty({ example: "999,99", description: "Book price" })
  @Column({
    type: DataType.DECIMAL(10,2),
  })
  price: number;

  @ApiProperty({example:"someCountry", description:"Book country of origin"})
  @Column({
    type: DataType.STRING(100),
  })
  country: string;

  @ApiProperty({ example: "4.5", description: "Book rating" })
  @Column({
    type: DataType.DECIMAL(10,2),
  })
  rating: number;

  @ApiProperty({example:"someLongText", description:"Book description"})
  @Column({
    type: DataType.TEXT,
  })
  description: string;

  @ApiProperty({example:1, description:"Book category Id"})
  @ForeignKey(() => Category)
  @Column({
    type: DataType.INTEGER,
  })
  categoryId: number;
  @BelongsTo(() => Category)
  category: Category

  @ApiProperty({example:"someImage", description:"Book image"})
  @Column({
    type: DataType.STRING(255),
  })
  image: string;

  @ApiProperty({example:1, description:"Book author"})
  @ForeignKey(() => Author)
  @Column({
    type: DataType.INTEGER,
  })
  authorId: number;
  @BelongsTo(() => Author)
  author: Author
}