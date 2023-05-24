import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import User from './entities/user.entity';
import { UserExistsRule } from '../decorators/user-exists.decorator';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [],
  providers: [UserExistsRule],
})
export class UsersModule {}
