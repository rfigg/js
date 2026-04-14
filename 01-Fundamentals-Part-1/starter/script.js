/* let js = 'awesome';
console.log(40 + 8 + 23 - 10);

console.log('Jonas');
console.log(23);

let firstName = ("Matilda");
console.log(firstName);
console.log(firstName);
console.log(firstName);

// Variable name conventions
let jonas_matilda = 'JM';
let $function = 27;

let person = 'Jonas';
let PI = 3.1415;

let myFirstJob = 'Coder';
let myCurrentJob = 'Teacher';

let job1 = 'Programmer';
let job2 = 'Teacher';

console.log(myFirstJob);


let javascriptIsFun = true;
console.log(javascriptIsFun);

// console.log(typeof true);
console.log(typeof javascriptIsFun);
// console.log(typeof 23);
// console.log(typeof 'Jon as');

javascriptIsFun = 'YES!';
console.log(typeof javascriptIsFun);

let year;
console.log(year);
console.log(typeof year);

year = 1991;
console.log(typeof year);

console.log(typeof null);


let age = 30;
age = 31;

const birthYear = 1980;
//birthYear = 1979;

// const job;

var job = "Programmer";
job = "Teacher";

lastName = "Figg";
console.log(lastName);


// Math operators
const now = 2037;
const ageFigg = now - 1980;
const ageSarah = now - 2018;
console.log(ageFigg, ageSarah);

console.log(ageFigg * 2, ageFigg / 10, 2 ** 3);
// 2 ** 3 is 2 to the power of 3 = 2 * 2 * 2

const firstName = "Jonas";
const lastName = "SMEMEMEM";
console.log(firstName + ' ' + lastName);

// Assignment operators
let x = 10 + 5;
x += 10;  // x = x + 10 = 25
x *= 4;
x++;
x--;
x--;
console.log(x);

// Comparison operators
console.log(ageFigg > ageSarah); // >, <, >=, <=
console.log(ageSarah >= 18);

const isFullAge = ageSarah >= 18;

console.log(now - 1980 > now - 2018); // same as above


const now = 2037;
const ageJonas = now - 1991;
const ageSarah = now - 2018;

console.log(now - 1991 > now - 2018);

let x, y;
x = y = 25 - 10 - 5; // x = y = 10, x = 10
console.log(x, y);

const averageAge = (ageJonas + ageSarah) / 2;
console.log(ageJonas, ageSarah, averageAge);


const firstName = "Ryan";
const job = "teacher";
const birthYear = 1980;
const year = 2026;

const ryan = "I'm " + firstName + ', a ' + (year - birthYear) + " years old " + job + '!';
console.log(ryan);

const ryanNew = `I'm ${firstName}, a ${year - birthYear} yearsss old ${job}.`;
console.log(ryanNew);

console.log(`Just a regular string...`); // can use template literal quotes without variables. Some do for all strings, can add variables easily.

console.log("String with \n\
multiple\n\
lines"); // legacy js

console.log(`String
multiple
lines`); // ES6 modern



const age = 15;

if (age >= 18) {
    console.log("Sarah can start her European driver's license.");
} else {
    const yearsLeft = 18 - age;
    console.log(`Sarah has to wait another ${yearsLeft} years before doing her European driver's license.`);
}

const birthYear = 2012;

let century;
if (birthYear <= 2000) {
    century = 20;
} else {
    century = 21;
}
console.log(century);



//type conversion
const inputYear = '1991';
console.log(Number(inputYear), inputYear);
console.log(Number(inputYear) + 18);

console.log(Number("Jonas"));
console.log(typeof NaN);

console.log(String(23), 23);

//type coercion
console.log("I am " + 23 + " years old.");
console.log('23' - '10' - 3);
console.log('23' * '2');

let n = '1' + 1;
n = n - 1;
console.log(n);



// 5 falsy values: 0, '', null, undefined, NaN

console.log(Boolean(0));
console.log(Boolean(undefined));
console.log(Boolean('Jonas'));
console.log(Boolean({}));   // empty object
console.log(Boolean(''));

const money = 1;
if (money) {
    console.log("Don't spend it all.");
} else {
    console.log("You should get a damn jooob.");
}

let height = 9;
if (height) {
    console.log("YAYYY! Height is defined.");
} else {
    console.log("Height is undefined.");
}



const age = '18';
if (age === 18) console.log('You just became an adult. (strict)');

if (age == 18) console.log('You just became an adult. (loose)');

const favorite = Number(prompt("What's your favorite number?"));
console.log(favorite);
console.log(typeof favorite);

if (favorite === 23) {
    console.log("NIIIICE! 23 is amzzaaaaaing number.");
} else if (favorite === 7) {
    console.log("Dat cool too.");
} else if (favorite === 9) {
    console.log("Dat cool too, 9.");
} else {
    console.log("No dice. Not 23 or 7 or 9.");
}

if (favorite !== 23) console.log("Whynot23?");



const hasDriversLicense = true;
const hasGoodVision = true;

console.log(hasDriversLicense && hasGoodVision);
console.log(hasDriversLicense || hasGoodVision);
console.log(!hasDriversLicense);

// if (hasDriversLicense && hasGoodVision) {
//     console.log('DRive onnn!')
// } else {
//     console.log("Don't you do it!");
// }

const isTired = false;
console.log(hasDriversLicense && hasGoodVision && isTired);

if (hasDriversLicense && hasGoodVision && !isTired) {
    console.log('DRive onnn!')
} else {
    console.log("Don't you do it!");
}



const day = 'sunday';

switch (day) {
    case 'monday':
        console.log("Plan course structure.");
        console.log("Go to coding meetup.");
        break;
    case 'tuesday':
        console.log("Prepare theory videos");
        break;
    case 'wednesday':
    case 'thursday':
        console.log("Write code examples");
        break;
    case 'friday':
        console.log("Record videos");
        break;
    case 'saturday':
    case 'sunday':
        console.log("Enjoy the weekend");
        break;
    default:
        console.log("Not a valid day");
}

if (day === 'monday') {
    console.log("Plan course structure.");
    console.log("Go to coding meetup.");
} else if (day === 'tuesday') {
    console.log("Prepare theory videos");
} else if (day === 'wednesday' || day === 'thursday') {
    console.log("Write code examples");
} else if (day === 'friday') {
    console.log("Record videos");
} else if (day === 'saturday' || day === 'sunday') {
    console.log("Enjoy the weekend");
} else {
    console.log("Not a valid day");
}

*/

const age = 23;
// age >= 18 ? console.log("I like to drink wine.") : console.log("I like to drink water.");

const drink = age >= 18 ? 'wine' : 'water';
console.log(drink);

let drink2;
if (age >= 18) {
    drink2 = 'wine';
} else {
    drink2 = 'water';
}
console.log(drink2);

console.log(`I like to drink ${age >= 18 ? 'wine' : 'water'}.`);