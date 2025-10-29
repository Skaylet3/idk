export interface CounterState {
    current: number;
    history: number[];
}
export declare class CounterService {
    private readonly counts;
    getState(): CounterState;
    increment(): CounterState;
}
