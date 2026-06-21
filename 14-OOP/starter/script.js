'use strict';

/*
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

// Static method on constructor function
Person.hey = function() {
  console.log('Hey there');  
  console.log(this); // entire constructor function
}

Person.hey();
ryan.hey(); // doesn't work

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
// Coding challenge #1

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

*/

////////////////////////////////////////////////////////////
// ES6 Classes
/*
// Class expression
// const personCL = class {};

// Class declaration
class PersonCl {
  constructor(fullName, birthYear) {
    this.fullName = fullName;
    this.birthYear = birthYear;
  }

  // methods added to .prototype property
  // instance methods
  calcAge() {
    console.log(2037 - this.birthYear);
  }

  greet() {
    console.log(`Heelloooo ${this.firstName}!`);
  }

  get age() {
    return 2037 - this.birthYear;
  }

  // Set a property that already exists
  set fullName(name) {
    console.log(name);
    if (name.includes(' '))
      this._fullName = name; // need a different name to avoid error
    else alert(`${name} is not a full name, dummy!`);
  }

  get fullName() {
    return this._fullName;
  }

  // static method
  static hey() {
    console.log('Hey there');
    console.log(this); // entire constructor function
  }
}

const jessica = new PersonCl('Jessica Davis', 1996);
console.log(jessica);
jessica.calcAge();
console.log(jessica.age);

console.log(jessica.__proto__ === PersonCl.prototype);

// PersonCl.prototype.greet = function () {
//   console.log(`Heelloooo ${this.firstName}!`);
// };
jessica.greet();

// 1. classes are NOT hoisted
// 2. classes are 1st class citizens
// 3. classes are executed in strict mode

const walter = new PersonCl('Walter White', 1965);

PersonCl.hey();

// Setters and getters
const account = {
  owner: 'Jonas',
  movements: [200, 530, 120, 300],

  get latest() {
    return this.movements.slice(-1).pop();
  },

  set latest(mov) {
    this.movements.push(mov);
  },
};

console.log(account.latest);

account.latest = 50;
console.log(account.movements);
*/

//////////////////////////////////////////////////////////////
// Object.create()
/*
const PersonProto = {
  calcAge() {
    console.log(2037 - this.birthYear);
  },

  // like constructor, but no new keyword
  // totally separate from new constructor
  init(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  },
};

const steven = Object.create(PersonProto);
console.log(steven);
steven.name = 'Steven';
steven.birthYear = 2002;
steven.calcAge();

console.log(steven.__proto__);
console.log(steven.__proto__ === PersonProto);

const sarah = Object.create(PersonProto);
sarah.init('Sarah', 1979);
sarah.calcAge();
*/
///////////////////////////////////////
// Coding Challenge #2

/* 
1. Re-create challenge 1, but this time using an ES6 class;
2. Add a getter called 'speedUS' which returns the current speed in mi/h (divide by 1.6);
3. Add a setter called 'speedUS' which sets the current speed in mi/h (but converts it to km/h before storing the value, by multiplying the input by 1.6);
4. Create a new car and experiment with the accelerate and brake methods, and with the getter and setter.

DATA CAR 1: 'Ford' going at 120 km/h

GOOD LUCK 😀
*/
/*
class CarCl {
  constructor(make, speed) {
    this.make = make;
    this.speed = speed;
  }

  accelerate() {
    this.speed += 10;
    console.log(this.speed);
  }

  brake() {
    this.speed -= 5;
    console.log(this.speed);
  }

  get speedUS() {
    return this.speed / 1.6;
  }

  set speedUS(speed) {
    this.speed = speed * 1.6;
  }
}

const coolFord = new CarCl('Ford', 120);
console.log(coolFord);
coolFord.accelerate();
coolFord.accelerate();
coolFord.accelerate();
coolFord.brake();
coolFord.brake();
console.log(coolFord.speedUS);
coolFord.speedUS = 99;
console.log(coolFord);
*/

//////////////////////////////////////////////////////////////
// Ineritance with constructor functions
/*
const Person = function (firstName, birthYear) {
  this.firstName = firstName;
  this.birthYear = birthYear;
};

Person.prototype.calcAge = function () {
  console.log(2037 - this.birthYear);
};

const Student = function (firstName, birthYear, course) {
  // this.firstName = firstName;
  // this.birthYear = birthYear;
  // Person(firstName, birthYear); // doesn't work, 'this' undefined in normal functions
  Person.call(this, firstName, birthYear);
  this.course = course;
};

// Linking prototypes
Student.prototype = Object.create(Person.prototype);

Student.prototype.introduce = function () {
  console.log(`Hi, my name is ${this.firstName} and I study ${this.course}`);
};

const mike = new Student('Mike', 2020, 'Computer Science');
console.log(mike);
mike.introduce();
mike.calcAge(); // works through prototype chain

console.log(mike.__proto__);
console.log(mike.__proto__.__proto__);

console.log(mike instanceof Student);
console.log(mike instanceof Person); // truth relies on Object.create()
console.log(mike instanceof Object);

console.dir(Student.prototype.constructor); // shows person becuase of Object.create() call
Student.prototype.constructor = Student;
console.dir(Student.prototype.constructor);
*/

///////////////////////////////////////
// Coding Challenge #3
/* 
1. Use a constructor function to implement an Electric Car (called EV) as a CHILD "class" of Car. Besides a make and current speed, the EV also has the current battery charge in % ('charge' property);
2. Implement a 'chargeBattery' method which takes an argument 'chargeTo' and sets the battery charge to 'chargeTo';
3. Implement an 'accelerate' method that will increase the car's speed by 20, and decrease the charge by 1%. Then log a message like this: 'Tesla going at 140 km/h, with a charge of 22%';
4. Create an electric car object and experiment with calling 'accelerate', 'brake' and 'chargeBattery' (charge to 90%). Notice what happens when you 'accelerate'! HINT: Review the definiton of polymorphism 😉

DATA CAR 1: 'Tesla' going at 120 km/h, with a charge of 23%

GOOD LUCK 😀
*/
/*
const Car = function (make, speed) {
  this.make = make;
  this.speed = speed;
};

Car.prototype.accelerate = function () {
  this.speed += 10;
  // console.log(this.speed);
  console.log(`${this.make} going at ${this.speed} km/h`);
};

Car.prototype.brake = function () {
  this.speed -= 5;
  // console.log(this.speed);
  console.log(`${this.make} going at ${this.speed} km/h`);
};

const EV = function (make, speed, charge) {
  Car.call(this, make, speed);
  this.charge = charge;
};

EV.prototype = Object.create(Car.prototype);
// EV.prototype.constructor = EV; // why again?

EV.prototype.chargeBattery = function (chargeTo) {
  this.charge = chargeTo;
  // this.speed = 500; // checking parent prop
  console.log(`${this.make} battery charged to ${this.charge}%`);
};

EV.prototype.accelerate = function () {
  this.speed += 20;
  this.charge--;
  console.log(
    `${this.make} going at ${this.speed} km/h, with a charge of ${this.charge}%`,
  );
};
const tesla = new EV('Tesla', 120, 23);
tesla.accelerate();
tesla.accelerate();
tesla.accelerate();
tesla.brake();
tesla.brake();
tesla.chargeBattery(90);
tesla.accelerate();
tesla.brake();
tesla.brake();
tesla.brake();
*/
//////////////////////////////////////////////////////////////
// Ineritance with ES6 Classes
/*
class PersonCl {
  constructor(fullName, birthYear) {
    this.fullName = fullName;
    this.birthYear = birthYear;
  }

  calcAge() {
    console.log(2037 - this.birthYear);
  }

  greet() {
    console.log(`Heelloooo ${this.firstName}!`);
  }

  get age() {
    return 2037 - this.birthYear;
  }

  set fullName(name) {
    if (name.includes(' ')) this._fullName = name;
    else alert(`${name} is not a full name, dummy!`);
  }

  get fullName() {
    return this._fullName;
  }

  static hey() {
    console.log('Hey there');
    console.log(this);
  }
}

class StudentCl extends PersonCl {
  constructor(fullName, birthYear, course) {
    // Always need to happen first
    super(fullName, birthYear);
    this.course = course;
  }

  introduce() {
    console.log(`Hi, my name is ${this.fullName} and I study ${this.course}`);
  }

  calcAge() {
    console.log(
      `I'm ${2037 - this.birthYear} years old, but by logic that makes no sense, as a student I feel ${2037 - this.birthYear + 10}`,
    );
  }
}

// const martha = new StudentCl('Martha Jones', 2012);
const martha = new StudentCl('Martha Jones', 2012, 'Computer Science');
martha.introduce();
martha.calcAge();
*/

/////////////////////////////////////////////////////////////
// Ineritance with Object.create()
/*
const PersonProto = {
  calcAge() {
    console.log(2037 - this.birthYear);
  },

  init(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  },
};

const steven = Object.create(PersonProto);

const StudentProto = Object.create(PersonProto);
StudentProto.init = function (firstName, birthYear, course) {
  PersonProto.init.call(this, firstName, birthYear);
  this.course = course;
};
StudentProto.introduce = function () {
  console.log(`Hi, my name is ${this.firstName} and I study ${this.course}`);
};

const jay = Object.create(StudentProto);
jay.init('Jay', 2010, 'Computer Science');
jay.introduce();
jay.calcAge();
*/

/////////////////////////////////////////////////////////////
// Another object example
/*
class Account {
  constructor(owner, currency, pin) {
    this.owner = owner;
    this.currency = currency;
    this.pin = pin;
    this.movements = [];
    this.locale = navigator.language;

    console.log(`Thanks for opening an account, ${owner}`);
  }

  deposit(val) {
    this.movements.push(val);
  }

  withdraw(val) {
    // this.movements.push(-val);
    this.deposit(-val);
  }

  approveLoan(val) {
    return true; // simple for encapsulation example
  }

  requestLoan(val) {
    if (this.approveLoan(val)) {
      this.deposit(val);
      console.log('Loan approved!');
    }
  }
}

const acc1 = new Account('Jonas', 'EUR', 1111);

// acc1.movements.push(250);
// acc1.movements.push(-140);
acc1.deposit(250);
acc1.withdraw(140);
acc1.requestLoan(1000);
acc1.approveLoan(1000); // shouldn't be accessible

console.log(acc1);
console.log(acc1.pin);
*/
/////////////////////////////////////////////////////////////
// Encapsulation

// 1. Public fields
// 2. Private fields
// 3. public methods
// 4. private methods
// STATIC version of these 4
/*
class Account {
  locale = navigator.language;
  bank = 'Bankist';
  #movements = [];
  #pin;

  constructor(owner, currency, pin) {
    this.owner = owner;
    this.currency = currency;
    this.#pin = pin;

    // this.movements = [];
    // this.locale = navigator.language;

    console.log(`Thanks for opening an account, ${owner}`);
  }

  // Public interface (API)
  getMovements() {
    return this.#movements;
    // not chainable, but can be put at end
  }
  deposit(val) {
    this.#movements.push(val);
    return this;
  }

  withdraw(val) {
    // this.movements.push(-val);
    this.deposit(-val);
    return this;
  }

  #approveLoan(val) {
    return true; // simple for encapsulation example
  }

  requestLoan(val) {
    if (this.#approveLoan(val)) {
      this.deposit(val);
      console.log('Loan approved!');
    }
    return this;
  }

  static test() {
    console.log('Testing!');
  }
}

const acc1 = new Account('Jonas', 'EUR', 1111);
// acc1.deposit(300);
// acc1.withdraw(100);
// acc1.movements = []; // just adds new property now

// console.log(acc1);
// console.log(acc1.movements);
// console.log(acc1.#movements);
// acc1.#approveLoan(343);

// Account.test();
// acc1.test();

// Chaining methods
const m = acc1
  .deposit(300)
  .withdraw(100)
  .withdraw(50)
  .requestLoan(25000)
  // .getMovements() // bad method to chain
  .withdraw(4000)
  .getMovements();

console.log(acc1);
console.log(m);
*/

/////////////////////////////////////////////////////////////
// Coding Challenge #4
/* 
1. Re-create challenge #3, but this time using ES6 classes: create an 'EVCl' child class of the 'CarCl' class
2. Make the 'charge' property private;
3. Implement the ability to chain the 'accelerate' and 'chargeBattery' methods of this class, and also update the 'brake' method in the 'CarCl' class. They experiment with chining!

DATA CAR 1: 'Rivian' going at 120 km/h, with a charge of 23%

GOOD LUCK 😀
*/

class CarCl {
  constructor(make, speed) {
    this.make = make;
    this.speed = speed;
  }

  accelerate() {
    this.speed += 10;
    console.log(this.speed);
  }

  brake() {
    this.speed -= 5;
    console.log(this.speed);
  }

  get speedUS() {
    return this.speed / 1.6;
  }

  set speedUS(speed) {
    this.speed = speed * 1.6;
  }
}

class EVCl extends CarCl {
  #charge;

  constructor(make, speed, charge) {
    super(make, speed);
    this.#charge = charge;
  }

  chargeBattery(chargeTo) {
    this.#charge = chargeTo;
    console.log(`${this.make} battery charged to ${this.#charge}%`);
    return this;
  }

  accelerate() {
    this.speed += 20;
    this.#charge--;
    console.log(
      `${this.make} going at ${this.speed} km/h, with a charge of ${this.#charge}%`,
    );
    return this;
  }

  brake() {
    super.brake(); // he didn't do this, i guessed and it worked. he altered brake in super class by adding this
    return this;
  }
}

const rivian = new EVCl('Rivian', 120, 23);
console.log(rivian);
// console.log(rivian.#charge);
rivian
  .accelerate()
  .accelerate()
  .accelerate()
  .brake()
  .brake()
  .chargeBattery(90)
  .accelerate();
