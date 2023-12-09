import { IsString, IsNotEmpty, IsEmail, IsStrongPassword, IsBoolean, IsNumber, IsDate, IsUrl, IsISO8601, Min, Max } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateBookDto {
  @ApiProperty({example:"someBook", description:"Book name"})
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({example:"100", description:"Book pages"})
  @IsNumber()
  pages: number;

  @ApiProperty({ example: "1973", description: "Book date" })
  @IsNumber()
  @Max(new Date().getFullYear(), { message: 'Year must not be later than the current year' })
  year: number;

  @ApiProperty({ example: "999,99", description: "Book price" })
  @IsNumber()
  price: number;

  @ApiProperty({example:"someCountry", description:"Book country of origin"})
  @IsNotEmpty()
  @IsString()
  country: string;

  @ApiProperty({example:"someAuthorObject", description:"Book author"})
  @IsNumber()
  authorId: number;

  @ApiProperty({ example: "4.5", description: "Book rating" })
  @IsNumber()
  @Min(0, { message: 'Rating must not be less than 0' })
  @Max(5, { message: 'Rating must not be greater than 5' })
  rating: number;

  @ApiProperty({example:"someLongText", description:"Book description"})
  @IsString()
  description: string;

  @ApiProperty({example:1, description:"Book category Id"})
  @IsNumber()
  categoryId: number;

  @ApiProperty({example:"someImage", description:"Book image"})
  @IsUrl()
  @IsString()
  image: string;
}
