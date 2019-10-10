import * as genericPool from 'generic-pool';
import NumberClient from './NumberClient';

type UrlCall = (a: number) => string;

export class FetchPool {
  private opts = {
    max: 8,
    min: 2,
  };

  private count = 0;

  private factory: genericPool.Factory<NumberClient> = {
    create: () => {
      this.count++;
      return Promise.resolve(new NumberClient(this.count));
    },
    destroy: (client: NumberClient) => {
      this.count--;
      return Promise.resolve();
    },
  };

  private pool = genericPool.createPool<NumberClient>(this.factory, this.opts);

  public fetch(url: UrlCall, init?: RequestInit) {
    return this.pool.acquire().then((c: NumberClient) => {
      return fetch(url(c.number), init)
        .catch(err => {
          this.pool.release(c);
          return err;
        })
        .then(response => {
          this.pool.release(c);
          return response;
        });
    });
  }
}
