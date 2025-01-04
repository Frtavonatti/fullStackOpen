type Operation = 'multiply' | 'add' | 'divide';

const calculator = (a: number, b: number, operation: Operation): number => {
  switch (operation) {
    case 'add':
      return a + b;
    case 'multiply':
      return a * b;
    case 'divide':
      if (b === 0) throw new Error('Can\'t divide by 0!');
      return a / b;
    default:
      throw new Error('Operation not supported');
  }
}

try {
  console.log(calculator(1, 5, 'add'));
  console.log(calculator(1, 5, 'multiply'));
  console.log(calculator(1, 5, 'divide'));
  console.log(calculator(1, 0, 'divide'));
  // console.log(calculator(0, 0, 'dodo')); // throws an error
} catch (error) {
  let errorMessage = 'Something went wrong: '
  // here we can not use error.message
  if (error instanceof Error) {    // the type is narrowed and we can refer to error.message
    errorMessage += error.message;  
  }
  // here we can not use error.message
  
  console.log(errorMessage);
}
