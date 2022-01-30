import { InputType, Int, Field, ID } from '@nestjs/graphql';
import { Category } from '../entities/category.entity';
import { Schema as MongooseSchema } from 'mongoose';

@InputType()
export class CreateCategoryInput {
  @Field(() => String)
  title: string;

  @Field(() => Int)
  level: number;

  @Field(() => ID, { nullable: true })
  root?: string;

  @Field(() => [ID], { nullable: 'itemsAndList' })
  children: string;
}
