type HandlerCallback = (data: unknown) => void;

interface Handler {
  use: (h: Handler) => Handler;
  get: (url: string, callback: HandlerCallback) => void;
}

abstract class HandlerAbstract implements Handler {
  next: Handler;

  use(h: Handler): Handler {
    this.next = h;
    return this.next;
  }

  get(url: string, callback: HandlerCallback): void {
    if (!this.next) return;
    this.next.get(url, callback);
  }
}

class AuthMiddleware extends HandlerAbstract {
  isAuthenticated: boolean = false;

  constructor(private username: string, private password: string) {
    super();
    this.checkIfIsAuth();
  }

  get(url: string, callback: HandlerCallback): void {
    if (this.isAuthenticated) {
      super.get(url, callback);
    } else {
      throw new Error('Not Authorized');
    }
  }

  checkIfIsAuth(): void {
    if (this.username === 'admin' && this.password === '1234') {
      this.isAuthenticated = true;
    }
  }
}

class LoggerMiddleware extends HandlerAbstract {
  get(url: string, callback: (data: unknown) => void): void {
    console.log(`Request url is: ${url}`);
    super.get(url, callback);
  }
}

class Route extends HandlerAbstract {
  urlDataMap = new Map<string, unknown>();

  constructor() {
    super();
    this.urlDataMap.set('/api/todos', { title: 'Learn Design Pattern' });
    this.urlDataMap.set('/api/random', () => Math.random());
  }

  get(url: string, callbak: HandlerCallback): void {
    super.get(url, callbak);
    if (!this.urlDataMap.has(url)) return;

    const payload = this.urlDataMap.get(url);
    const result = typeof payload === 'function' ? payload() : payload;
    callbak(result);
  }
}

/*
  Usage
  */

const route = new Route();

route.use(new AuthMiddleware('admin', '1234')).use(new LoggerMiddleware());

route.get('/api/todos', console.log);
route.get('/api/random', console.log);
