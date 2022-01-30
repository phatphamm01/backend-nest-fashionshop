import { ObjectType, Field } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schema as MongooseSchema } from 'mongoose';

@ObjectType()
@Schema()
export class Filter {
  @Field(() => String)
  @Prop()
  _id: string;

  @Field(() => String)
  @Prop()
  name: string;

  @Field(() => String)
  @Prop()
  type: string;

  @Field(() => [Filter], { nullable: 'items' })
  @Prop({ type: String, ref: Filter.name, default: null })
  children?: Filter[];
}

export const FilterSchema = SchemaFactory.createForClass(Filter);
export type FilterDocument = Filter & Document;
