import { CoursePart } from "../types";

const Content = ({ courseParts }: {courseParts: CoursePart[]}): JSX.Element => {

  // Move to utils
  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };

  courseParts.forEach((part) => {
    switch (part.kind) {
      case 'basic':
        console.log(part.name, part.description, part.exerciseCount);
        break;
      case 'group':
        console.log(part.groupProjectCount);
        break;
      case 'background':
        console.log(part.backgroundMaterial);
        break;
      default:
        return assertNever(part)
    }
  })

  return (
    <div>
      <p>
        {courseParts[0].name}: {courseParts[0].exerciseCount}
      </p>
      <p>
        {courseParts[1].name}: {courseParts[1].exerciseCount}
      </p>
      <p>
        {courseParts[2].name}: {courseParts[2].exerciseCount}
      </p>
    </div>
  )
}

export default Content;
