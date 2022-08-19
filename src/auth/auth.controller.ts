import { Controller, Get, Post, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { User } from 'src/database/schemas/UserSchema';
import { AuthUser } from 'src/utils/decorators';
import { AuthenticatedGuard, DiscordAuthGuard } from './utils/Guards';

@Controller('auth')
export class AuthController {
  @Get('login')
  @UseGuards(DiscordAuthGuard)
  login() {
    console.log('hello123');
  }

  @Get('redirect')
  @UseGuards(DiscordAuthGuard)
  redirect(@Res() res: Response) {
    res.redirect('http://rn.britsov.uk/dashboard');
  }

  @Get('status')
  @UseGuards(AuthenticatedGuard)
  status(@AuthUser() user: User) {
    console.log(user);
    return user;
  }

  @Post('logout')
  logout() {}
}
