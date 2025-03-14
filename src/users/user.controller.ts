import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Public } from '@base/auth/decorator/public.decorator';
import { UsersService } from './users.service';

@ApiTags('User')
@Controller({ version: '1', path: 'user' })
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get(':id/transactions')
  @Public()
  async getUserTransactions(@Param('id') id: number) {
    return await this.userService.getUserTransactions(id);
  }
}
