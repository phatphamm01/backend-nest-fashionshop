import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { RegisterInput } from './dto/register.input';
import { LoginInput } from './dto/login.input';
import { User } from './entities/user.entity';
import { UserToken } from './entities/user-token.entity';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => UserToken)
  register(
    @Args('registerInput') registerInput: RegisterInput,
  ): Promise<UserToken> {
    try {
      return this.authService.register(registerInput);
    } catch (error) {
      console.log(error);
    }
  }

  @Mutation(() => User)
  login(@Args('loginInput') loginInput: LoginInput) {
    return this.authService.login(loginInput);
  }
}
