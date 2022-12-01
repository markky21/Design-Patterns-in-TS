interface Observer<T> {
  notify: (next: T) => void;
}

interface Subject<T> {
  observers: Set<Observer<T>>;
  addObserver: (observer: Observer<T>) => void;
  deleteObserver: (observer: Observer<T>) => void;
  notifyObservers: (next: T) => void;
}

class ConcreteObserver<T> implements Observer<T> {
  constructor(public name: string) {}

  notify(next: T): void {
    console.log(`next message for ${this.name}: "${next}"`);
  }
}

class ConcreteSubject<T> implements Subject<T> {
  observers = new Set<Observer<T>>();

  addObserver(observer: Observer<T>): void {
    this.observers.add(observer);
  }

  deleteObserver(observer: Observer<T>): void {
    this.observers.delete(observer);
  }

  notifyObservers(next: T): void {
    for (let observer of this.observers.values()) {
      observer.notify(next);
    }
  }
}

/*
 * Usage2
 */

const subject: Subject<string> = new ConcreteSubject<string>();
const observerA = new ConcreteObserver<string>("Observer A");
const observerB = new ConcreteObserver<string>("Observer B");

subject.addObserver(observerA);
subject.addObserver(observerB);
subject.notifyObservers("This is a first message");
subject.deleteObserver(observerA);
subject.notifyObservers("This is a second message");
