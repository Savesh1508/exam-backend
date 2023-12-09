import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsEmail, IsString } from "class-validator";

export class LoginUserDto {
  @ApiProperty({
    example: 'email1@mail.uz',
    description: 'User email'
  })
  @IsEmail()
  email:string;

  @ApiProperty({
    example: 'Uzbek1$t0n',
    description: 'User password'
  })
  @IsNotEmpty()
  @IsString()
  password:string;
}
