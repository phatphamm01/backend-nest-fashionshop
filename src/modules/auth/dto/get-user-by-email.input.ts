import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class GetUserByEmailInput {
  @Field(() => String)
  email: string;
}
