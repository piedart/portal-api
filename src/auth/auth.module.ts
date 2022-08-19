import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { DiscordStrategy } from './utils/DiscordStrategy';
import { SessionSerializer } from './utils/SessionSerializer';

@Module({
  imports: [UsersModule],
  providers: [
    DiscordStrategy,
    SessionSerializer,
    {
      provide: 'AUTH_SERVICE',
      useClass: AuthService,
    },
  ],
  controllers: [AuthController],
})
export class AuthModule {}
