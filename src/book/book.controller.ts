import {
  Controller, Body, Param,
  Post, Get, Put, Delete,
  HttpCode, HttpException,
  UseGuards,
  Query
} from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from './model/book.model';
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { Roles } from '../decorators/roles-auth.decorator';
import { RolesGuard } from '../guards/roles.guard';

@ApiTags('Books')
@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}
  @ApiOperation({summary:"Create book"})
  @ApiResponse({status: 200, description: 'New book', type: [Book]})
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Post()
  async createBook(@Body() createBookDto: CreateBookDto):Promise<Book>{
    const book = await this.bookService.createBook(createBookDto);
    return book;
  }

  @ApiOperation({ summary: "Get all books" })
  @ApiResponse({ status: 200, description: 'List of books', type: [Book] })
  @Get()
  async getAllBooks(@Query('category') category: string): Promise<Book[]> {
    const books = await this.bookService.getAllBooks(category);
    return books;
  }

  @ApiOperation({summary:"Get book by Id"})
  @ApiResponse({status: 200, description: 'Book by Id', type: [Book]})
  @Get(':id')
  async getBookById(@Param('id') id: string):Promise<Book>{
    const book = await this.bookService.getBookById(+id);
    return book;
  }

  @ApiOperation({summary:"Update book by Id"})
  @ApiResponse({status: 200, description: 'Updated book', type: [Book]})
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Put(':id')
  async updateBookById(@Param('id') id:string, @Body() updateBookDto: UpdateBookDto):Promise<Book>{
    const book = await this.bookService.updateBookById(+id, updateBookDto);
    return book;
  }

  @ApiOperation({summary:"Delete book by Id"})
  @ApiResponse({status: 200, description: 'Deleted book', type: [Book]})
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Delete(':id')
  async deleteServiceById(@Param('id') id: string) {
    const book = await this.bookService.deleteBookById(+id);
    return book;
  }
}
