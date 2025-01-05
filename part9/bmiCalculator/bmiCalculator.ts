const parseArguments = () => {
  if (process.argv.length < 4) throw new Error("Not enough arguments");
  if (process.argv.length > 4) throw new Error("Too many arguments");
  console.log(process.argv);
  

  if (!isNaN(Number(process.argv[2])) && !isNaN(Number(process.argv[3]))) {
    return {
      height: Number(process.argv[2]),
      mass: Number(process.argv[3])
    }
  } else {
    throw new Error("Height and mass must be numbers");
  }
}

export const calculateBmi = (height: number, mass: number): string => { 
  const bmi: number = mass / (height**2) * 10000; 
  let result: string;
  
  if (bmi < 18.5) {
    result = 'Underweight';
  } else if (bmi < 24.9) {
    result = 'Normal (healthy weight)';
  } else if (bmi < 29.9) {
    result = 'Overweight';
  } else if (bmi < 34.9) {
    result = 'Obese Class I (Moderate)';
  } else if (bmi < 39.9) {
    result = 'Obese Class II (Severe)';
  } else {
    result = 'Obese Class III (Very severe)';
  }
  return result;
}

try {
  const { height, mass } = parseArguments();
  console.log(calculateBmi(height, mass));
} catch (e) {
  let errorMessage = 'An error occurred: ';
  if (e instanceof Error) {
    errorMessage = errorMessage.concat(e.message);
  }
  console.log(errorMessage);
}
