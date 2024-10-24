import Part from './Part';

<h1></h1>

const Content = ({ parts }) => {  
    return (
      <>
        {parts.map(part => <Part part={part} key={part.name}/>)}
      </>
    )
  }
 
export default Content;  