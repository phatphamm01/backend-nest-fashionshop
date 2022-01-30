import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  Brand,
  BrandDocument,
  Color,
  ColorDocument,
  Filter,
  FilterDocument,
  Size,
  SizeDocument,
} from './entities';

@Injectable()
export class OptionsService {
  constructor(
    @InjectModel(Brand.name) private brandModel: Model<BrandDocument>,
    @InjectModel(Color.name) private colorModel: Model<ColorDocument>,
    @InjectModel(Filter.name) private filterModel: Model<FilterDocument>,
    @InjectModel(Size.name) private sizeModel: Model<SizeDocument>,
  ) {}

  async getAllBrand(filter?: string[]) {
    return await this.brandModel.find({ $in: filter });
  }

  async getAllColor(filter?: string[]) {
    return await this.colorModel.find({ $in: filter });
  }

  async getAllFilter(filter?: string[]) {
    let resultDB = await this.filterModel.aggregate([
      { $unwind: '$children' },
      { $match: { 'children._id': { $in: filter } } },
      {
        $project: {
          _id: 0,
          name: 0,
        },
      },
    ]);

    let rawData = resultDB.reduce(
      (result, value) => [...result, value.children],
      [],
    );

    let data = {};

    for (let item of rawData) {
      if (!data?.[item.type]) {
        data[item.type] = [{ _id: item._id, name: item.name }];

        continue;
      }
      data[item.type].push({ _id: item._id, name: item.name });
    }

    return data;
  }

  async getAllSize() {
    return await this.sizeModel.find();
  }

  async getBrandById(id: string) {
    return await this.brandModel.findOne({ id: id });
  }

  async getColorById(id: string) {
    return await this.colorModel.findOne({ id: id });
  }

  async getSizeById(id: string) {
    let sizes = await this.sizeModel.aggregate([
      { $unwind: '$children' },
      { $match: { 'children._id': id } },
      {
        $project: {
          name: 0,
          _id: 0,
        },
      },
    ]);

    return sizes[0].children;
  }

  async getFilterById(id: string[]) {
    let filters = await this.filterModel.aggregate([
      { $unwind: '$children' },
      { $match: { 'children._id': { $in: id } } },
      {
        $project: {
          _id: 0,
        },
      },
    ]);

    return filters.reduce((result, value) => [...result, value.children], []);
  }
}
