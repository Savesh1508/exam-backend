import { BadRequestException, HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { CreateCategoryDto } from "./dto/create-category.dto";
import { UpdateCategoryDto } from "./dto/update-category.dto";
import { Category } from "./model/category.model";

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category) private categoryRepo: typeof Category,
  ){}

  async createCategory(createCategoryDto:CreateCategoryDto) {
    const category = await this.categoryRepo.create(createCategoryDto);
    return category;
  }

  async getAllCategorys():Promise<Category[]> {
    const categorys = await this.categoryRepo.findAll({include: {all: true}});
    return categorys;
  }

  async getCategoryById(id:number) {
    const category = await this.categoryRepo.findOne({where: {id}, include: {all: true}});
    return category;
  }

  async getCategoryByName(name:string):Promise<Category> {
    const category = await this.categoryRepo.findOne({where: {name}, include: {all: true}});
    return category;
  }

  async updateCategoryById(id:number, updateCategoryDto:UpdateCategoryDto):Promise<Category> {
    const category = await this.categoryRepo.update(updateCategoryDto, {where: {id}, returning: true});
    return category[1][0].dataValues;
  }

  async deleteCategoryById(id:number) {
    const category = await this.categoryRepo.destroy({where: {id}})
    if (!category) {
      throw new HttpException('Category not found!', HttpStatus.NOT_FOUND);
    }
    return {message: "Category has deleted!"};
  }
}