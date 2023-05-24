import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
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

  async validate(value: string): Promise<boolean> {
    try {
      await this.userRepository.findOneOrFail({ where: { email: value } });
    } catch (error) {
      return false;
    }
    return true;
  }
  defaultMessage?(): string {
    return `User doesn't exist.`;
  }
}
