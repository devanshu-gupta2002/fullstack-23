const mongoose = require('mongoose')

const password = process.argv[2]

const url =
`mongodb+srv://fullstack:${password}@cluster0.z11hqky.mongodb.net/phonebook?retryWrites=true&w=majority`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const perSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', perSchema)

if(process.argv.length===5)
{
  const person = new Person(
    {
      name: `${process.argv[3]}`,
      number: `${process.argv[4]}`,
    }
  )
  person.save().then(() => {
    console.log(`added ${person.name} number: ${person.number} to phonebook`)
    mongoose.connection.close()
  })
}


if(process.argv.length===3)
{
  Person.find({}).then(result => {
    console.log('Phonebook:')
    result.forEach(person => {
      console.log(`${person.name} ${person.number}`)
    })
    mongoose.connection.close()
  })
}