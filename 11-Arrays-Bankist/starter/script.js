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
  type: 'premium',
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
  type: 'standard',
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
  type: 'premium',
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
  type: 'basic',
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

const displayMovements = function (movements, sort = false) {
  // console.log(containerMovements.textContent);
  containerMovements.innerHTML = '';

  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;

  // movements.forEach(function (mov, i) {
  movs.forEach(function (mov, i) {
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

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const loanAmount = Number(inputLoanAmount.value);
  // console.log(loanAmount);
  // from flowchart, needs any deposit > 10% of loan
  if (
    loanAmount > 0 &&
    currentAccount.movements.some(mov => mov > loanAmount * 0.1)
  ) {
    currentAccount.movements.push(loanAmount);
    updateUI(currentAccount);
  }
  inputLoanAmount.value = '';
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.username &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    console.log('Close');
    const i = accounts.findIndex(function (arr) {
      return arr === currentAccount;
      // he compares arr.username to currentAccount.username
    });
    // console.log(i);
    // Delete account
    accounts.splice(i, 1);
    // Hide UI
    containerApp.style.opacity = 0;
  }
  inputClosePin.value = inputCloseUsername.value = '';
});

let sorted = false;

btnSort.addEventListener('click', function (e) {
  e.preventDefault();

  sorted = !sorted;
  displayMovements(currentAccount.movements, sorted);
  // he calls with !sorted then flips sorted after
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


/////////////////////////////////////////////////
// findLast and findLastIndex

console.log(movements);
const lastWithdrawal = movements.findLast(mov => mov < 0);
// console.log(lastWithdrawal);

// Challenge: generate using findLastIndex
// 'Your latest large movement was X movements ago'
// where large > 2000
const lastLargeTransation = movements.findLastIndex(
  mov => Math.abs(mov) > 1000,
);
// console.log(lastLargeTransation);
console.log(
  `Your latest large movement was ${movements.length - lastLargeTransation} movements ago`,
);


/////////////////////////////////////////////////
// some and every

console.log(movements);

// only equality
console.log(movements.includes(-130));

// same with condition
console.log(movements.some(mov => mov === -130));

const anyDeposits = movements.some(mov => mov > 0);
console.log(anyDeposits);

// every
console.log(movements.every(mov => mov > 0));
console.log(account4.movements.every(mov => mov > 0));

// Seperate callback
const deposit = mov => mov > 0;
console.log(movements.every(deposit));
console.log(movements.some(deposit));
console.log(movements.filter(deposit));
*/

/////////////////////////////////////////////////
// flat and flatMap
/*
const arr = [[1, 2, 3], [4, 5, 6], 7, 8];
console.log(arr.flat());

const arrDeep = [[[1, 2], 3], [4, [5, 6]], 7, 8];
console.log(arrDeep.flat(2));

const accountMovements = accounts.map(arr => arr.movements);
console.log(accountMovements);
const allMovements = accountMovements.flat();
console.log(allMovements);
const overallBalance = allMovements.reduce((acc, mov) => acc + mov, 0);
console.log(overallBalance);

const overallBalance2 = accounts
  .map(arr => arr.movements)
  .flat()
  .reduce((acc, mov) => acc + mov, 0);
console.log(overallBalance2);

const overallBalance3 = accounts
  .flatMap(arr => arr.movements)
  .reduce((acc, mov) => acc + mov, 0);
console.log(overallBalance3);
*/

////////////////////////////////////////////////////////
// Actual Challenge #4
/*
const breeds = [
  {
    breed: 'German Shepherd',
    averageWeight: 32,
    activities: ['fetch', 'swimming'],
  },
  {
    breed: 'Dalmatian',
    averageWeight: 24,
    activities: ['running', 'fetch', 'agility'],
  },
  {
    breed: 'Labrador',
    averageWeight: 28,
    activities: ['swimming', 'fetch'],
  },
  {
    breed: 'Beagle',
    averageWeight: 12,
    activities: ['digging', 'fetch'],
  },
  {
    breed: 'Husky',
    averageWeight: 26,
    activities: ['running', 'agility', 'swimming'],
  },
  {
    breed: 'Bulldog',
    averageWeight: 36,
    activities: ['sleeping'],
  },
  {
    breed: 'Poodle',
    averageWeight: 18,
    activities: ['agility', 'fetch'],
  },
];
*/
/*
// 1
const huskyWeight = breeds.find(
  dogBreed => dogBreed.breed === 'Husky',
).averageWeight;
console.log(huskyWeight);

// 2
const dogBothActivities = breeds.find(
  dogBreed =>
    dogBreed.activities.includes('running') &&
    dogBreed.activities.includes('fetch'),
).breed;
console.log(dogBothActivities);

// 3
// const allActivities = [];
// breeds.forEach(breed => allActivities.push(...breed.activities));
// const allActivities = breeds.map(breed => breed.activities).flat();
const allActivities = breeds.flatMap(breed => breed.activities);
console.log(allActivities);

// 4
const uniqueActivities = [...new Set(allActivities)];
console.log(uniqueActivities);

// 5
// const swimmingAdjacent = breeds
// .filter(breed => breed.activities.includes('swimming'))
// .flatMap(breed => breed.activities.filter(act => act !== 'swimming'));
const swimmingAdjacent = [
  ...new Set(
    breeds
      .filter(breed => breed.activities.includes('swimming'))
      .flatMap(breed => breed.activities)
      .filter(act => act !== 'swimming'),
  ),
]; // this is his way, mine above
console.log(swimmingAdjacent);

// 6
console.log(breeds.every(breed => breed.averageWeight >= 10));
// he misunderstands his own question with logic more than 10

// 7
console.log(breeds.some(breed => breed.activities.length >= 3));

// Bonus
const fetchBreeds = breeds.filter(breed => breed.activities.includes('fetch'));
console.log(fetchBreeds);

const fetchBreedWeights = fetchBreeds.map(breed => breed.averageWeight);
console.log(fetchBreedWeights);

console.log(Math.max(...fetchBreedWeights));

console.log(
  Math.max(
    ...breeds
      .filter(breed => breed.activities.includes('fetch'))
      .map(breed => breed.averageWeight),
  ),
);
*/
////////////////////////////////////////////////////////
// Sorting Arrays
/*
// Strings
const owners = ['Jonas', 'Zach', 'Adam', 'Martha'];
console.log(owners.sort());

// Numbers
console.log(movements);
// console.log(movements.sort());  // treats as strings

// return < 0: A, B (keep order)
// return > 0: B, A (switch order)

// ascending
// movements.sort((a, b) => {
//   if (a > b) return 1;
//   if (a < b) return -1;
// });
movements.sort((a, b) => a - b);
console.log(movements);

// descending
// movements.sort((a, b) => {
//   if (a > b) return -1;
//   if (a < b) return 1;
// });
movements.sort((a, b) => b - a);
console.log(movements);
*/

////////////////////////////////////////////////////////
// Array Grouping
/*
console.log(movements);

const groupedMovements = Object.groupBy(movements, movement =>
  movement > 0 ? 'deposits' : 'withdrawals',
);
console.log(groupedMovements);

const groupedByActivity = Object.groupBy(
  accounts,
  // acct => acct.movements.length,
  acct => {
    const movementCount = acct.movements.length;

    if (movementCount >= 8) return 'very active';
    if (movementCount >= 4) return 'active';
    if (movementCount >= 1) return 'moderate';
    return 'inactive';
  },
);
console.log(groupedByActivity);

// const groupedByType = Object.groupBy(accounts, account => account.type);
// with destructuring
const groupedByType = Object.groupBy(accounts, ({ type }) => type);
console.log(groupedByType);
*/

////////////////////////////////////////////////////////
// More ways to create and fill arrays
/*
const arr = [1, 2, 3, 4, 5, 6, 7];
console.log(new Array(1, 2, 3, 4, 5, 6, 7));

// Empty array + fill method
const x = new Array(7);
console.log(x);
// x[1] = 4; // does work
// console.log(x);
console.log(x.map(() => 5)); // doesn't work

// x.fill(1);
x.fill(1, 3, 5); // boundaries like slice
console.log(x);

// fill existing array
arr.fill(23, 2, 6);
console.log(arr);

// Array.from()
const y = Array.from({ length: 7 }, () => 1);
console.log(y);

const z = Array.from({ length: 7 }, (_, i) => i + 1); // same callback params: current element, index, assuming whole array
console.log(z);

// mini challenge
const diceRolls = Array.from(
  { length: 100 },
  () => Math.trunc(Math.random() * 6) + 1,
);
console.log(diceRolls);

labelBalance.addEventListener('click', function () {
  const movementsUI = Array.from(
    document.querySelectorAll('.movements__value'),
    el => Number(el.textContent.replace('€', '')),
  );
  console.log(movementsUI);

  const movementsUI2 = [...document.querySelectorAll('.movements__value')]; // can do this but still have to map 
  console.log(movementsUI2);
});
*/

////////////////////////////////////////////////////////
// Non-destructive alternatives
/*
console.log(movements);
const reversedMovements = movements.toReversed();
console.log(reversedMovements);
console.log(movements);

// toSorted, toSpliced
// same as sort() and splice() in usage
// movements[1] = 2000;
const newMovements = movements.with(1, 2000);
console.log(newMovements);
*/

////////////////////////////////////////////////////////
// Array methods practice
/*
// 1
const bankDepositSum = accounts
  .flatMap(acc => acc.movements)
  .filter(mov => mov > 0)
  .reduce((sum, dep) => (sum += dep), 0);
console.log(bankDepositSum);

// 2
const numDeposits1000 = accounts
  .flatMap(acc => acc.movements)
  .filter(mov => mov >= 1000).length;
console.log(numDeposits1000);

const numDeposits1000Reduce = accounts
  .flatMap(acc => acc.movements)
  .reduce((count, dep) => (dep >= 1000 ? ++count : count), 0);
console.log(numDeposits1000Reduce);

let a = 10;
console.log(++a); // postfix ++ operator returns previous value
console.log(a);

// 3
// const sums = accounts
const { deposits, withdrawals } = accounts
  .flatMap(acc => acc.movements)
  .reduce(
    (sums, cur) => {
      // cur > 0 ? (sums.deposits += cur) : (sums.withdrawals += cur);
      sums[cur > 0 ? 'deposits' : 'withdrawals'] += cur;
      return sums;
    },
    { deposits: 0, withdrawals: 0 },
  );
// console.log(sums);
console.log(deposits, withdrawals);

// 4
const convertTitleCase = function (title) {
  const capitalize = str => str[0].toUpperCase() + str.slice(1);

  const exceptions = ['a', 'an', 'and', 'the', 'but', 'or', 'on', 'in', 'with'];

  const titleCase = title
    .toLowerCase()
    .split(' ')
    .map(word => (exceptions.includes(word) ? word : capitalize(word)))
    .join(' ');

  return capitalize(titleCase);
};
console.log(convertTitleCase('this is a nice title'));
console.log(convertTitleCase('this is a LONG title but not too long'));
console.log(convertTitleCase('and here is another title with an EXAMPLE'));
*/

////////////////////////////////////////////////////////
// Challenge #4
// Actually challenge #5, did it early except for the last question, course pdf is out of date.

const breeds = [
  {
    breed: 'German Shepherd',
    averageWeight: 32,
    activities: ['fetch', 'swimming'],
  },
  {
    breed: 'Dalmatian',
    averageWeight: 24,
    activities: ['running', 'fetch', 'agility'],
  },
  {
    breed: 'Labrador',
    averageWeight: 28,
    activities: ['swimming', 'fetch'],
  },
  {
    breed: 'Beagle',
    averageWeight: 12,
    activities: ['digging', 'fetch'],
  },
  {
    breed: 'Husky',
    averageWeight: 26,
    activities: ['running', 'agility', 'swimming'],
  },
  {
    breed: 'Bulldog',
    averageWeight: 36,
    activities: ['sleeping'],
  },
  {
    breed: 'Poodle',
    averageWeight: 18,
    activities: ['agility', 'fetch'],
  },
];

// const dogs = [
//   { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
//   { weight: 8, curFood: 200, owners: ['Matilda'] },
//   { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
//   { weight: 32, curFood: 340, owners: ['Michael'] },
// ];

const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John', 'Leo'] },
  { weight: 18, curFood: 244, owners: ['Joe'] },
  { weight: 32, curFood: 340, owners: ['Michael'] },
];

// 1
dogs.forEach(function (dog) {
  dog.recommendedFood = Math.floor(dog.weight ** 0.75 * 28);
});
// he uses arrow func. also arbitrarily uses math.floor to get one equality

// 2
// Easy way
const sarahDog = dogs.find(dog => dog.owners.includes('Sarah'));
// Using more from this unit
// const sarahDog = dogs.find(dog => dog.owners.some(owner => owner === 'Sarah'));
// console.log(sarahDog);
if (sarahDog.curFood > sarahDog.recommendedFood)
  console.log("Sarah's dog is eating too much!");
else if (sarahDog.curFood < sarahDog.recommendedFood)
  console.log(`Sarah's dog is eating too little.`);
// he uses one log with one template literal, doesn't account for equality (or rather includes in 2nd ternary option)

// 3
const ownersFatties = dogs
  .filter(dog => dog.curFood > dog.recommendedFood)
  .map(dog => dog.owners)
  .flat();
// console.log(ownersFatties);
const ownersSkinnies = dogs
  .filter(dog => dog.curFood < dog.recommendedFood)
  .map(dog => dog.owners)
  .flat();
// he uses flatmap

// 4
console.log(`${ownersFatties.join(' and ')}'s dogs eat too much!`);
console.log(`${ownersSkinnies.join(' and ')}'s dogs eat too little!`);

// 5
console.log(dogs.some(dog => dog.curFood === dog.recommendedFood));

// refactor for 6 and 7
const okayFood = dog =>
  dog.curFood > dog.recommendedFood * 0.9 &&
  dog.curFood < dog.recommendedFood * 1.1;

// 6
console.log(dogs.every(dog => okayFood(dog)));

// 7
// const okayDogs = dogs.filter(
//   dog =>
//     dog.curFood > dog.recommendedFood * 0.9 &&
//     dog.curFood < dog.recommendedFood * 1.1,
// );
const okayDogs = dogs.filter(dog => okayFood(dog));
console.log(okayDogs);

// 8
const groupedByFood = Object.groupBy(dogs, dog => {
  if (dog.curFood < dog.recommendedFood) return 'too-little';
  if (dog.curFood > dog.recommendedFood) return 'too-much';
  return 'exact';
});
console.log(groupedByFood);
// he uses if else, but my way is recommended by interwebs

// 9
const groupedByOwners = Object.groupBy(dogs, dog => dog.owners.length);
console.log(groupedByOwners);
// he uses template literal to make nicer categories

// 10
const sortedDogs = dogs.toSorted(
  (dog1, dog2) => dog1.recommendedFood - dog2.recommendedFood,
);
console.log(sortedDogs);
