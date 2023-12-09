import { Module } from '@nestjs/common';
import { RoleService } from './roles.service';
import { RoleController } from './roles.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Role } from './model/role.model';

@Module({
  imports: [SequelizeModule.forFeature([Role])],
  controllers: [RoleController],
  providers: [RoleService],
  exports: [RoleService]
})
export class RolesModule {}
