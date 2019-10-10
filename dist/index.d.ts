import * as genericPool from "generic-pool";
declare class NumberClient {
    number: number;
    constructor(n: number);
}
interface urlCall {
    (a: number): string;
}
export declare class fetchPool {
    opts: {
        max: number;
        min: number;
    };
    count: number;
    factory: genericPool.Factory<NumberClient>;
    pool: genericPool.Pool<NumberClient>;
    fetch(url: urlCall, init?: RequestInit): PromiseLike<Promise<any>>;
}
export {};
