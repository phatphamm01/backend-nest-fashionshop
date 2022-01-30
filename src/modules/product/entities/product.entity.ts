import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Brand, Color, Filter } from 'modules/options/entities';
import { Variant } from './variant.entity';

@ObjectType()
@Schema()
export class Product {
  @Field(() => String)
  @Prop()
  _id: string;

  @Field(() => String)
  @Prop()
  name: string;

  @Field(() => Brand)
  @Prop({ type: String, ref: Brand.name })
  brand: string;

  @Field(() => Color)
  @Prop()
  color: string;

  @Field(() => [String])
  @Prop()
  imageCovers: string[];

  @Field(() => [String])
  @Prop()
  images: string[];

  @Field(() => Boolean)
  @Prop()
  isFeatured: boolean;

  @Field(() => [Filter])
  @Prop({ type: [String], ref: Filter.name })
  filters: string[];

  @Field(() => [Variant], { defaultValue: [] })
  @Prop({ type: Variant, ref: Variant.name })
  variants: Variant[];
}

export const ProductSchema = SchemaFactory.createForClass(Product);
export type ProductDocument = Product & Document;
