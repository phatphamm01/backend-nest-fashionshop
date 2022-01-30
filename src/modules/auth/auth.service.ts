import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { LoginInput } from './dto/login.input';
import { RegisterInput } from './dto/register.input';
import { UserToken } from './entities/user-token.entity';
import { User, UserDocument } from './entities/user.entity';

@Injectable()
export class AuthService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async getUserByEmail(input: string): Promise<User> {
    return await this.userModel.findOne({ email: input });
  }

  async register(registerInput: RegisterInput): Promise<UserToken> {
    const { email, password } = registerInput;

    const checkUserIsNull = await this.getUserByEmail(email);

    if (checkUserIsNull) {
      throw new BadRequestException('Email đã tồn tại');
    }

    const newUser = await new this.userModel({ ...registerInput }).save();
    return {
      token: '',
      user: newUser,
    };
  }

  login(loginInput: LoginInput) {
    return 'This action adds a new auth';
  }
}
