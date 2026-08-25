import { validateStringNotEmpty, validateNumber } from "./src/util/validation";
import { transformToNumber } from "./src/util/numbers";

function cleanNumbers(numbersInputArray){
    const numbers = [];
    for (const numberInput of numbersInputArray) {
        validateStringNotEmpty(numberInput);
        const number = transformToNumber(numberInput);
        validateNumber(number);
        numbers.push(number);
    }
    return numbers;
}

export default cleanNumbers;