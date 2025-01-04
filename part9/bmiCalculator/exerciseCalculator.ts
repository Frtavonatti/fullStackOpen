const parseExerciseArguments = () => {
  if (process.argv.length < 4) throw new Error("Not enough arguments");

  const array = process.argv.slice(2, process.argv.length - 1).map(day => Number(day));
  const target = Number(process.argv[process.argv.length - 1]);

  if (!isNaN(target) && !array.some(day => isNaN(day))) {
    return {
      array,
      target,
    }
  } else {
    throw new Error("All arguments must be numbers");
  }
}

interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const calculateExercises = (array: number[], target: number): Result => {
  const average = array.reduce((a, b) => a + b, 0) / array.length;
  let rating: number;
  let ratingDescription: string;

  if (average < target) {
    rating = 1;
    ratingDescription = 'You can do better';
  } else if (average === target) {
    rating = 2;
    ratingDescription = 'Good job';
  } else {
    rating = 3;
    ratingDescription = 'Excellent';
  }

  const result = {
    periodLength: array.length,
    trainingDays: array.filter(day => day > 0).length,
    success: average >= target,
    rating: rating,
    ratingDescription: ratingDescription,
    target: target,
    average: average,
  }
  console.log(result);
  return result;
}

try {
  const { array, target } = parseExerciseArguments();
  calculateExercises(array, target);
} catch (e) {
  let errorMessage = 'An error occurred: ';
  if (e instanceof Error) {
    errorMessage = errorMessage.concat(e.message);
  }
  console.log(errorMessage);
}
