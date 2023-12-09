import { IsString, IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateCategoryDto {
  @ApiProperty({example:"someCategory", description:"Category name"})
  @IsNotEmpty()
  @IsString()
  name: string;
}
