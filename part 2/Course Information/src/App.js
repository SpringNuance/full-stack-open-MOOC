import React from 'react';
import Course from './components/course'

const App = ({ courses }) => {
 
  return (
    <div>
      {courses.map(course => <Course key={course.id} course={course} />)}
    </div>
  )
}

export default App