import { SchemaFactory } from '@nestjs/mongoose';
import { Schema } from 'mongoose';

export type EventDocument = Event & Document;
export class Event {
  hostRobloxId: { type: String; required: true };
  dateTime: { type: Date; required: true };
  name: { type: String; required: true };
  description: { type: String; required: true };
}

export const EventSchema = SchemaFactory.createForClass(Event);
