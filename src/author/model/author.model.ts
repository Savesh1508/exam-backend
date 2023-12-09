import { BelongsTo, BelongsToMany, Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";
import { Book } from "../../book/model/book.model";

interface AuthorAttributes{
  name:string;
  surname:string;
  birth:Date;
  death:Date;
  country:string;
  biography:string;
  image:string;
}

@Table({ tableName: 'Author' })
export class Author extends Model<Author, AuthorAttributes> {
  @ApiProperty({ example: 1, description: 'Unique Id'})
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({example:"someAuthor", description:"Author name"})
  @Column({
    type: DataType.STRING(100),
    allowNull: false,
  })
  name: string;

  @ApiProperty({example:"someAuthor", description:"Author surname"})
  @Column({
    type: DataType.STRING(100),
  })
  surname: string;

  @ApiProperty({ example: "1990-01-01", description: "Author date of birth" })
  @Column({
    type: DataType.DATE,
  })
  birth: Date;

  @ApiProperty({ example: "1990-01-01", description: "Author date of death" })
  @Column({
    type: DataType.DATE,
  })
  death: Date;

  @ApiProperty({example:"someCountry", description:"Author country of origin"})
  @Column({
    type: DataType.STRING(100),
  })
  country: string;

  @ApiProperty({example:"someLongText", description:"Author biography"})
  @Column({
    type: DataType.TEXT,
  })
  biography: string;

  @ApiProperty({example:"someImage", description:"Author image"})
  @Column({
    type: DataType.STRING(255),
  })
  image: string;

  @HasMany(() => Book)
  books: Book[];
}