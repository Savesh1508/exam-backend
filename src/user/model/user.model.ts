import { BelongsTo, BelongsToMany, Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";
import { Role } from "../../roles/model/role.model";
import { UserRoles } from "../../roles/model/user-roles.model";

interface UserAttributes{
  name:string;
  surname:string;
  phone:string;
  email:string;
  hashed_password:string;
  refresh_token:string;
}

@Table({ tableName: 'User' })
export class User extends Model<User, UserAttributes> {
  @ApiProperty({ example: 1, description: 'Unique Id'})
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({example:"someUser", description:"User name"})
  @Column({
    type: DataType.STRING(100),
  })
  name: string;

  @ApiProperty({example:"someUser", description:"User surname"})
  @Column({
    type: DataType.STRING(100),
  })
  surname: string;

  @ApiProperty({example:"+998900000000", description:"User phone"})
  @Column({
    type: DataType.STRING,
  })
  phone:string;

  @ApiProperty({example:"someemail@gmail.com", description:"User email"})
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true
  })
  email:string;

  @ApiProperty({example:"Uzbek1$0n", description:"User password"})
  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  hashed_password: string;

  @ApiProperty({example:"somerefreshtoken", description:"User hashed refresh token"})
  @Column({
    type: DataType.STRING,
  })
  refresh_token: string;

  @ApiProperty({ example: ['Roles'], description: 'User roles'})
  @BelongsToMany(() => Role, () => UserRoles)
  roles: Role[];
}