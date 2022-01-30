import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class RegisterInput {
  @Field(() => String)
  email: string;

  password: string;

  @Field(() => String)
  firstName: string;

  @Field(() => String)
  lastName: string;

  @Field(() => String)
  phone: string;
}
