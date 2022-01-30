import { Module } from '@nestjs/common';
import { OptionsService } from './options.service';
import { OptionsResolver } from './options.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Brand,
  BrandSchema,
  Color,
  ColorSchema,
  Filter,
  FilterSchema,
  Size,
  SizeSchema,
} from './entities';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Brand.name, schema: BrandSchema }]),
    MongooseModule.forFeature([{ name: Color.name, schema: ColorSchema }]),
    MongooseModule.forFeature([{ name: Filter.name, schema: FilterSchema }]),
    MongooseModule.forFeature([{ name: Size.name, schema: SizeSchema }]),
  ],
  providers: [OptionsResolver, OptionsService],
  exports: [OptionsService],
})
export class OptionsModule {}
