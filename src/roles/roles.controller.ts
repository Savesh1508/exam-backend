import {
  Controller, Body, Param,
  Post, Get, Put, Delete,
  UseGuards
} from '@nestjs/common';
import { RoleService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role } from './model/role.model';
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { Roles } from 'src/decorators/roles-auth.decorator';
import { RolesGuard } from 'src/guards/roles.guard';

@ApiTags('Roles')
@Controller('roles')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @ApiOperation({summary:"Create role"})
  @ApiResponse({status: 200, description: 'New role', type: [Role]})
  // @Roles('SUPERADMIN')
  // @UseGuards(RolesGuard)
  @Post()
  async createRole(@Body() createRoleDto: CreateRoleDto){
    const role = await this.roleService.createRole(createRoleDto);
    return role;
  }

  @ApiOperation({summary:"Get all roles"})
  @ApiResponse({status: 200, description: 'All roles', type: [Role]})
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Get()
  async getAllRoles():Promise<Role[]>{
    const roles = await this.roleService.getAllRoles();
    return roles;
  }

  @ApiOperation({summary:"Get role by value"})
  @ApiResponse({status: 200, description: 'Role by value', type: [Role]})
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Get(':value')
  async getRoleByValue(@Param('value') value: string) {
    const role = await this.roleService.getRoleByValue(value);
    return role;
  }

  @ApiOperation({summary:"Update role by Id"})
  @ApiResponse({status: 200, description: 'Updated role', type: [Role]})
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Put(':id')
  async updateRoleById(@Param('id') id:string, @Body() updateComanyDto: UpdateRoleDto):Promise<Role>{
    const role = await this.roleService.updateRoleById(+id, updateComanyDto);
    return role;
  }

  @ApiOperation({summary:"Delete role by value"})
  @ApiResponse({status: 200, description: 'Delete by value', type: [Role]})
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Delete(':value')
  async deleteRoleByValue(@Param('value') value: string) {
    const role = await this.roleService.deleteRoleByValue(value);
    return role;
  }
}
