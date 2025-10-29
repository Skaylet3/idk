import { Controller, Get, Post } from '@nestjs/common';
import { CounterService } from './counter.service';
import type { CounterState } from './counter.service';

@Controller('counter')
export class CounterController {
  constructor(private readonly counterService: CounterService) {}

  @Get()
  getState(): CounterState {
    return this.counterService.getState();
  }

  @Post('increment')
  increment(): CounterState {
    return this.counterService.increment();
  }

  @Get('increment')
  getAndIncrement(): CounterState {
    return this.counterService.increment();
  }
}
