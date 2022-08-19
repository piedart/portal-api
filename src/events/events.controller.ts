import { Controller, Get } from '@nestjs/common';
import { get } from 'http';
import { EventsService } from './events.service';

@Controller('events')
export class EventsController {
  constructor(private eventsService: EventsService) {}
  @Get('/create')
  createEvent() {
    this.createEvent();
  }

  @Get('/delete')
  deleteEvent() {
    this.deleteEvent();
  }

  @Get('/getAllEvents')
  getAllEvents() {
    this.getAllEvents();
  }

  @Get('/getWeekEvents')
  getWeekEvents() {
    this.getWeekEvents();
  }
}
