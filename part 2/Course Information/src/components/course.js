const Header = ({ course }) => {
    return (
      <h1>{course.name}</h1>
    )
  }
  
  const Content = ({ course }) => {
    return (
      <ul>
        {course.parts.map(part => <li><Part part= {part} /></li>)}
      </ul>
    )
  }
  
  const Part = (props) => {
    return (
      <p>
        {props.part.name} {props.part.exercises}
      </p>    
    )
  }
  
  
  const Total = ({ course }) => {
    const sum = course.parts.map(part => part.exercises).reduce((a,b) => a + b);
    return (
      <p><b>total of {sum} exercises</b></p>
    ) 
  }
  
  const Course = ({ course }) => {
    return (
      <li>
        <Header course = {course}/>
        <Content course = {course}/>
        <Total course = {course}/>
      </li>
    )
  }

  export default Course