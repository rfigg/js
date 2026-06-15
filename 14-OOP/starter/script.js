'use strict';

const Person = function (firstName, birthYear) {
  // Instance properties
  this.firstName = firstName;
  this.birthYear = birthYear;

  // never do this, copy of fcn for each instance
  //   this.calcAge = function () {
  //     console.log(2037 - this.birthYear);
  //   };
};

const ryan = new Person('Ryan', 1980);
console.log(ryan);

const bob = new Person('Robert', 1981);
const jane = new Person('Jayne', 1982);
console.log(bob, jane);

console.log(jane instanceof Person);
console.log(jane instanceof Array);

// Prototypes
console.log(Person.prototype);

Person.prototype.calcAge = function () {
  console.log(2037 - this.birthYear);
};

jane.calcAge();
bob.calcAge();

console.log(ryan.__proto__);
console.log(ryan.__proto__ === Person.prototype);

console.log(Person.prototype.isPrototypeOf(ryan));
console.log(Person.prototype.isPrototypeOf(jane));
console.log(Person.prototype.isPrototypeOf(Person));
// prototype property could be called .prototypeOfLinkedObjects or something to be less confusing, but isn't

Person.prototype.species = 'Homo Sapiens';
console.log(ryan.species, jane.species);

console.log(ryan.hasOwnProperty('firstName'));
console.log(ryan.hasOwnProperty('species'));

console.log(ryan.__proto__);
console.log(ryan.__proto__.__proto__); // Object.prototype
console.log(ryan.__proto__.__proto__.__proto__); // null, top of prototype chain

console.dir(Person.prototype.constructor);

const arr = [3, 4, 5, 7, 6, 3, 4, 5, 6, 7]; // new Array === []
console.log(arr.__proto__);
console.log(arr.__proto__ === Array.prototype);
console.log(arr.__proto__.__proto__); // back to Object.prototype

Array.prototype.unique = function () {
  return [...new Set(this)];
};
console.log(arr.unique());

const h1 = document.querySelector('h1');
console.dir(x => x + 1);

////////////////////////////////////////////////////////////
// Coding challenge 1

const Car = function (make, speed) {
  this.make = make;
  this.speed = speed;
};

Car.prototype.accelerate = function () {
  this.speed += 10;
  console.log(this.speed);
};

Car.prototype.brake = function () {
  this.speed -= 5;
  console.log(this.speed);
};

const car1 = new Car('BMW', 120);
const car2 = new Car('Mercedes', 95);

car1.accelerate();
car1.brake();

car2.accelerate();
car2.brake();
