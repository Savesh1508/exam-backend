import { BelongsToMany, Column, DataType, Model, Table } from "sequelize-typescript";
import { User } from "src/user/model/user.model";
// import { UserRoles } from "./user-roles.model";
import { ApiProperty } from "@nestjs/swagger";

interface RoleCreationAttributes {
  value: string;
  description: string;
}

@Table({ tableName: 'roles' })
export class Role extends Model<Role, RoleCreationAttributes> {
  @ApiProperty({ example: 1, description: 'Unikal ID'})
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true
  })
  id: number;

  @ApiProperty({example:"USER", description:"User role"})
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true
  })
  value: string;

  @ApiProperty({example:"USER role", description:"Info about users role"})
  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  description: string;

  // @BelongsToMany(() => User, () => UserRoles)
  // users: User[];
}
