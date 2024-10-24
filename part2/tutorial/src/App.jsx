import { useState } from 'react'
// import Login from '/components/Login';
import Header from '../components/Header';
import Content from '../components/content/Content';
import Footer from '../components/Footer';
import './App.css'

const App = () => {
  // const [isLoggedIn, setIsLoggedIn] = useState(false);

  // const handleLogin = (username, password) => {
  //   if (username === 'frtav' && password === '1234') {
  //     setIsLoggedIn(true);
  //   } else {
  //     alert('Invalid username or password');
  //   }
  // };

  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  // Get the names of each course
  const courseNames = courses.map(course => course.name);
  // console.log('Courses: ', courseNames)

  // Get array of parts from each course
  const courseParts = courses.flatMap(course => course.parts);
  console.log('Parts: ', courseParts)

  return (
    <>
      {/* {isLoggedIn ? (
        <>
          <Header course={courses.name)}/>
          <Content parts={courses.parts}/>
          <Footer parts={courses.parts}/>
        </>
      ) : (
        <Login onLogin={handleLogin} />
      )} */}

          <Header course={courseNames}/>
          <Content parts={courseParts}/>
          <Footer parts={courseParts}/>
    </>
  );
};


export default App