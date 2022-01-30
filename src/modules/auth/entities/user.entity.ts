import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@ObjectType()
@Schema()
export class User {
  @Field(() => ID)
  _id: number;

  @Field(() => String)
  @Prop({ unique: true })
  email: string;

  @Prop()
  password: string;

  @Field(() => String)
  @Prop()
  firstName: string;

  @Field(() => String)
  @Prop()
  lastName: string;

  @Field(() => String)
  @Prop()
  phone: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
export type UserDocument = User & Document;
