// Helper function to convert number to an array of numbers
const convertNumbers = cardNumbers => {
  let cardNumberArray = [];
  for (let i = 0; i < cardNumbers.length; i++) {
    cardNumberArray.push(parseInt(cardNumbers[i]));
  }
  return cardNumberArray;
}

// Validate credit card number using Luhn algorithm
const validateCC = array => {
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

// Invoke validation function and print the results on the web page
const printResults = () => {
  let inputValue = document.getElementById('cc-number').value.trim();
  if (document.getElementById('result').innerHTML !== '') {
    document.getElementById('result').innerHTML = '';
  }
  if ((!isNaN(inputValue)) && (inputValue !== '')) {
    let phrase = "The card number is ";
    let result = document.createElement('p');
    result.id = 'output';
    if (validateCC(convertNumbers(inputValue))) {
      result.innerHTML = `${phrase} <span>VALID</span>`;
      result.firstElementChild.style.color = 'mediumseagreen';
    }
    else {
      result.innerHTML = `${phrase} <span>INVALID</span>`;
      result.firstElementChild.style.color = 'red';
    }
    result.firstElementChild.style.fontSize = '2.5rem';
    result.firstElementChild.style.fontWeight = '700';
    document.getElementById('result').appendChild(result);
  }
}

// Register event listener for clicking the Validate button
document.querySelector('button').addEventListener('click', printResults);
