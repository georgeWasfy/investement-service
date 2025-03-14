import { BadRequestException, Injectable } from '@nestjs/common';
import { User } from './models/user.model';
import { CreateUser } from './types';

@Injectable()
export class UsersService {
  async create(userData: CreateUser): Promise<{ data: { user: User } }> {
    try {
      const user = await User.create(userData);
      return {
        data: { user },
      };
    } catch (error) {
      throw new BadRequestException('Cant Create a User');
    }
  }
}
