export function validateStringNotEmpty(value) {
  if (value.trim().length === 0) {
    throw new Error('Invalid input - must not be empty.');
  }
}

export function validateNumber(number) {
  if (typeof number !== 'number' || Number.isNaN(number)) {
    throw new Error('Invalid number input.');
  }
}
