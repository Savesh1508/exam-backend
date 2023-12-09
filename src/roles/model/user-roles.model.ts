import { Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { User } from "src/user/model/user.model";
import { Role } from "./role.model";
import { ApiProperty } from "@nestjs/swagger";

@Table({ tableName: 'user_roles', createdAt: false, updatedAt: false })
export class UserRoles extends Model<UserRoles> {
  @ApiProperty({ example: 1, description: 'Unique Id'})
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true
  })
  id: number;

  @ApiProperty({ example: 1, description: 'User Id'})
  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER })
  userId: number;

  @ApiProperty({ example: 1, description: 'Role Id'})
  @ForeignKey(() => Role)
  @Column({ type: DataType.INTEGER })
  roleId: number;
}