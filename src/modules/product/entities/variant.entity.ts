import { ObjectType, Field, Int, Float } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Size } from 'modules/options/entities';
import { Schema as MongooseSchema } from 'mongoose';

@ObjectType()
@Schema()
export class Variant {
  @Field(() => String)
  _id: string;

  @Field(() => Float)
  price: number;

  @Field(() => Float)
  discountPrice: number;

  @Field(() => Size)
  sizeId: string;
}
