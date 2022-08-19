import { SchemaFactory } from '@nestjs/mongoose';
import { Schema } from 'mongoose';

export type SessionDocument = Session & Document;
export class Session {
  expiredAt = Date.now();
  id: { type: String; required: true };
  json: { type: String; required: true };
}

export const SessionSchema = SchemaFactory.createForClass(Session);
