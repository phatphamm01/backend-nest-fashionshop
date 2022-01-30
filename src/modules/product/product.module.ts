import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductResolver, VariantResolver } from './product.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from './entities/product.entity';
import { OptionsService } from 'modules/options/options.service';
import { OptionsModule } from 'modules/options/options.module';

@Module({
  imports: [
    OptionsModule,
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
  ],
  providers: [ProductResolver, VariantResolver, ProductService],
})
export class ProductModule {}
