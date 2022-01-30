import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schema as MongooseSchema } from 'mongoose';

@ObjectType()
@Schema()
export class Size {
  @Field(() => String)
  @Prop()
  _id: string;

  @Field(() => String)
  @Prop()
  name: string;
}

export const SizeSchema = SchemaFactory.createForClass(Size);
export type SizeDocument = Size & Document;
