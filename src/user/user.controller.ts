import {
  Controller, Body, Param,
  Post, Get, Put, Delete,
  HttpCode, HttpException,
  UseGuards, Res, HttpStatus
} from '@nestjs/common';
import { Response } from "express";
import { LoginUserDto } from "./dto/login-user.dto";
import { UserGuard } from "src/guards/user.guard";
import { CookieGetter } from "src/decorators/cookieGetter.decorator";
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './model/user.model';
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { Roles } from 'src/decorators/roles-auth.decorator';
import { RolesGuard } from 'src/guards/roles.guard';
import { AddRoleUserDto } from './dto/add-role.dto';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { UserSelfGuard } from '../guards/user-self.guard';

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}
  // @Roles('ADMIN')
  // @UseGuards(RolesGuard)
  @ApiOperation({summary:"Get all users"})
  @ApiResponse({status: 200, description: 'List of users', type: [User]})
  @Get()
  async getAllUsers():Promise<User[]>{
    const users = await this.userService.getAllUsers();
    return users;
  }

  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @ApiOperation({summary:"Get user by Id"})
  @ApiResponse({status: 200, description: 'User by Id', type: [User]})
  @Get(':id')
  async getUserById(@Param('id') id: string):Promise<User>{
    const user = await this.userService.getUserById(+id);
    return user;
  }

  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @ApiOperation({summary:"Get user by email"})
  @ApiResponse({status: 200, description: 'User by email', type: [User]})
  @Post('email')
  async getUserByEmail(@Body('email') email:string ):Promise<User>{
    const user = await this.userService.getUserByEmail(email);
    return user;
  }

  @ApiOperation({summary:"Update user by Id"})
  @ApiResponse({status: 200, description: 'Updated user', type: [User]})
  @UseGuards(UserSelfGuard)
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async updateUserById(@Param('id') id:string, @Body() updateComanyDto: UpdateUserDto):Promise<User>{
    const user = await this.userService.updateUserById(+id, updateComanyDto);
    return user;
  }

  @ApiOperation({summary:"Delete user by Id"})
  @ApiResponse({status: 200, description: 'Deleted user', type: [User]})
  @UseGuards(UserSelfGuard)
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteUserById(@Param('id') id: string) {
    const user = await this.userService.deleteUserById(+id);
    return user;
  }

  @ApiOperation({ summary: "Register user" })
  @ApiResponse({ status: 200, type: User })
  @Post("signup")
  registration(
    @Body() createUserDto: CreateUserDto,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.userService.registration(createUserDto, res);
  }

  @ApiOperation({ summary: "Login user" })
  @ApiResponse({ status: 200, type: User })
  // @UseGuards(UserGuard)
  @Post("signin")
  login(
    @Body() loginUserDto: LoginUserDto,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.userService.login(loginUserDto, res);
  }

  @ApiOperation({ summary: "Logout user" })
  @ApiResponse({ status: 200, type: User })
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  @Post("logout")
  logout(
    @CookieGetter('refresh_token') refreshToken: string,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.userService.logout(refreshToken, res);
  }

  @UseGuards(UserGuard)
  @Post(':id/refresh')
  refresh(
    @Param('id') id:string,
    @CookieGetter('refresh_token') refreshToken: string,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.userService.refreshToken(+id, refreshToken, res);
  }

  @ApiOperation({summary:"Add role to user"})
  @ApiResponse({status: 200, description: 'Updated user', type: [User]})
  @HttpCode(200)
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Post('add_role')
  addRole(@Body() addRoleUserDto: AddRoleUserDto) {
    return this.userService.addRole(addRoleUserDto);
  }

  @ApiOperation({summary:"Remove role from user"})
  @ApiResponse({status: 200, description: 'Updated user', type: [User]})
  @HttpCode(200)
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Post('remove_role')
  removeRole(@Body() addRoleUserDto: AddRoleUserDto) {
    return this.userService.removeRole(addRoleUserDto);
  }
}
