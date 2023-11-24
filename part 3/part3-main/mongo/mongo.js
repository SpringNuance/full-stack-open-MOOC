const mongoose = require('mongoose')

if (process.argv.length !== 3 && process.argv.length !== 5) {
  console.log('Invalid mongoose input for phonebook. Command should have either 3 or 5 arguments')
  process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb+srv://SpringNuance:${password}@cluster0.oauge.mongodb.net/phonebook?retryWrites=true&w=majority`

mongoose.connect(url)


const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length === 5) {
  const nameExtracted =  process.argv[3]
  const numberExtracted = process.argv[4]
  const person = new Person({
    name: nameExtracted,
    number: numberExtracted,
  })

  person.save().then(result => {
    console.log(`added ${nameExtracted} number ${numberExtracted} to phonebook`)
    mongoose.connection.close()
  })
}

if (process.argv.length === 3) {
  Person.find({}).then(result => {
    console.log('phonebook:')
    result.forEach(person => {
      console.log(`${person.name} ${person.number}`)
    })
    mongoose.connection.close()
  })
}


/*
const note = new Note({
  content: 'HTML is Easy',
  date: new Date(),
  important: true,
})

note.save().then(result => {
  console.log('note saved!')
  mongoose.connection.close()
})


Note.find({ important: true }).then(result => {
  result.forEach(note => {
    console.log(note)
  })
  mongoose.connection.close()
})

*/