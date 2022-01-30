import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  CreateCategoryInput,
  FilterCategoryInput,
  UpdateCategoryInput,
} from './dto';

import { Category, CategoryDocument } from './entities/category.entity';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel(Category.name) private categoryModel: Model<CategoryDocument>,
  ) {}

  create(createCategoryInput: CreateCategoryInput) {
    const createCategory = new this.categoryModel(createCategoryInput);
    return createCategory.save();
  }

  async findAll(filterCategoryInput: FilterCategoryInput) {
    console.log({ ...filterCategoryInput });
    const allCategories: any = this.categoryModel.find({
      ...filterCategoryInput,
    });

    return allCategories;
  }

  async findOne(id: string) {
    const category = await this.categoryModel.findOne({ id });

    return category;
  }

  update(id: number, updateCategoryInput: UpdateCategoryInput) {
    return `This action updates a #${id} category`;
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}
