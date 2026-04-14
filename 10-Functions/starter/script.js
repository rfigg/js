'use strict';

/*
////////////////////////////////////////////
// Default parameters

const bookings = [];

const createBooking = function (
  flightNum,
  numPassengers = 1,
  price = 199 * numPassengers,
) {
  //   ES5
  //   numPassengers = numPassengers || 1;
  //   price = price || 199;

  const booking = {
    flightNum,
    numPassengers,
    price,
  };
  console.log(booking);
  bookings.push(booking);
};

createBooking('LH123');
createBooking('LH123', 2, 800);
createBooking('LH123', 2);
createBooking('LH123', 5);

createBooking('LH123', undefined, 1000);
*/
/*

const flight = 'LH234';
const jonas = {
  name: 'Jonas Schmedtmann',
  passport: 1237846129836418,
};

const checkIn = function (flightNum, passenger) {
  flightNum = 'LH999';
  passenger.name = 'Mr. ' + passenger.name;

  if (passenger.passport === 1237846129836418) {
    alert('Checked in');
  } else {
    alert('Wrong passport!');
  }
};

// checkIn(flight, jonas);
// console.log(flight, jonas);

// Same as doing....
// const flightNum = flight;
// const passenger = jonas;

const newPassport = function (person) {
  person.passport = Math.trunc(Math.random() * 100000000000);
};

newPassport(jonas);
checkIn(flight, jonas);

*/ /*

// Accepting callback functions
const oneWord = function (str) {
  return str.replace(/ /g, '').toLowerCase();
};

const upperFirstWord = function (str) {
  const [first, ...others] = str.split(' ');
  return [first.toUpperCase(), ...others].join(' ');
};

// Higher order function
const transformer = function (str, fn) {
  console.log(`Original string: ${str}`);
  console.log(`Transformed string: ${fn(str)}`);

  // function object has proprties as well as methods
  console.log(`Transformed by: ${fn.name}`);
};

transformer('JavaScript is the best!', upperFirstWord);
transformer('JavaScript is the best!', oneWord);

// JS Uses callbacks ALL THE TIME
const high5 = function () {
  console.log('🖖');
};
document.body.addEventListener('click', high5);
['Jonas', 'Martha', 'Adam'].forEach(high5);

*/ /*

// Functions returning functions
const greet = function (greeting) {
  return function (name) {
    console.log(`${greeting} ${name}`);
  };
};

const greeterHey = greet('Hey');
greeterHey('Ryan');
greeterHey('Noah');

greet('Hello')('Fool');

// Challege: rewrite above function with arrow functions
const greetArrow = greeting => name => console.log(`${greeting} ${name}`);
greetArrow('Howdy')('Pardner');
*/
/*
const lufthansa = {
  airline: 'Lufthansa',
  iataCode: 'LH',
  bookings: [],
  //book: function() {}
  book(flightNum, name) {
    console.log(
      `${name} booked a seat on ${this.airline} flight ${this.iataCode}${flightNum}`,
    );
    this.bookings.push({ flight: `${this.iataCode}${flightNum}`, name });
  },
};

lufthansa.book('239', 'Ryan Figg');
lufthansa.book('635', 'Amanda Elmore');
console.log(lufthansa.bookings);

const eurowings = {
  airline: 'Eurowings',
  iataCode: 'EW',
  bookings: [],
};

const book = lufthansa.book; // function

// book(23, 'Sarah Williams'); // doesn't work: 'this' is undefined in regular fn in strict mode, copy of method

// Call method
book.call(eurowings, 23, 'Sarah Williams');
console.log(eurowings);

book.call(lufthansa, 239, 'Mary Cooper');
console.log(lufthansa);

const swiss = {
  airline: 'Swiss Airlines',
  iataCode: 'LX',
  bookings: [],
};

book.call(swiss, 583, 'Mary Cooper');

// Apply method
const flightData = [583, 'George Cooper'];
book.apply(swiss, flightData);
console.log(swiss);

// same as above but more modern
book.call(swiss, ...flightData);

// Bind method
// book.call(eurowings, 23, 'Sarah Williams');
const bookEW = book.bind(eurowings);
const bookLW = book.bind(lufthansa);
const bookLX = book.bind(swiss);

bookEW(23, 'Steven Williams');

const bookEW23 = book.bind(eurowings, 23);
bookEW23('Ryan Figg');
bookEW23('Martha Cooper');

// with event listeners
lufthansa.planes = 300;
lufthansa.buyPlane = function () {
  console.log(this);

  this.planes++;
  console.log(this.planes);
};
// lufthansa.buyPlane();

document
  .querySelector('.buy')
  .addEventListener('click', lufthansa.buyPlane.bind(lufthansa));

// Partial Application
const addTax = (rate, value) => value + value * rate;
console.log(addTax(0.1, 200));

const addVAT = addTax.bind(null, 0.23); // set tax rate to value added tax
// addVAT = value => value + value * 0.23;

console.log(addVAT(100));
console.log(addVAT(23));

// mini challenge: do above but with returning functions
const myAddVat = function (rate) {
  return function (value) {
    return value + value * rate;
  };
};
const myAddVatArrow = rate => value => value + value * rate;
const addVAT2 = myAddVat(0.23);
console.log(addVAT2(100));
console.log(addVAT2(23));

*/
/*
////////////////////////////////////////////////
// Coding Challenge 1

const poll = {
  question: 'What is your favourite programming language?',
  options: ['0: JavaScript', '1: Python', '2: Rust', '3: C++'],
  // This generates [0, 0, 0, 0]. More in the next section!
  answers: new Array(4).fill(0),
  registerNewAnswer() {
    const answer = Number(
      //       prompt(
      //         `What is your favourite programming language?
      // 0: JavaScript
      // 1: Python
      // 2: Rust
      // 3: C++`,
      //         '(Write option number)',
      //       ),
      prompt(
        `${this.question}\n${this.options.join('\n')}\n(Write option number)`,
      ),
    );
    console.log(`Your answer was ${answer}`);
    // console.log(Boolean(answer));
    // console.log(answer >= 0);
    // He shortcuts here
    if (answer >= 0 && answer < this.answers.length) {
      console.log('Valid answer');
      //increment correct value of answers
      this.answers[answer]++;
      // console.log(this.answers);
    } else {
      console.log('Pick a valid number');
    }
    this.displayResults('array');
    // this.displayResults('string');
    // this.displayResults('poo');
  },
  displayResults(type = 'array') {
    // do it
    // console.log(type);
    if (type === 'array') {
      console.log(this.answers);
    } else if (type === 'string') {
      console.log(`Poll results are ${this.answers.join(', ')}`);
    } else {
      console.log('Something went wrong');
    }
  },
};

// add event listener with new function binding this to poll instead of page element
document
  .querySelector('.poll')
  .addEventListener('click', poll.registerNewAnswer.bind(poll));

// Bonus
const bonus1 = [5, 2, 3];
const bonus2 = [1, 5, 3, 9, 6, 1];
const displayResults = poll.displayResults;
displayResults.call({ answers: bonus1 }, 'array');
displayResults.call({ answers: bonus1 }, 'string');
displayResults.call({ answers: bonus2 });
displayResults.call({ answers: bonus2 }, 'string');
*/
/*
////////////////////////////////////////
// Immediately Invoked Function Expressions

const runOnce = function () {
  console.log('Just running one time here!');
};
runOnce();

(function () {
  console.log('Just running one time here!');
  const isPrivate = 23;
})();
// console.log(isPrivate);

(() => console.log('Just running one time here!'))();

{
  const isPrivate = 23;
  var notPrivate = 46;
}
// console.log(isPrivate);
console.log(notPrivate);
*/

//////////////////////////////////////////
// Closures
/*
const secureBooking = function () {
  let passengerCount = 0;

  return function () {
    passengerCount++;
    console.log(`${passengerCount} passengers`);
  };
};

const booker = secureBooking();

booker();
booker();
booker();

console.dir(booker);
*/
// More closure examples
// ex 1
/*
let f;

const g = function () {
  const a = 23;
  f = function () {
    console.log(a * 2);
  };
};

const h = function () {
  const b = 777;
  f = function () {
    console.log(b * 2);
  };
};

g();
f();
console.dir(f);

// reassigning f function
h();
f();
console.dir(f);

// ex 2
const boardPassengers = function (n, wait) {
  const perGroup = n / 3;

  setTimeout(function () {
    console.log(`We are now boarding all ${n} passengers`);
    console.log(`There are 3 groups, each with ${perGroup} passengers`);
  }, wait * 1000);

  console.log(`Will start boarding in ${wait} seconds`);
};

const perGroup = 1000; // closure has priority over scope chain
boardPassengers(180, 3);
*/

///////////////////////////////////
// Coding challenge #2

(function () {
  const header = document.querySelector('h1');
  header.style.color = 'red';
  document.querySelector('body').addEventListener('click', function () {
    header.style.color = 'blue';
  });
})();
