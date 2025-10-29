import { Injectable } from '@nestjs/common';

export interface CounterState {
  current: number;
  history: number[];
}

@Injectable()
export class CounterService {
  private readonly counts: number[] = [];

  getState(): CounterState {
    const current =
      this.counts.length > 0 ? this.counts[this.counts.length - 1] : 0;
    return {
      current,
      history: [...this.counts],
    };
  }

  increment(): CounterState {
    const next =
      (this.counts.length > 0 ? this.counts[this.counts.length - 1] : 0) + 1;
    this.counts.push(next);
    return this.getState();
  }
}
