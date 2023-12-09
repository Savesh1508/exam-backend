import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './model/user.model';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { Role } from 'src/roles/model/role.model';
import { RolesModule } from 'src/roles/roles.module';
import { UserRoles } from 'src/roles/model/user-roles.model';
import { JwtModule, JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    SequelizeModule.forFeature([User, Role, UserRoles]),
    JwtModule.register({}),
    RolesModule,
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule {}
