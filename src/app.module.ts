import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { OptionsModule } from 'modules/options/options.module';
import { join } from 'path';
import { CategoriesModule } from './modules/category/category.module';
import { ProductModule } from './modules/product/product.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
    }),
    MongooseModule.forRoot('mongodb://localhost:27017/fashionshop'),
    CategoriesModule,
    ProductModule,
    OptionsModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
