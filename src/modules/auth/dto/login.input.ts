import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class LoginInput {
  @Field(() => String)
  email: number;

  @Field(() => String)
  password: number;
}
