import { BadRequestException, Injectable } from '@nestjs/common';
import { User } from './models/user.model';
import { SignUpDto } from '@base/auth/dto/auth.dto';

@Injectable()
export class UsersService {
  async create(
    createUserDto: SignUpDto,
  ): Promise<{ data: { user: User } }> {
    try {
      const user = await User.create({data: createUserDto});
      return {
        data: { user },
      };
    } catch (error) {
      throw new BadRequestException('Cant Create a User');
    }
  }
}
