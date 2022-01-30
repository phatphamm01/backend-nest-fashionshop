import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class IData {
  @Field(() => String)
  _id: string;

  @Field(() => String)
  name: string;
}

@ObjectType()
export class IValue {
  @Field(() => String)
  name: string;

  @Field(() => [IData], { defaultValue: [] })
  data: IData[];
}

@ObjectType()
export class AllFilter {
  @Field(() => IValue)
  brand: IValue;

  @Field(() => IValue)
  color: IValue;

  @Field(() => IValue)
  categories: IValue;

  @Field(() => IValue)
  genders: IValue;

  @Field(() => IValue)
  products: IValue;

  @Field(() => IValue)
  shoeSizes: IValue;
}
