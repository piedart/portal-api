import { User } from 'src/database/schemas/UserSchema';
import { UserDetails } from 'src/utils/types/UserDetails';

export interface IUserService {
  createUser(req: any, details: UserDetails): Promise<User>;
  findUser(discordId: string);
}
