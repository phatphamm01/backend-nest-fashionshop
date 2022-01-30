import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { CategoriesService } from './category.service';
import { Category } from './entities/category.entity';
import {
  CreateCategoryInput,
  FilterCategoryInput,
  UpdateCategoryInput,
} from './dto';

@Resolver(() => Category)
export class CategoriesResolver {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Mutation(() => Category)
  createCategory(
    @Args('createCategoryInput') createCategoryInput: CreateCategoryInput,
  ) {
    return this.categoriesService.create(createCategoryInput);
  }

  @Query(() => [Category], { name: 'getAllCategories' })
  findAll(
    @Args('filterCategoryInput', { nullable: true })
    filterCategoryInput?: FilterCategoryInput,
  ) {
    return this.categoriesService.findAll(filterCategoryInput);
  }

  @Query(() => Category, { name: 'getCategoryById' })
  async findOne(@Args('id', { type: () => String }) id: string) {
    const category = await this.categoriesService.findOne(id);

    return category;
  }

  @Mutation(() => Category)
  updateCategory(
    @Args('updateCategoryInput') updateCategoryInput: UpdateCategoryInput,
  ) {
    return this.categoriesService.update(
      updateCategoryInput.id,
      updateCategoryInput,
    );
  }

  @Mutation(() => Category)
  removeCategory(@Args('id', { type: () => Int }) id: number) {
    return this.categoriesService.remove(id);
  }

  @ResolveField(() => Category, { defaultValue: null })
  async root(@Parent() category: Category) {
    let { root } = category;

    if (!root) {
      return null;
    }
    let categoryRoot = await this.findOne(root);
    console.log(categoryRoot);

    return categoryRoot;
  }
}
