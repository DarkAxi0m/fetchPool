declare type UrlCall = (a: number) => string;
export default class FetchPool {
    private opts;
    private count;
    private factory;
    private pool;
    fetch(url: UrlCall, init?: RequestInit): PromiseLike<Promise<any>>;
}
export {};
