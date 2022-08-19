import { Inject } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-discord';
import { IAuthService } from '../interfaces/auth';
export class DiscordStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject('AUTH_SERVICE') private readonly authService: IAuthService,
  ) {
    super({
      clientID: '978310811443404820',
      clientSecret: '7neu8thuRd1-Sq59NUm-O-ydjpf5r529',
      callbackURL: 'http://localhost:4000/api/auth/redirect',
      scope: ['identify'],
      passReqToCallback: true,
    });
  }

  async validate(
    req: any,
    accessToken: string,
    refreshToken: string,
    profile: Profile,
  ) {
    console.log('DiscordStrategy Validate Method');
    console.log(profile);

    return this.authService.validateUser(req, { discordId: profile.id });
  }
}
