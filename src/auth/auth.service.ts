import {
  BadRequestException,
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UsersService } from '../users/users.service';
import { SignInDto, SignUpDto, TokensDto } from './dto/auth.dto';
import { User } from '@base/users/models/user.model';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
    private userService: UsersService,
  ) {}
  hashPassword(password: string) {
    return bcrypt.hash(password, 10);
  }

  async generateTokens(userId: number, email: string): Promise<TokensDto> {
    const jwtPayload = {
      sub: userId,
      email: email,
    };

    const [at, rt] = await Promise.all([
      this.jwtService.signAsync(jwtPayload, {
        secret: this.configService.get('TOKEN.ACCESS_TOKEN_SECRET'),
        expiresIn: this.configService.get('TOKEN.ACCESS_TOKEN_EXPIRY'),
      }),
      this.jwtService.signAsync(jwtPayload, {
        secret: this.configService.get('TOKEN.REFRESH_TOKEN_SECRET'),
        expiresIn: this.configService.get('TOKEN.REFRESH_TOKEN_EXPIRY'),
      }),
    ]);

    return {
      access_token: at,
      refresh_token: rt,
    };
  }

  async updateRtHash(userId: number, rt: string): Promise<void> {
    const hash = await this.hashPassword(rt);
    const updatedUser = await User.update(
      {
        hashedRT: hash,
      },
      { where: { id: userId } },
    );

    if (!updatedUser) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }
  }

  async localSignUp(signupDto: SignUpDto): Promise<TokensDto> {
    try {
      const userExist = await User.findOne({
        where: {
          email: signupDto.email,
        },
      });
      if (userExist) {
        throw new BadRequestException('Email is already used');
      }
      const hashedPassword = await this.hashPassword(signupDto.password);
      signupDto.password = hashedPassword;
      const createdUser = await this.userService.create(signupDto);

      const tokens = await this.generateTokens(
        createdUser.data.user.id,
        createdUser.data.user.email,
      );
      await this.updateRtHash(createdUser.data.user.id, tokens.refresh_token);
      return tokens;
    } catch (error) {
      throw error;
    }
  }

  async localSignIn(signinDto: SignInDto) {
    let tokens = { access_token: '', refresh_token: '' };
    try {
      const userByEmail = await User.findOne({
        where: {
          email: signinDto.email,
        },
      });

      if (userByEmail) {
        const matchPasswords = await bcrypt.compare(
          signinDto.password,
          userByEmail.password,
        );
        if (!matchPasswords) throw new ForbiddenException('Access Denied');

        tokens = await this.generateTokens(userByEmail.id, signinDto.email);
        await this.updateRtHash(userByEmail.id, tokens.refresh_token);
      } else {
        throw new ForbiddenException('Access Denied');
      }
      return { ...tokens, ...userByEmail };
    } catch (err) {
      throw new HttpException('Invalid credentials', HttpStatus.BAD_REQUEST);
    }
  }

  async localLogOut(userId: string) {
    await User.update(
      {
        hashedRt: null,
      },
      { where: { id: userId } },
    );
  }

  async refreshTokens(
    userId: string,
    refresh_token: string,
  ): Promise<TokensDto> {
    const user = await User.findByPk(userId);
    if (!user || !user.hashedRT) throw new ForbiddenException('Access Denied');
    const matchTokens = await bcrypt.compare(refresh_token, user.hashedRT!);
    if (!matchTokens) throw new ForbiddenException('Access Denied');
    const tokens = await this.generateTokens(user.id, user.email);
    await this.updateRtHash(user.id, tokens.refresh_token);
    return tokens;
  }
}
