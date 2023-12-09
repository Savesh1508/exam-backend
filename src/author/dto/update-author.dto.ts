import { IsString, IsNotEmpty, IsEmail, IsStrongPassword, IsBoolean, IsNumber, IsDate, IsUrl, IsISO8601 } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateAuthorDto {
  @ApiProperty({example:"someAuthor", description:"Author name"})
  @IsNotEmpty()
  @IsString()
  name?: string;

  @ApiProperty({example:"someAuthor", description:"Author surname"})
  @IsNotEmpty()
  @IsString()
  surname?: string;

  @ApiProperty({ example: "1990-01-01", description: "Author date of birth" })
  @IsISO8601()
  birth?: Date;

  @ApiProperty({ example: "1990-01-01", description: "Author date of death" })
  @IsISO8601()
  death?: Date;

  @ApiProperty({example:"someCountry", description:"Author country of origin"})
  @IsString()
  country?: string;

  @ApiProperty({example:"someLongText", description:"Author biography"})
  @IsString()
  biography?: string;

  @ApiProperty({example:"someImage", description:"Author image"})
  @IsUrl()
  @IsString()
  image?: string;
}
