import React from 'react'

const Person = ({ person, deletePerson }) => {
  return (
    <li>{person.name} {person.number} <button onClick = {() => deletePerson(person.id)}>delete</button></li>
  )
}

export default Person

/* 
import React from 'react'

const Note = ({ note, toggleImportance }) => {
  const label = note.important
    ? 'make not important' : 'make important'

  return (
    <li>
      {note.content} 
      <button onClick={toggleImportance}>{label}</button>
    </li>
  )
}

export default Note
*/