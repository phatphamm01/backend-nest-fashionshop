import { ObjectType, Field } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schema as MongooseSchema } from 'mongoose';

@ObjectType()
@Schema()
export class Brand {
  @Field(() => String)
  @Prop()
  _id: string;

  @Field(() => String)
  @Prop()
  name: string;
}

export const BrandSchema = SchemaFactory.createForClass(Brand);
export type BrandDocument = Brand & Document;
