'use strict';

const budget = Object.freeze([
  { value: 250, description: 'Sold old TV 📺', user: 'jonas' },
  { value: -45, description: 'Groceries 🥑', user: 'jonas' },
  { value: 3500, description: 'Monthly salary 👩‍💻', user: 'jonas' },
  { value: 300, description: 'Freelancing 👩‍💻', user: 'jonas' },
  { value: -1100, description: 'New iPhone 📱', user: 'jonas' },
  { value: -20, description: 'Candy 🍭', user: 'matilda' },
  { value: -125, description: 'Toys 🚂', user: 'matilda' },
  { value: -1800, description: 'New Laptop 💻', user: 'jonas' },
]);

// budget[0].value = 10000;
// budget[8] = 'jonas';

const spendingLimits = Object.freeze({
  jonas: 1500,
  matilda: 100,
});
// spendingLimits.jay = 200;
// spendingLimits.jonas = 1600;
console.log(spendingLimits);

const getLimit = user => spendingLimits?.[user] ?? 0;

// now a Pure function
const addExpense = function (
  state,
  limits,
  value,
  description,
  user = 'jonas',
) {
  // if (!user) user = 'jonas';
  const cleanUser = user.toLowerCase();

  // let lim;
  // if (spendingLimits[user]) {
  //   lim = spendingLimits[user];
  // } else {
  //   lim = 0;
  // }

  // same with ternary instead of if-else blocks and const instead of mutation
  // const limit = spendingLimits[user] ? spendingLimits[user] : 0;

  // now with optional chaining and nullish coalescing
  // const limit = spendingLimits?.[user] ?? 0;
  // const limit = getLimit(user);

  // if (value <= getLimit(cleanUser)) {
  //   // budget.push({ value: -value, description: description, user: user }); // enhanced object literal
  //   // budget.push({ value: -value, description, user: cleanUser });
  //   return [...state, { value: -value, description, user: cleanUser }];
  // }
  return value <= getLimit(cleanUser)
    ? [...state, { value: -value, description, user: cleanUser }]
    : state;
};
const newBudget1 = addExpense(budget, spendingLimits, 10, 'Pizza 🍕');
const newBudget2 = addExpense(
  newBudget1,
  spendingLimits,
  100,
  'Going to movies 🍿',
  'Matilda',
);
const newBudget3 = addExpense(newBudget2, spendingLimits, 200, 'Stuff', 'Jay');

console.log(newBudget1);
console.log(newBudget2);
console.log(newBudget3);

const checkExpenses = function () {
  for (const entry of budget)
    // let lim;
    // if (spendingLimits[entry.user]) {
    //   lim = spendingLimits[entry.user];
    // } else {
    //   lim = 0;
    // }
    // const limit = spendingLimits?.[entry.user] ?? 0;
    // const limit = getLimit(entry.user);

    if (entry.value < -getLimit(entry.user)) entry.flag = 'limit';
};
checkExpenses();

const logBigExpenses = function (bigLimit) {
  let output = '';
  for (const entry of budget) //{
    output +=
      entry.value <= -bigLimit ? `${entry.description.slice(-2)} / ` : '';
  // if (entry.value <= -bigLimit) {
  // output += entry.description.slice(-2) + ' / '; // Emojis are 2 chars
  // output += `${entry.description.slice(-2)} / `;
  // }
  //}
  output = output.slice(0, -2); // Remove last '/ '
  console.log(output);
};

console.log(budget);
logBigExpenses(500);
