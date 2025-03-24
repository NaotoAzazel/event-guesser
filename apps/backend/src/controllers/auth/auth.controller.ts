import { Body, Controller, Post, UseGuards, Request } from '@nestjs/common';
import { RefreshJwtGuard } from 'src/shared/guards/refresh-jwt/refresh-jwt.guard';
import { AuthService } from 'src/shared/services/auth/auth.service';
import { LoginDto } from 'src/shared/services/auth/dto/auth.dto';
import { CreateUserDto } from 'src/shared/services/user/dto/create-user.dto';
import { UserService } from 'src/shared/services/user/user.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Post('register')
  async createRegisterUser(@Body() dto: CreateUserDto) {
    return await this.userService.create(dto);
  }

  @Post('login')
  async login(@Body() dto: LoginDto) {
    return await this.authService.login(dto);
  }

  @UseGuards(RefreshJwtGuard)
  @Post('refresh')
  async refresh(@Request() request: any) {
    return await this.authService.refreshToken(request.user);
  }
}
