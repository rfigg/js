'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

//////////////////////////////////////////////
// Creating DOM elements (in bankist project)

const displayMovements = function (movements) {
  // console.log(containerMovements.textContent);
  containerMovements.innerHTML = '';

  movements.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
        <div class="movements__value">${mov}€</div>
      </div>
    `;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};
// displayMovements(account1.movements);

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${acc.balance}€`;
};
// calcDisplayBalance(account1.movements);

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes}€`;

  const outoing = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(outoing)}€`;

  // fictional interest calculated on each deposit
  // add rule where interest only paid if at least 1
  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter(int => int >= 1)
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `${interest}€`;
};
// calcDisplaySummary(account1.movements);

const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')

      .map(name => name[0])
      .join('');
  });
};
createUsernames(accounts);

// Event handler
let currentAccount;

const updateUI = function (acc) {
  // display movements
  displayMovements(acc.movements);

  // display balance
  calcDisplayBalance(acc);

  // display summary
  calcDisplaySummary(acc);
};

btnLogin.addEventListener('click', function (e) {
  // prevent form from submitting
  e.preventDefault();
  // console.log('LOGIN');
  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value,
  );
  console.log(currentAccount);

  // optional chain instead of cA && cA.pin === ...
  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // display UI and a welcome message
    labelWelcome.textContent = `Welcome, ${currentAccount.owner.split(' ')[0]}`;
    containerApp.style.opacity = 100;

    // clear input fields
    inputLoginPin.value = inputLoginUsername.value = '';
    inputLoginPin.blur();
    inputLoginUsername.blur(); // lose focus

    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value,
  );
  // console.log(amount, receiverAcc);
  inputTransferTo.value = inputTransferAmount.value = '';

  if (
    amount > 0 &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username &&
    receiverAcc // course incorrenct, previous condition gives false positive. maybe on purpose to show bug?
  ) {
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);
    // console.log('Transfer valid');
    updateUI(currentAccount);
  }
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////
/*
let arr = ['a', 'b', 'c', 'd', 'e'];

// SLICE
console.log(arr.slice(2)); // start
console.log(arr.slice(2, 4)); // start and exclusive end
console.log(arr.slice(-2)); // last elements
console.log(arr.slice(-1));
console.log(arr.slice(1, -2)); // start and all but last 2
console.log(arr.slice());
console.log([...arr]); // same shallow copy as above

// SPLICE
// console.log(arr.splice(2));
arr.splice(-1); // removes last element
console.log(arr);
arr.splice(1, 2); // takes two elements out
console.log(arr);

// REVERSE
arr = ['a', 'b', 'c', 'd', 'e'];
const arr2 = ['j', 'i', 'h', 'g', 'f'];
console.log(arr2.reverse());
console.log(arr2);

// CONCAT
const letters = arr.concat(arr2);
console.log(letters);
console.log([...arr, ...arr2]);

// JOIN
console.log(letters.join(' - '));

*/

////////////////////////////////////////
// The New at method
/*
const arr = [23, 11, 64];
console.log(arr[0]);
console.log(arr.at(0));

console.log(arr[arr.length - 1]); // last value
console.log(arr.slice(-1)[0]); // slice returns array, take 0 (only) element
console.log(arr.at(-1));

console.log('ryanf'.at(0));
console.log('ryanf'.at(-1));
*/

////////////////////////////////////////
// Looping arrays: forEach
/*
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// for of
// for (const movement of movements) {
for (const [i, movement] of movements.entries()) {
  if (movement > 0) console.log(`Movement ${i + 1}: Deposited $${movement}`);
  else console.log(`Movement ${i + 1}: Withdrew $${Math.abs(movement)}`);
}

// forEach
// movements.forEach(function (movement) {
movements.forEach(function (mov, i, arr) {
  if (mov > 0) console.log(`Movement ${i + 1}: Deposited $${mov}`);
  else console.log(`Movement ${i + 1}: Withdrew $${Math.abs(mov)}`);
});

/////////////////////////////////////////
// forEach with maps and sets
const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

currencies.forEach(function (val, key, map) {
  console.log(`${key}: ${val}`);
});

const currenciesUnique = new Set(['USD', 'EUR', 'GBP', 'USD', 'EUR', 'EUR']);
console.log(currenciesUnique);
currenciesUnique.forEach(function (val, _, set) {
  // _ for throwaway value
  console.log(`${val}: ${val}`);
});
*/

//////////////////////////////////////////
// Coding Challenge #1
/*
const checkDogs = function (dogsJulia, dogsKate) {
  // copy julia's, remove first and last two dogs
  // const juliaCopy = dogsJulia.slice(1, -2); // same, i did easy way
  const juliaCopy = dogsJulia.slice();
  juliaCopy.splice(0, 1);
  juliaCopy.splice(-2);

  const dogsCombined = juliaCopy.concat(dogsKate);
  dogsCombined.forEach(function (dog, i) {
    // console.log(dog);
    if (dog < 3) {
      console.log(`Dog number ${i + 1} is still a puppy!`);
    } else {
      console.log(`Dog number ${i + 1} is an adult, and is ${dog} years old.`);
    }
  });
};

// console.log('TEST');
// checkDogs([1, 2, 3, 4, 5], [6, 7, 8, 9, 10]);

console.log('Data set 1');
checkDogs([3, 5, 2, 12, 7], [4, 1, 15, 8, 3]);
console.log('Data set 2');
checkDogs([9, 16, 6, 8, 3], [10, 5, 6, 1, 4]);
*/

///////////////////////////////////////////
// Map, Filter, Reduce
/*
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
const eurToUsd = 1.1; // conversion rate

const movementsUsd = movements.map(function (mov) {
  return mov * eurToUsd;
});
console.log(movements);
console.log(movementsUsd);

const movementsUsdFor = []; // same with for-of
for (const mov of movements) {
  movementsUsdFor.push(mov * eurToUsd);
}
console.log(movementsUsdFor);

// Challenge: rewrite map version with arrow function
const movementsUsdArrow = movements.map(mov => mov * eurToUsd);
console.log(movementsUsdArrow);

const movementsDescriptions = movements.map(
  (mov, i) =>
    // if (mov > 0) return `Movement ${i + 1}: Deposited $${mov}`;
    // else return `Movement ${i + 1}: Withdrew $${Math.abs(mov)}`;
    `Movement ${i + 1}: ${mov > 0 ? 'Deposited' : 'Withdrew'} $${Math.abs(mov)}`,
);
console.log(movementsDescriptions);

///////////////////////////////////////////
// Computing Usernames

const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')

      .map(name => name[0])
      .join('');
  });
};

createUsernames(accounts);
console.log(accounts);
*/
///////////////////////////////////////////
// The filter method
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
/*
const deposits = movements.filter(function (mov) {
  return mov > 0;
});
console.log(deposits);

const depositsFor = [];
for (const mov of movements) if (mov > 0) depositsFor.push(mov);

const widthdrawals = movements.filter(mov => mov < 0);
console.log(widthdrawals);


// the REDUCE method
console.log(movements);
// const balance = movements.reduce(function (acc, cur, i, arr) {
//   console.log(`Iteration #${i}: ${acc}`);
//   return acc + cur;
// }, 0); // accumulator and initial value
const balance = movements.reduce((acc, cur) => acc + cur, 0); // arrow version of above
console.log(balance);

// same using for
let balanceFor = 0;
for (const mov of movements) balanceFor += mov;
console.log(balanceFor);

// reduce to get maximum value
const max = movements.reduce(function (acc, mov) {
  return mov > acc ? mov : acc;
}, movements[0]);


///////////////////////////////////////////
// Challenge #2

const calcAverageHumanAge = function (ages) {
  const humanAges = ages.map(function (age) {
    return age <= 2 ? 2 * age : 16 + age * 4;
  });
  const adults = humanAges.filter(function (age) {
    return age >= 18;
  });
  // const average =
  //   adults.reduce(function (acc, age) {
  //     return acc + age;
  //   }, 0) / adults.length;
  const average = adults.reduce(function (acc, age, _, arr) {
    return acc + age / arr.length;
  }, 0);
  return average;
  // console.log(humanAges);
};
console.log(calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]));
console.log(calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]));
*/
///////////////////////////////////////////
// Chaining methods
/*
const eurToUsd = 1.1; // conversion rate

// PIPELINE
const totalDepositsUsd = movements
  .filter(mov => mov > 0)
  .map((mov, i, arr) => {
    // console.log(arr);
    return mov * eurToUsd;
  })
  .reduce((acc, mov) => mov + acc, 0);
console.log(totalDepositsUsd);

///////////////////////////////////////////
// Challenge #3

const calcAverageHumanAge2 = ages =>
  ages
    .map(age => (age <= 2 ? 2 * age : 16 + age * 4))
    .filter(age => age >= 18)
    .reduce((acc, age, _, arr) => acc + age / arr.length, 0);
console.log(calcAverageHumanAge2([5, 2, 4, 1, 15, 8, 3]));
console.log(calcAverageHumanAge2([16, 6, 10, 5, 6, 1, 4]));
*/

///////////////////////////////////////////
// The find method
/*
const firstWithdrawal = movements.find(mov => mov < 0);
console.log(movements);
console.log(firstWithdrawal);

console.log(accounts);

const account = accounts.find(acc => acc.owner === 'Jessica Davis');
console.log(account);

// same with for of loop
let accountFor;
for (const acc of accounts) {
  if (acc.owner === 'Jessica Davis') {
    accountFor = acc;
    break;
  }
}
console.log(accountFor);
*/
