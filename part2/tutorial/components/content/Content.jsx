import Part from './Part';

const Content = ({ parts }) => {  
    return (
      <>
        {parts.map(part => <Part part={part} key={part.name}/>)}
      </>
    )
  }
 
export default Content;  