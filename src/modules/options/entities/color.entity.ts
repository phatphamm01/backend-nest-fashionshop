import { ObjectType, Field } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schema as MongooseSchema } from 'mongoose';

@ObjectType()
@Schema()
export class Color {
  @Field(() => String)
  @Prop()
  _id: string;

  @Field(() => String)
  @Prop()
  name: string;
}

export const ColorSchema = SchemaFactory.createForClass(Color);
export type ColorDocument = Color & Document;
