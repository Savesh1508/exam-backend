import { IsNumber, IsString, IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class AddRoleUserDto {
  @ApiProperty({example:1, description:"User Id"})
  @IsNumber()
  readonly userId:number;

  @ApiProperty({example:'ADMIN', description:"Added role"})
  @IsString()
  @IsNotEmpty()
  readonly value:string;
}