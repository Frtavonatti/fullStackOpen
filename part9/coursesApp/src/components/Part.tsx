import { CoursePart, assertNever } from "../types";

const Part = ({ part }: {part: CoursePart}): JSX.Element => {

  const cardStyle = {
    border: '1px solid white',
    borderRadius: '5px',
    marginBottom: '1rem'
  }

  const renderPart = () => {
    switch (part.kind) {
      case 'basic':
        return <PartDetails name={part.name} exerciseCount={part.exerciseCount} description={part.description} />
      case 'group':
        return (
          <div>
            <PartDetails name={part.name} exerciseCount={part.exerciseCount} />
            <p>Group Projects: {part.groupProjectCount}</p>
          </div>
        );
      case 'background':
        return (
          <div>
            <PartDetails name={part.name} exerciseCount={part.exerciseCount} description={part.description} />
            <a href={part.backgroundMaterial}>{part.backgroundMaterial}</a>
          </div>
        );
      case 'special': 
        return (
          <div>
            <PartDetails name={part.name} exerciseCount={part.exerciseCount} description={part.description} />
            <ul>
              <p><strong>Requirements:</strong></p>
              {part.requirements.map((r) => (
                <li key={r}> {r} </li>
              ))}
            </ul>
          </div>
        )
      default:
        return assertNever(part);
    }
  };

  return (
    <div style={cardStyle}>
      {renderPart()}
    </div>
  )
}

const PartDetails: React.FC<{ name: string; exerciseCount: number; description?: string }> 
  = ({ name, exerciseCount, description }) => (
  <>
    <p><strong>{name}: {exerciseCount} </strong></p>
    {description && <p><em>{description}</em></p>}
  </>
);

export default Part
