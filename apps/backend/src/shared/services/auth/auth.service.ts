import { Injectable, UnauthorizedException } from '@nestjs/common';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import {
  ACCESS_TOKEN_TIME_EXPIRED,
  REFRESH_TOKEN_TIME_EXPIRED,
} from 'src/shared/constants/auth-time-expires.constants';
import { LoginDto } from './dto/auth.dto';
import { BackendTokens, LoginResult } from './models/login-result.interface';
import { UserEntity } from 'src/database/entities/users.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async login(
    dto: LoginDto,
  ): Promise<LoginResult<Omit<UserEntity, 'password'>>> {
    const user = await this.validateUser(dto);

    const payload = {
      username: user.email,
      sub: {
        name: user.username,
      },
    };

    return {
      user,
      backendTokens: {
        accessToken: await this.jwtService.signAsync(payload, {
          expiresIn: ACCESS_TOKEN_TIME_EXPIRED,
          secret: process.env.JWT_SECRET_KEY,
        }),
        refreshToken: await this.jwtService.signAsync(payload, {
          expiresIn: REFRESH_TOKEN_TIME_EXPIRED,
          secret: process.env.JWT_REFRESH_TOKEN_KEY,
        }),
      },
    };
  }

  private async validateUser(
    dto: LoginDto,
  ): Promise<Omit<UserEntity, 'password'>> {
    const user = await this.userService.findByEmail(dto.username);

    if (user && (await compare(dto.password, user.password))) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return result;
    }

    throw new UnauthorizedException();
  }

  async refreshToken(user: any): Promise<BackendTokens> {
    const payload = {
      username: user.username,
      sub: user.sub,
    };

    return {
      accessToken: await this.jwtService.signAsync(payload, {
        expiresIn: ACCESS_TOKEN_TIME_EXPIRED,
        secret: process.env.JWT_SECRET_KEY,
      }),
      refreshToken: await this.jwtService.signAsync(payload, {
        expiresIn: REFRESH_TOKEN_TIME_EXPIRED,
        secret: process.env.JWT_REFRESH_TOKEN_KEY,
      }),
    };
  }
}
