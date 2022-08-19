import { User } from 'src/database/schemas/UserSchema';

export type Done = (err: Error, user: User) => void;
