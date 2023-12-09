import { IsString, IsNotEmpty, IsEmail, IsStrongPassword, IsBoolean, IsNumber } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
  @ApiProperty({example:"someUser", description:"User name"})
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({example:"someUser", description:"User surname"})
  @IsNotEmpty()
  @IsString()
  surname: string;

  @ApiProperty({example:"someemail@gmail.com", description:"User email"})
  @IsEmail()
  email:string;

  @ApiProperty({example:"+998900000000", description:"User phone"})
  @IsString()
  phone:string;

  @ApiProperty({ example: "Pa$sword12", description: "User password" })
  @IsNotEmpty()
  @IsString()
  @IsStrongPassword()
  password: string;
}
