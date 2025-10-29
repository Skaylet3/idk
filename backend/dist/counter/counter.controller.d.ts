import { CounterService } from './counter.service';
import type { CounterState } from './counter.service';
export declare class CounterController {
    private readonly counterService;
    constructor(counterService: CounterService);
    getState(): CounterState;
    increment(): CounterState;
}
