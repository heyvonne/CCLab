class Car {
  constructor(make, color) {
    this.make = make;      // data (properties)
    this.color = color;
  }
  drive() {                // behavior (methods)
    console.log(`${this.make} drives off!`);
  }
}
let myCar = new Car('Toyota', 'red');
myCar.drive();  // “Toyota drives off!”