import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { Document, ObjectId, Schema as MongooseSchema } from 'mongoose';

@ObjectType()
@Schema()
export class Category {
  @Field(() => String)
  _id: MongooseSchema.Types.ObjectId;

  @Field(() => String)
  @Prop()
  title: string;

  @Field(() => Int)
  @Prop()
  level: number;

  @Field(() => Category, { nullable: true, defaultValue: null })
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: Category.name })
  root?: string;

  @Field(() => [Category], { nullable: 'items' })
  @Prop({ type: [MongooseSchema.Types.ObjectId], ref: Category.name })
  children: string[];
}

export const CategorySchema = SchemaFactory.createForClass(Category);
export type CategoryDocument = Category & Document;
