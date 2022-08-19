import { User } from 'src/database/schemas/UserSchema';
import { UserDetails } from 'src/utils/types/UserDetails';

export interface IAuthService {
  validateUser(req: any, details: UserDetails): Promise<User>;
}
