// Componente para construir las secciones de Content
  const Part = ({ part }) => {
    return (
      <>
        <p>
          {part.name} : {part.exercises}
        </p>
      </>
    )
  }

const Content = ({ parts }) => {  
    return (
      <>
        <Part part={parts[1]} />
        <Part part={parts[2]} />
        <Part part={parts[0]} />
      </>
    )
  }
 
export default Content; 