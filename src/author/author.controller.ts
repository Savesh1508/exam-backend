import {
  Controller, Body, Param,
  Post, Get, Put, Delete,
  HttpCode, HttpException,
  UseGuards
} from '@nestjs/common';
import { AuthorService } from './author.service';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { Author } from './model/author.model';
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { Roles } from '../decorators/roles-auth.decorator';
import { RolesGuard } from '../guards/roles.guard';

@ApiTags('Authors')
@Controller('author')
export class AuthorController {
  constructor(private readonly authorService: AuthorService) {}
  @ApiOperation({summary:"Create author"})
  @ApiResponse({status: 200, description: 'New author', type: [Author]})
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Post()
  async createAuthor(@Body() createAuthorDto: CreateAuthorDto):Promise<Author>{
    const author = await this.authorService.createAuthor(createAuthorDto);
    return author;
  }

  @ApiOperation({summary:"Get all authors"})
  @ApiResponse({status: 200, description: 'List of authors', type: [Author]})
  @Get()
  async getAllAuthors():Promise<Author[]>{
    const authors = await this.authorService.getAllAuthors();
    return authors;
  }

  @ApiOperation({summary:"Get author by Id"})
  @ApiResponse({status: 200, description: 'Author by Id', type: [Author]})
  @Get(':id')
  async getAuthorById(@Param('id') id: string):Promise<Author>{
    const author = await this.authorService.getAuthorById(+id);
    return author;
  }

  @ApiOperation({summary:"Update author by Id"})
  @ApiResponse({status: 200, description: 'Updated author', type: [Author]})
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Put(':id')
  async updateAuthorById(@Param('id') id:string, @Body() updateComanyDto: UpdateAuthorDto):Promise<Author>{
    const author = await this.authorService.updateAuthorById(+id, updateComanyDto);
    return author;
  }

  @ApiOperation({summary:"Delete author by Id"})
  @ApiResponse({status: 200, description: 'Deleted author', type: [Author]})
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Delete(':id')
  async deleteServiceById(@Param('id') id: string) {
    const author = await this.authorService.deleteAuthorById(+id);
    return author;
  }
}
