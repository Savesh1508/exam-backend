import {
  Controller, Body, Param,
  Post, Get, Put, Delete,
  HttpCode, HttpException,
  UseGuards
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './model/category.model';
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { Roles } from '../decorators/roles-auth.decorator';
import { RolesGuard } from '../guards/roles.guard';

@ApiTags('Categorys')
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}
  @ApiOperation({summary:"Create category"})
  @ApiResponse({status: 200, description: 'New category', type: [Category]})
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Post()
  async createCategory(@Body() createCategoryDto: CreateCategoryDto):Promise<Category>{
    const category = await this.categoryService.createCategory(createCategoryDto);
    return category;
  }

  @ApiOperation({summary:"Get all categorys"})
  @ApiResponse({status: 200, description: 'List of categorys', type: [Category]})
  @Get()
  async getAllCategorys():Promise<Category[]>{
    const categorys = await this.categoryService.getAllCategorys();
    return categorys;
  }

  @ApiOperation({summary:"Get category by Id"})
  @ApiResponse({status: 200, description: 'Category by Id', type: [Category]})
  @Get(':id')
  async getCategoryById(@Param('id') id: string):Promise<Category>{
    const category = await this.categoryService.getCategoryById(+id);
    return category;
  }

  @ApiOperation({summary:"Get category by name"})
  @ApiResponse({status: 200, description: 'Category by name', type: [Category]})
  @Get(':name')
  async getCategoryByName(@Param('name') name: string): Promise<Category> {
    const category = await this.categoryService.getCategoryByName(name);
    return category;
  }

  @ApiOperation({summary:"Update category by Id"})
  @ApiResponse({status: 200, description: 'Updated category', type: [Category]})
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Put(':id')
  async updateCategoryById(@Param('id') id:string, @Body() updateComanyDto: UpdateCategoryDto):Promise<Category>{
    const category = await this.categoryService.updateCategoryById(+id, updateComanyDto);
    return category;
  }

  @ApiOperation({summary:"Delete category by Id"})
  @ApiResponse({status: 200, description: 'Deleted category', type: [Category]})
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Delete(':id')
  async deleteServiceById(@Param('id') id: string) {
    const category = await this.categoryService.deleteCategoryById(+id);
    return category;
  }
}
