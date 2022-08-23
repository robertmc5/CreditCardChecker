// All valid credit card numbers
valid1 = '4539677908016808';
valid2 = '5535766768751439';
valid3 = '371612019985236';
valid4 = '6011144340682905';
valid5 = '4539404967869666';

// All invalid credit card numbers
invalid1 = '4532778771091795';
invalid2 = '5795593392134643';
invalid3 = '375796084459914';
invalid4 = '6011127961777935';
invalid5 = '5382019772883854';

// Can be either valid or invalid
mystery1 = '344801968305414';
mystery2 = '5466100861620239';
mystery3 = '6011377020962656203';
mystery4 = '4929877169217093';
mystery5 = '4913540463072523';
mystery6 = '5515679577659243';
mystery7 = '36515352603380';
mystery8 = '3530626940842243';
mystery9 = '30210381075868';
mystery10 = '4844002026502441';
mystery11 = '6385603134303562';
mystery12 = '6759311704576331';
mystery13 = '373658576762888';
mystery14 = '5128023292143359';
mystery15 = '4806589363633594'

// An array of all the strings above
const batch = [valid1, valid2, valid3, valid4, valid5, invalid1, invalid2, invalid3, invalid4, invalid5, 
  mystery1, mystery2, mystery3, mystery4, mystery5, mystery6, mystery7, mystery8, mystery9, mystery10, 
  mystery11, mystery12, mystery13, mystery14, mystery15];

// Convert string to array of numbers
const convertString = cardString => {
  let cardNumberArray = [];
  for (let i = 0; i < cardString.length; i++) {
    cardNumberArray.push(parseInt(cardString[i]));
  }
  return cardNumberArray;
}

// Validate credit card number using Luhn algorithm
const validateCred = array => {
  let copyArray = array.slice();
  let doubleDigit = 0;
  let sum = 0;
  for (let i = copyArray.length - 1; i >= 0; i -= 2) {
    if (i != 0) {
      doubleDigit = copyArray[i-1] * 2;
      if (doubleDigit > 9) {
        doubleDigit -= 9;
      }
    }
    else {
      doubleDigit = 0;
    }
    sum += copyArray[i] + doubleDigit;
  }
  if (sum % 10 === 0) {
    return true;
  }
  else {
    return false;
  }
}

// Determine which card numbers are invalid
const findInvalidCards = array => {
  let invalidCCs = [];
  for (let card of array) {
    let cardArray = convertString(card);
    if (!validateCred(cardArray)) {
      invalidCCs.push(cardArray);
    }
  }
  return invalidCCs;
}

// Print list of invalid cards
console.log('---------------------------');
let invalidCardNumbers = findInvalidCards(batch);
console.log("There are " + invalidCardNumbers.length + " Invalid cards:");
for (let card of invalidCardNumbers ) {
  console.log(`\t${card.join('')}`);
}
console.log('---------------------------');

// Determine which card companies had invalid cards
const idInvalidCardCompanies = array => {
  let companies = [];
  for (let card of array) {
    let copyCC = card.slice();
    switch (copyCC[0]) {
      case 3: if (!companies.includes('Amex')) {
        companies.push('Amex');
        }
        break;
      case 4: if (!companies.includes('Visa')) {
        companies.push('Visa');
        }
        break;
      case 5: if (!companies.includes('Mastercard')) {
        companies.push('Mastercard');
        }
        break;
      case 6: if (!companies.includes('Discover')) {
        companies.push('Discover');
        }
        break;
      default: companies.push('Company not found');
    }
  }
  return companies;
}

// Print list of card companies with invalid cards
let invalidCardCompanies = idInvalidCardCompanies(invalidCardNumbers);
console.log("The Invalid card companies are:");
for (let co of invalidCardCompanies) {
  console.log(`\t${co}`);
}
console.log('---------------------------');
