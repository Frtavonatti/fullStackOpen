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

calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2)