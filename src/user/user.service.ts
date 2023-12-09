import { HttpException, HttpStatus, BadRequestException, Injectable, UnauthorizedException, ForbiddenException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectModel } from "@nestjs/sequelize";
import { RoleService } from "src/roles/roles.service";
import { AddRoleUserDto } from "./dto/add-role.dto";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { User } from "./model/user.model";
import * as bcrypt from "bcrypt";
import { Response } from "express";
import { LoginUserDto } from "./dto/login-user.dto";

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User) private userRepo: typeof User,
    private readonly jwtService: JwtService,
    private readonly roleService: RoleService,
  ){}
  async getAllUsers():Promise<User[]> {
    const users = await this.userRepo.findAll({include: {all: true}});
    return users;
  }

  async getUserById(id:number) {
    const user = await this.userRepo.findOne({where: {id}, include: {all: true}});
    return user;
  }

  async getUserByEmail(email:string) {
    const user = await this.userRepo.findOne({where: {email}, include: {all: true}});
    return user;
  }

  async updateUserById(id:number, updateUserDto:UpdateUserDto):Promise<User> {
    const user = await this.userRepo.update(updateUserDto, {where: {id}, returning: true});
    return user[1][0].dataValues;
  }

  async deleteUserById(id:number) {
    const user = await this.userRepo.destroy({where: {id}})
    if (!user) {
      throw new HttpException('User not found!', HttpStatus.NOT_FOUND);
    }
    return {message: "User has deleted!"};
  }

  async registration(createUserDto: CreateUserDto, res: Response) {
    const user = await this.userRepo.findOne({
      where: { email: createUserDto.email },
    });
    if (user) {
      throw new BadRequestException("Email already exists");
    }

    const hashed_password = await bcrypt.hash(createUserDto.password, 7);
    const newUser = await this.userRepo.create({
      ...createUserDto,
      hashed_password: hashed_password,
    });


    const role = await this.roleService.getRoleByValue('USER');
    console.log(role);
    // const role = await this.roleService.getRoleByValue('ADMIN');

    if (!role) {
      throw new BadRequestException('Role not found!');
    }
    await newUser.$set('roles', [role.id]);
    await newUser.save();
    newUser.roles = [role];

    const tokens = await this.getTokens(newUser);

    const updateUser = await this.userRepo.update(
      {
        refresh_token: tokens.refresh_Token,
      },
      { where: { id: newUser.id }, returning: true }
    );

    res.cookie("refresh_token", tokens.refresh_Token, {
      maxAge: 15 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });

    const response = {
      message: "User registred",
      user: updateUser[1][0],
    };
    return response;
  }

  async login(loginUserDto: LoginUserDto, res: Response) {
    const { email, password } = loginUserDto
    const user = await this.userRepo.findOne({
      where: { email },
      include: ['roles'],
    });

    if (!user) {
      throw new UnauthorizedException("User is not registered");
    }
    const isMatchPass = await bcrypt.compare(password, user.hashed_password);
    if (!isMatchPass) {
      throw new UnauthorizedException('User is not registered(pss)')
    }

    const tokens = await this.getTokens(user);
    const updateUser = await this.userRepo.update(
      { refresh_token: tokens.refresh_Token },
      { where: { id: user.id }, returning: true }
    );

    res.cookie("refresh_token", tokens.refresh_Token, {
      maxAge: 15 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    const response = {
      message: "User logged in",
      user: updateUser[1][0],
    };
    return response;
  }


  async logout(refreshToken: string, res: Response) {
    const userData = await this.jwtService.verify(refreshToken, {
      secret: process.env.REFRESH_TOKEN_KEY
    });
    if (!userData) {
      throw new ForbiddenException('User not found');
    }
    const updatedUser = await this.userRepo.update(
      {refresh_token: null},
      {where: {id: userData.id}, returning: true}
    );

    res.clearCookie('refresh_token');
    const response = {
      message: 'User logged out succesfully',
      user: updatedUser[1][0]
    };

    return response
  }

  async refreshToken(user_id: number, refreshToken: string, res: Response) {
    const decodedToken = this.jwtService.decode(refreshToken);
    if (user_id != decodedToken['id']) {
      throw new BadRequestException('User not found');
    }
    const user = await this.userRepo.findOne({where: {id: user_id}});
    if (!user || !user.refresh_token) {
      throw new BadRequestException('User not found');
    }

    if (refreshToken != user.refresh_token) {
      throw new ForbiddenException('Forbidden');
    }

    const tokens = await this.getTokens(user);
    const updateUser = await this.userRepo.update(
      { refresh_token: tokens.refresh_Token },
      { where: { id: user.id }, returning: true }
    );

    res.cookie("refresh_token", tokens.refresh_Token, {
      maxAge: 15 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    const response = {
      message: "User logged in",
      user: updateUser[1][0],
    };

    return response;
  }

  async getTokens(user: User) {
    if (!user || !user.roles || !Array.isArray(user.roles)) {
      throw new BadRequestException('Invalid user data');
    }

    const jwtpayload = {
      id: user.id,
      roles: user.roles.map(role => role.value)
    };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(jwtpayload, {
        secret: process.env.ACCESS_TOKEN_KEY,
        expiresIn: process.env.ACCESS_TOKEN_TIME,
      }),
      this.jwtService.signAsync(jwtpayload, {
        secret: process.env.REFRESH_TOKEN_KEY,
        expiresIn: process.env.REFRESH_TOKEN_TIME,
      }),
    ]);
    return {
      access_Token: accessToken,
      refresh_Token: refreshToken,
    };
  }

  async addRole(addRoleUserDto:AddRoleUserDto) {
    const user = await this.userRepo.findByPk(addRoleUserDto.userId);
    const role = await this.roleService.getRoleByValue(addRoleUserDto.value);

    if (role && user) {
      await user.$add('roles', role.id);
      const updatedUser = await this.userRepo.findByPk(addRoleUserDto.userId, {
        include: {all: true}
      });
      return updatedUser;
    }
    throw new HttpException(
      'User or role not found!',
      HttpStatus.NOT_FOUND
    );
  }

  async removeRole(addRoleUserDto:AddRoleUserDto) {
    const user = await this.userRepo.findByPk(addRoleUserDto.userId);
    const role = await this.roleService.getRoleByValue(addRoleUserDto.value);

    if (role && user) {
      await user.$remove('roles', role.id);
      const updatedUser = await this.userRepo.findByPk(addRoleUserDto.userId, {
        include: {all: true}
      });
      return updatedUser;
    }
    throw new HttpException(
      'User or role not found!',
      HttpStatus.NOT_FOUND
    );
  }
}