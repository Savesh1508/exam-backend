import { BadRequestException, HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { CreateBookDto } from "./dto/create-book.dto";
import { UpdateBookDto } from "./dto/update-book.dto";
import { Book } from "./model/book.model";
import { Category } from "../category/model/category.model";

@Injectable()
export class BookService {
  constructor(
    @InjectModel(Book) private bookRepo: typeof Book,
  ){}

  async createBook(createBookDto:CreateBookDto) {
    const book = await this.bookRepo.create(createBookDto);
    return book;
  }

  async getAllBooks(category?: string): Promise<Book[]> {
    if (category) {
      const books = await this.bookRepo.findAll({
        include: [{ model: Category, where: { name: category } }],
      });
      return books;
    } else {
      const books = await this.bookRepo.findAll({ include: { all: true } });
      return books;
    }
  }
  async getBookById(id:number) {
    const book = await this.bookRepo.findOne({where: {id}, include: {all: true}});
    return book;
  }

  async updateBookById(id:number, updateBookDto:UpdateBookDto):Promise<Book> {
    const book = await this.bookRepo.update(updateBookDto, {where: {id}, returning: true});
    return book[1][0].dataValues;
  }

  async deleteBookById(id:number) {
    const book = await this.bookRepo.destroy({where: {id}})
    if (!book) {
      throw new HttpException('Book not found!', HttpStatus.NOT_FOUND);
    }
    return {message: "Book has deleted!"};
  }
}