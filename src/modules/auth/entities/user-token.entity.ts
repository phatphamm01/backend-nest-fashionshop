import { ObjectType, Field, Int } from '@nestjs/graphql';
import { User } from './user.entity';

@ObjectType()
export class UserToken {
  @Field()
  token: string;

  @Field()
  user: User;
}
