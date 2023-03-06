interface Vehicle {
  drive(): void;
}

class Car implements Vehicle {
  public drive(): void {
    console.log("Car drives");
  }
}

class Truck implements Vehicle {
  public drive(): void {
    console.log("Truck drives");
  }
}

class AirConditioningDecorator implements Vehicle {
  constructor(private readonly vehicle: Vehicle) {}

  public drive(): void {
    this.vehicle.drive();
    this.turnOnAirConditioning();
  }

  private turnOnAirConditioning(): void {
    console.log("Air conditioning turned on");
  }
}

/*
  Usage
  */

const car = new Car();
const carWithAirConditioning = new AirConditioningDecorator(car);

carWithAirConditioning.drive();

const truck = new Truck();
const truckWithAirConditioning = new AirConditioningDecorator(truck);
truckWithAirConditioning.drive();
