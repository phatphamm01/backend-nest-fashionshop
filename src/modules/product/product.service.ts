import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { OptionsService } from 'modules/options/options.service';
import { Model } from 'mongoose';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';
import { AllFilter } from './entities/allfilter.entity';
import { Product, ProductDocument } from './entities/product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
    private readonly optionService: OptionsService,
  ) {}

  create(createProductInput: CreateProductInput) {
    return 'This action adds a new product';
  }

  async findAll() {
    return await this.productModel.find();
  }

  async findAllFiltersOfProducts(): Promise<AllFilter> {
    let dataFilters = await this.productModel.aggregate([
      {
        $project: {
          _id: 0,
          brand: 1,
          filters: 1,
          color: 1,
          variants: 1,
        },
      },
    ]);

    // subdivide elements
    let brand = Array.from(new Set(dataFilters.map((value) => value.brand)));
    let variant: string[] = Array.from(
      new Set(
        dataFilters.reduce(
          (result, value) => [
            ...result,
            ...value.variants.map((value) => value.sizeId),
          ],
          [],
        ),
      ),
    );
    let filter: string[] = Array.from(
      new Set(
        dataFilters.reduce(
          (result, value) => [...result, ...value.filters],
          [],
        ),
      ),
    );

    // get detail
    let color = Array.from(new Set(dataFilters.map((value) => value.color)));
    let dataBrand = await this.optionService.getAllBrand(brand);
    let dataFilter: any = await this.optionService.getAllFilter([
      ...filter,
      ...variant,
    ]);
    let dataColor = await this.optionService.getAllColor(color);

    return {
      brand: { name: 'Brand', data: dataBrand },
      color: { name: 'Color', data: dataColor },
      categories: { name: 'Categories', data: dataFilter['Categories'] },
      genders: { name: 'Genders', data: dataFilter['Genders'] },
      products: { name: 'Products', data: dataFilter['Products'] },
      shoeSizes: { name: 'Shoe Sizes', data: dataFilter['Shoe sizes'] },
    };
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductInput: UpdateProductInput) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
