import { Inject, Injectable } from '@nestjs/common';
import { IUserService } from 'src/users/interfaces/user';
import { UserDetails } from 'src/utils/types/UserDetails';

@Injectable()
export class AuthService {
  constructor(
    @Inject('USER_SERVICE') private readonly userService: IUserService,
  ) {}

  async validateUser(req: any, details: UserDetails) {
    const user = await this.userService.findUser(details.discordId);

    return user || this.userService.createUser(req, details);
  }
}
