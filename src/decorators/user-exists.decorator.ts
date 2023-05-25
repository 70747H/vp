import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import User from '../users/entities/user.entity';
import { Repository } from 'typeorm';

@ValidatorConstraint({ name: 'UserExists', async: true })
@Injectable()
export class UserExistsRule implements ValidatorConstraintInterface {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async validate(
    value: string,
    validationArguments?: ValidationArguments,
  ): Promise<boolean> {
    try {
      let filter;
      if (typeof value === 'number') filter = { id: value };
      else if (typeof value === 'string') filter = { email: value };
      else return false;
      await this.userRepository.findOneOrFail({ where: filter });
    } catch (error) {
      return false;
    }
    return true;
  }
  defaultMessage?(): string {
    return `User doesn't exist.`;
  }
}
