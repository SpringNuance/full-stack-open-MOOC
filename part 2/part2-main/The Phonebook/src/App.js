import React, { useState, useEffect } from 'react'
import Person from './components/Person'
import Notifications from './components/Notifications'
import personService from './services/personService'

const Filter = ({filter, handleFilter}) => {
  return (
    <div>Filter name <input value = {filter} onChange={handleFilter}/></div>
  )
}

const Persons = ({PersonsToShow, deletePerson}) => {
  return (
    <ul>
    {PersonsToShow.map((person, i) => 
        <Person key={i} person={person} deletePerson = {deletePerson} />
    )}
  </ul>
  )
}

const PersonForm = ({addPerson, newName, handleNameChange, newNumber, handleNumberChange}) => {
  return (
    <form onSubmit={addPerson}>
    <div> Name: <input value = {newName} onChange={handleNameChange}/></div>
    <div> Number: <input value = {newNumber} onChange={handleNumberChange}/></div>
    <div><button type="submit">add</button></div>
  </form>
  )
} 


const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setFilter] = useState('')
  const [ message, setMessage] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
      setPersons(initialPersons)
    })
  }, [])

  console.log('render', persons.length, 'notes')

  const PersonsToShow = !filter ? persons : persons.filter(person => person.name.toLowerCase().includes(filter))


  const addPerson = (event) => {
    event.preventDefault()

    if (persons.map(person => person.name).includes(newName)){
      const personInList = persons.filter(person => person.name === newName)[0]
      const newPerson = { ...personInList, number: newNumber }
      const id = personInList.id
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        personService.update(id, newPerson).then(personRequest => {
          console.log(`${newName}'s phone number successfully updated`)
          const newPersons = persons.map(person => person.id !== id ? person : personRequest)
          setPersons(newPersons)
          setMessage(`${newName} was successfully updated`)
          setTimeout(() => {setMessage(null)}, 4000)
        }).catch(error => {
          setPersons(persons.filter(person => person.id !== id))
          setNewName('')
          setNewNumber('')
          setMessage(`Information of ${personInList.name} has already been deleted from server!`)
          setTimeout(() => {setMessage(null)}, 4000)
        })
      }
    } else {
      const personObject = {
        name: newName,
        number: newNumber,
      }
      personService.create(personObject)
        .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
        setMessage(`${newName} was successfully added`)
        setTimeout(() => {setMessage(null)}, 4000)
      }).catch(error => {
        setMessage(`${error.response.data.error}!`)
        setTimeout(() => {setMessage(null)}, 4000)
      })
    }
  }

  const deletePerson = (id) => {
    const deletedPerson = persons.filter(person => person.id === id)
    const name = deletedPerson[0].name
    if (window.confirm(`Delete ${name} from the phonebook?`)) {
      personService.remove(id).then(response => {
        setPersons(persons.filter(person => person.id !== id))
        setMessage(`${name} was successfully deleted`)
        setTimeout(() => {setMessage(null)}, 4000)
      }).catch(error => {
        setPersons(persons.filter(person => person.id !== id))
        setMessage(`${name} has already been deleted!`)
        setTimeout(() => {setMessage(null)}, 4000)
      })
    }
  }

  const handleFilter = (event) => {
    console.log(event.target.value)
    setFilter(event.target.value)
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }



  return (
    <div>
      <Notifications message={message} />
      <h1>Phonebook </h1>
      <Filter filter={filter} handleFilter={handleFilter}/>
      <h1>Add a new phone record</h1>
      <PersonForm addPerson={addPerson} 
        newName = {newName} 
        handleNameChange = {handleNameChange} 
        newNumber={newNumber} 
        handleNumberChange = {handleNumberChange}/>
      <h1>Numbers</h1>
      <Persons PersonsToShow={PersonsToShow} deletePerson = {deletePerson} />
    </div>
  )
}

export default App

/** 
import React, { useState, useEffect } from 'react'
import Note from './components/Note'
import noteService from './services/notes'

const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(false)

  useEffect(() => {
    noteService
      .getAll()
      .then(initialNotes => {
      setNotes(initialNotes)
    })
  }, [])

  const addNote = (event) => {
    event.preventDefault()
    const noteObject = {
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() > 0.5,
    }

    noteService
      .create(noteObject)
        .then(returnedNote => {
        setNotes(notes.concat(returnedNote))
        setNewNote('')
      })
  }

  const toggleImportanceOf = id => {
    const note = notes.find(n => n.id === id)
    const changedNote = { ...note, important: !note.important }
  
    noteService
    .update(id, changedNote)
      .then(returnedNote => {
      setNotes(notes.map(note => note.id !== id ? note : returnedNote))
    })
    .catch(error => {
      alert(
        `the note '${note.content}' was already deleted from server`
      )
      setNotes(notes.filter(n => n.id !== id))
    })    
  }

  const handleNoteChange = (event) => {
    console.log(event.target.value)
    setNewNote(event.target.value)
  }

  const notesToShow = showAll
  ? notes
  : notes.filter(note => note.important)

  return (
    <div>
      <h1>Notes</h1>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all' }
        </button>
      </div>   
      <ul>
        {notesToShow.map(note => 
            <Note
              key={note.id}
              note={note} 
              toggleImportance={() => toggleImportanceOf(note.id)}
            />
        )}
      </ul>
      <form onSubmit={addNote}>
        <input
          value={newNote}
          onChange={handleNoteChange}
        />
        <button type="submit">save</button>
      </form>  
    </div>
  )
}

export default App
*/

