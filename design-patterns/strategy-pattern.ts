enum AuthenticateStrategyName {
  local = 'local',
  google = 'google',
}

interface AuthenticateStrategy {
  authenticate(args: unknown[]): boolean;
}

class Authenticator {
  private readonly strategies = new Map<
    AuthenticateStrategyName,
    AuthenticateStrategy
  >();

  registerStrategy(
    name: AuthenticateStrategyName,
    strategy: AuthenticateStrategy
  ): void {
    this.strategies.set(name, strategy);
  }

  authenticate(name: AuthenticateStrategyName, args: unknown[]): boolean {
    if (!this.strategies.has(name)) {
      throw new Error('There is not strategy set for this method');
    }
    return this.strategies.get(name).authenticate(args);
  }
}

/*
  Strategies
  */

class AuthenticateStrategyLocal implements AuthenticateStrategy {
  authenticate(args: unknown[]): boolean {
    const [login, password] = args;
    return login === 'admin' && password === '1234';
  }
}

class AuthenticateStrategyGoogle implements AuthenticateStrategy {
  authenticate(args: unknown[]): boolean {
    const [token] = args;
    return token === 'google1234';
  }
}

/*
  Usage
  */

const authenticator = new Authenticator();
const authenticatorLocal = new AuthenticateStrategyLocal();
const authenticatorGoogle = new AuthenticateStrategyGoogle();

authenticator.registerStrategy(
  AuthenticateStrategyName.local,
  authenticatorLocal
);
authenticator.registerStrategy(
  AuthenticateStrategyName.google,
  authenticatorGoogle
);

console.log(
  'local, wrong password: ',
  authenticator.authenticate(AuthenticateStrategyName.local, ['user', '4321'])
);

console.log(
  'local, good password: ',
  authenticator.authenticate(AuthenticateStrategyName.local, ['admin', '1234'])
);

console.log(
  'google, wrong password: ',
  authenticator.authenticate(AuthenticateStrategyName.google, ['tokenFacebook'])
);

console.log(
  'google, good password: ',
  authenticator.authenticate(AuthenticateStrategyName.google, ['google1234'])
);
