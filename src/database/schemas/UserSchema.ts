import { SchemaFactory, Schema, Prop } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;
@Schema()
export class User {
  @Prop()
  robloxId: string;

  @Prop()
  discordId: string;

  @Prop()
  robloxUsername: string;

  @Prop()
  rank:
    | 'OR-1'
    | 'OR-2'
    | 'OR-3'
    | 'OR-4'
    | 'OR-5'
    | 'OR-6'
    | 'OR-7'
    | 'OR-8'
    | 'OR-9'
    | 'OF-1'
    | 'OF-2'
    | 'OF-3'
    | 'OF-4'
    | 'OF-5'
    | 'OF-6'
    | 'OF-7'
    | 'OF-8'
    | 'OF-9'
    | 'OF-10';

  @Prop()
  rankName: string;

  @Prop()
  permissionLevel: number;

  @Prop({ default: [] })
  attendance: string[];

  @Prop({ default: [] })
  qualifications: any[];

  @Prop({ default: [] })
  conductWarnings: any[];

  @Prop({ default: [] })
  activityWarnings: any[];

  @Prop({ default: [] })
  deployments: any[];
}

export const UserSchema = SchemaFactory.createForClass(User);
