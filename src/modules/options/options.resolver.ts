import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { OptionsService } from './options.service';
import { Brand, Color, Filter, Size } from './entities';

@Resolver()
export class OptionsResolver {
  constructor(private readonly optionsService: OptionsService) {}

  @Query(() => [Brand])
  getAllBrand() {
    return this.optionsService.getAllBrand();
  }

  @Query(() => [Color])
  getAllColor() {
    return this.optionsService.getAllColor();
  }

  @Query(() => [Filter])
  getAllFilter() {
    return this.optionsService.getAllFilter();
  }

  @Query(() => [Size])
  getAllSize() {
    return this.optionsService.getAllSize();
  }
}
