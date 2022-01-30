import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { ProductService } from './product.service';
import { Product } from './entities/product.entity';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';
import { OptionsService } from 'modules/options/options.service';
import { Brand, Color, Filter, Size } from 'modules/options/entities';
import { Variant } from './entities/variant.entity';
import { AllFilter } from './entities/allfilter.entity';

@Resolver(() => Product)
export class ProductResolver {
  constructor(
    private readonly productService: ProductService,
    private readonly optionService: OptionsService,
  ) {}

  @Mutation(() => Product)
  createProduct(
    @Args('createProductInput') createProductInput: CreateProductInput,
  ) {
    return this.productService.create(createProductInput);
  }

  @Query(() => [Product], { name: 'getAllProducts' })
  findAll() {
    return this.productService.findAll();
  }

  @Query(() => AllFilter, { name: 'getAllFiltersOfProducts' })
  getAllFiltersOfProducts() {
    return this.productService.findAllFiltersOfProducts();
  }

  @Query(() => Product, { name: 'product' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.productService.findOne(id);
  }

  @Mutation(() => Product)
  updateProduct(
    @Args('updateProductInput') updateProductInput: UpdateProductInput,
  ) {
    return this.productService.update(
      updateProductInput.id,
      updateProductInput,
    );
  }

  @Mutation(() => Product)
  removeProduct(@Args('id', { type: () => Int }) id: number) {
    return this.productService.remove(id);
  }

  @ResolveField(() => Brand, { defaultValue: null })
  async brand(@Parent() product: Product) {
    let { brand } = product;

    if (!brand) {
      return null;
    }
    let brandData = await this.optionService.getBrandById(brand);

    return brandData;
  }

  @ResolveField(() => Color, { defaultValue: null })
  async color(@Parent() product: Product) {
    let { color } = product;

    if (!color) {
      return null;
    }
    let colorData = await this.optionService.getColorById(color);

    return colorData;
  }

  @ResolveField(() => Filter, { defaultValue: null })
  async filters(@Parent() product: Product) {
    let { filters } = product;

    if (!(filters && filters.length > 0)) {
      return null;
    }

    let filterData = await this.optionService.getFilterById(filters);

    return filterData;
  }
}

@Resolver(() => Variant)
export class VariantResolver {
  constructor(private readonly optionService: OptionsService) {}

  @ResolveField(() => Size, { defaultValue: null })
  async sizeId(@Parent() variant: Variant) {
    let { sizeId } = variant;

    console.log(sizeId);
    if (!sizeId) {
      return null;
    }

    let size = await this.optionService.getSizeById(sizeId);

    return size;
  }
}
