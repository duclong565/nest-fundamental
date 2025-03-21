import { Injectable } from '@nestjs/common';
import { UserRepository } from './entity/user.repository';
import { User } from './entity/user.entity';
import { SignUpDto } from 'src/auth/dto/sign-up.dto';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UsersService {
  constructor(private userRepo: UserRepository) {}

  async findOne(id: string): Promise<User> {
    return await this.userRepo.findOne(id);
  }

  async findByEmail(email: string): Promise<User> {
    return await this.userRepo.findByEmail(email);
  }

  async createUser(signUpDto: SignUpDto): Promise<User> {
    const { email, username, password } = signUpDto;
    const checkUser = await this.userRepo.findByEmail(email);

    if (checkUser) {
      throw new Error('User already exists');
    }

    const user = new User();
    user.email = email;
    user.username = username;
    user.password = password;

    return await this.userRepo.createUser(user);
  }

  async findAll(): Promise<User[]> {
    return await this.userRepo.findAll();
  }

  async deleteUser(id: string): Promise<void> {
    await this.userRepo.deleteUser(id);
  } 

  async updateFolderOrderIds(userId: string, folderOrderIds: string[]): Promise<User> {
    const user = await this.userRepo.findOne(userId);
    user.folderOrderIds = folderOrderIds;

    return await this.userRepo.updateUser(userId, user);  
  }
}
