import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { UserRepository } from './entity/user.repository';
import { UsersController } from './users.controller';

// Providers are a set of classes that Nest can create instances of and inject into other classes.
// Exports are a set of providers that can be accessed in other modules.
// Basiclly, we need to add UsersService to the providers array and exports array to make it available to other modules.

@Module({
  providers: [UsersService, UserRepository], // 👈 Add UsersService to the providers array
  exports: [UsersService], // 👈 Add UsersService to the exports array
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
})
export class UsersModule {}
