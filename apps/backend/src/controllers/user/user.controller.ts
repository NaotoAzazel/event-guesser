import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/shared/guards/jwt/jwt.guard';
import { UserService } from 'src/shared/services/user/user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtGuard)
  @Get(':id')
  async getUserProfileById(@Param('id') id: number) {
    return await this.userService.findById(id);
  }
}
