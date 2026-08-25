import { extractNumbers, extractUserInputs } from './src/parser.js';
import {
  validateStringNotEmpty,
  validateNumber,
} from './src/util/validation.js';
import { add, calculateResult } from './src/math.js';
import { transformToNumber } from './src/util/numbers.js';

import {cleanNumbers} from './cleanNumbers.js';
import {validateError, outputResult} from './validateError.js';

const form = document.querySelector('form');

function formSubmitHandler(event) {
  event.preventDefault();
  const numberInputs = extractUserInputs(form);

  const result = calculateResult(numberInputs);
  outputResult(result);
}

form.addEventListener('submit', formSubmitHandler);
