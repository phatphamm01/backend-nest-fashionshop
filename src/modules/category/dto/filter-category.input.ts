import { InputType, Int, Field, ID } from '@nestjs/graphql';
import { Category } from '../entities/category.entity';
import { Schema as MongooseSchema } from 'mongoose';

@InputType()
export class FilterCategoryInput {
  @Field(() => Int, { nullable: true })
  level: number;

  @Field(() => ID, { nullable: true })
  root: string;
}
