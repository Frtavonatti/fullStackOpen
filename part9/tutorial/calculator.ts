type Operation = 'multiply' | 'add' | 'divide';

const parseArguments = (args: Array<string>): { a: number, b: number, op: Operation } => {
  if (args.length !== 5) throw new Error('Exactly two arguments required');
  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3])) && ['multiply', 'add', 'divide'].includes(args[4])) {
    return {
      a: Number(args[2]),
      b: Number(args[3]),
      op: args[4] as Operation
    }
  } else {
    throw new Error('Provided values were not numbers or operation is not supported');
  }
}

export const calculator = (a: number, b: number, operation: Operation): number => {
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
  const { a, b, op } = parseArguments(process.argv);
  calculator(a, b, op);
} catch (error) {
  let errorMessage: string = 'Something went wrong: '
  if (error instanceof Error) {
    errorMessage += error.message;  
  }
  console.log(errorMessage);
}
