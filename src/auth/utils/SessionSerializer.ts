import { Inject } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { User } from 'src/database/schemas/UserSchema';
import { IUserService } from 'src/users/interfaces/user';
import { Done } from 'src/utils/types/Done';

export class SessionSerializer extends PassportSerializer {
  constructor(
    @Inject('USER_SERVICE') private readonly userService: IUserService,
  ) {
    super();
  }
  serializeUser(user: User, done: Done) {
    done(null, user);
  }

  async deserializeUser(user: User, done: Done) {
    try {
      const userDB = await this.userService.findUser(user.discordId);
      return userDB ? done(null, userDB) : done(null, null);
    } catch (err) {
      done(err, null);
    }
  }
}
