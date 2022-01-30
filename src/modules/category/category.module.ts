import { Module } from '@nestjs/common';
import { CategoriesService } from './category.service';
import { CategoriesResolver } from './category.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Category, CategorySchema } from './entities/category.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Category.name, schema: CategorySchema },
    ]),
  ],
  providers: [CategoriesResolver, CategoriesService],
})
export class CategoriesModule {}
