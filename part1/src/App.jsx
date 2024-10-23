import { useState } from 'react'
import Login from '/components/Login';
import Header from '../components/Header';
import Content from '../components/Content';
import Footer from '../components/Footer';
import './App.css'

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = (username, password) => {
    if (username === 'frtav' && password === '1234') {
      setIsLoggedIn(true);
    } else {
      alert('Invalid username or password');
    }
  };


  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <>
      {isLoggedIn ? (
        <>
          <Header course={course.name}/>
          <Content parts={course.parts}/>
          <Footer parts={course.parts}/>
        </>
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </>
  );
};


export default App