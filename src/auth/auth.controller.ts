import { Body, Controller, Post, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { Public } from './decorator/public.decorator';
import { GetCurrentUser } from './decorator/current-user.decorator';
import { SignInDto, SignUpDto, TokensDto } from './dto/auth.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller({ version: '1', path: 'auth' })
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('local/signup')
  async localSignUp(
    @Body() signupDto: SignUpDto,
    @Res({ passthrough: true }) response: Response,
  ): Promise<Partial<TokensDto>> {
    const tokens = await this.authService.localSignUp(signupDto);
    response.cookie('refresh-token', tokens.refresh_token, { httpOnly: true });
    return { access_token: tokens.access_token };
  }

  @Public()
  @Post('local/signin')
  async localSignIn(
    @Body() signinDto: SignInDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const tokens = await this.authService.localSignIn(signinDto);
    const { refresh_token, password, hashedRT, ...user } = tokens;
    response.cookie('refresh_token', tokens.refresh_token, { httpOnly: true });
    return {
      user: {
        access_token: user.access_token,
        id: user.id,
        name: user.username,
        email: user.email,
      },
    };
  }

  @Post('/local/logout')
  localLogOut(@GetCurrentUser('sub') userId: string) {
    return this.authService.localLogOut(userId);
  }

  @Public()
  @Post('local/refresh')
  @UseGuards(AuthGuard('jwt-refresh'))
  async refreshTokens(
    @GetCurrentUser('sub') userId: string,
    @GetCurrentUser('refreshToken') refreshToken: string,
    @Res({ passthrough: true }) response: Response,
  ): Promise<Partial<TokensDto>> {
    const tokens = await this.authService.refreshTokens(userId, refreshToken);
    response.cookie('refresh-token', tokens.refresh_token, { httpOnly: true });
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.setHeader('Access-Control-Allow-Credentials', 'true');
    return { access_token: tokens.access_token };
  }
}
