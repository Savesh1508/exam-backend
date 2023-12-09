import { BadRequestException, HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { CreateAuthorDto } from "./dto/create-author.dto";
import { UpdateAuthorDto } from "./dto/update-author.dto";
import { Author } from "./model/author.model";

@Injectable()
export class AuthorService {
  constructor(
    @InjectModel(Author) private authorRepo: typeof Author,
  ){}

  async createAuthor(createAuthorDto:CreateAuthorDto) {
    const author = await this.authorRepo.create(createAuthorDto);
    return author;
  }

  async getAllAuthors():Promise<Author[]> {
    const authors = await this.authorRepo.findAll({include: {all: true}});
    return authors;
  }

  async getAuthorById(id:number) {
    const author = await this.authorRepo.findOne({where: {id}, include: {all: true}});
    return author;
  }

  async updateAuthorById(id:number, updateAuthorDto:UpdateAuthorDto):Promise<Author> {
    const author = await this.authorRepo.update(updateAuthorDto, {where: {id}, returning: true});
    return author[1][0].dataValues;
  }

  async deleteAuthorById(id:number) {
    const author = await this.authorRepo.destroy({where: {id}})
    if (!author) {
      throw new HttpException('Author not found!', HttpStatus.NOT_FOUND);
    }
    return {message: "Author has deleted!"};
  }
}