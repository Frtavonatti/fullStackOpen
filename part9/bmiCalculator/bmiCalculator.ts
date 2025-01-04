// BMI: mass / height^2

const calculateBmi = (height: number, mass: number): string => {
  const bmi: number = mass / (height**2) * 10000;

  if (bmi < 18.5) {
    return 'Underweight';
  } else if (bmi < 24.9) {
    return 'Normal (healthy weight)';
  } else if (bmi < 29.9) {
    return 'Overweight';
  } else if (bmi < 34.9) {
    return 'Obese Class I (Moderate)';
  } else if (bmi < 39.9) {
    return 'Obese Class II (Severe)';
  } else {
    return 'Obese Class III (Very severe)';
  }
}

console.log(calculateBmi(156, 60))