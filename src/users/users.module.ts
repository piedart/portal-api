import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/database/schemas/UserSchema';
import { UsersService } from './users.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])],
  providers: [
    {
      provide: 'USER_SERVICE',
      useClass: UsersService,
    },
  ],
  exports: [
    {
      provide: 'USER_SERVICE',
      useClass: UsersService,
    },
  ],
})
export class UsersModule {}
