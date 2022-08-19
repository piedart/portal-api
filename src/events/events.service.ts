import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EventDocument } from 'src/database/schemas/EventSchema';

@Injectable()
export class EventsService {
  constructor(@InjectModel('Event') private eventModel: Model<EventDocument>) {}

  async createEvent() {}

  async deleteEvent() {}

  async getAllEvents() {}

  async getWeekEvents() {}
}
